#!/usr/bin/env bash
#==============================================================================
# HETZNER VPS BOOTSTRAP — ONE-TIME SERVER SETUP
#==============================================================================
# Hardens a fresh Ubuntu 24.04 LTS server and installs Docker, ready for the
# docker-compose stack in this directory. Review before running. Run once as
# root on the new server:
#
#   bash server-bootstrap.sh
#
# What it does: deploy user · SSH hardening · UFW firewall · fail2ban ·
# unattended security upgrades · 2G swap · Docker Engine · app directories.
# Re-running is safe (steps are idempotent).
#------------------------------------------------------------------------------

set -euo pipefail

#------------------------------------------------------------------------------
# CONFIGURATION
#------------------------------------------------------------------------------
DEPLOY_USER="ignitox"
APP_DIR="/opt/ignitox"
CERT_DIR="/etc/ssl/cloudflare"
SWAP_FILE="/swapfile"
SWAP_SIZE="2G"

#------------------------------------------------------------------------------
# PRE-FLIGHT CHECKS
#------------------------------------------------------------------------------
if [[ $EUID -ne 0 ]]; then
  echo "ERROR: run as root (fresh server first login)." >&2
  exit 1
fi

if [[ ! -s /root/.ssh/authorized_keys ]]; then
  echo "ERROR: /root/.ssh/authorized_keys is empty — add your SSH key first," >&2
  echo "otherwise the SSH hardening below would lock you out." >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive

#------------------------------------------------------------------------------
# SYSTEM PACKAGES & AUTOMATIC SECURITY UPDATES
#------------------------------------------------------------------------------
echo "==> Updating system packages"
apt-get update -y
apt-get upgrade -y
apt-get install -y ca-certificates curl gnupg ufw fail2ban unattended-upgrades

echo "==> Enabling unattended security upgrades"
dpkg-reconfigure -f noninteractive unattended-upgrades

#------------------------------------------------------------------------------
# DEPLOY USER (non-root, key-only login)
#------------------------------------------------------------------------------
if ! id "$DEPLOY_USER" &>/dev/null; then
  echo "==> Creating deploy user '$DEPLOY_USER'"
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
fi

echo "==> Granting '$DEPLOY_USER' the root SSH keys"
install -d -m 700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
install -m 600 -o "$DEPLOY_USER" -g "$DEPLOY_USER" \
  /root/.ssh/authorized_keys "/home/$DEPLOY_USER/.ssh/authorized_keys"

#------------------------------------------------------------------------------
# SSH HARDENING (key-only, no root login)
#------------------------------------------------------------------------------
echo "==> Hardening SSH"
install -d /etc/ssh/sshd_config.d
cat > /etc/ssh/sshd_config.d/90-hardening.conf <<'EOF'
#==============================================================================
# SSH HARDENING (managed by server-bootstrap.sh)
#==============================================================================
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
X11Forwarding no
MaxAuthTries 3
EOF
systemctl reload ssh || systemctl reload sshd

#------------------------------------------------------------------------------
# FIREWALL (UFW) — SSH, HTTP, HTTPS only
#------------------------------------------------------------------------------
echo "==> Configuring UFW"
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

#------------------------------------------------------------------------------
# FAIL2BAN — bans brute-force SSH attempts
#------------------------------------------------------------------------------
echo "==> Enabling fail2ban"
systemctl enable --now fail2ban

#------------------------------------------------------------------------------
# SWAP — headroom for the small VPS
#------------------------------------------------------------------------------
if [[ ! -f "$SWAP_FILE" ]]; then
  echo "==> Creating ${SWAP_SIZE} swap file"
  fallocate -l "$SWAP_SIZE" "$SWAP_FILE"
  chmod 600 "$SWAP_FILE"
  mkswap "$SWAP_FILE"
  swapon "$SWAP_FILE"
  echo "$SWAP_FILE none swap sw 0 0" >> /etc/fstab
fi

#------------------------------------------------------------------------------
# DOCKER ENGINE (official apt repository)
#------------------------------------------------------------------------------
if ! command -v docker &>/dev/null; then
  echo "==> Installing Docker Engine"
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -y
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
fi
usermod -aG docker "$DEPLOY_USER"

#------------------------------------------------------------------------------
# APPLICATION & CERTIFICATE DIRECTORIES
#------------------------------------------------------------------------------
echo "==> Preparing $APP_DIR and $CERT_DIR"
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" "$APP_DIR"
install -d -m 700 "$CERT_DIR"

#------------------------------------------------------------------------------
# NEXT STEPS (manual)
#------------------------------------------------------------------------------
cat <<EOF

==============================================================================
 BOOTSTRAP COMPLETE — remaining manual steps
==============================================================================
 1. Cloudflare dashboard → SSL/TLS → Origin Server → Create Certificate,
    then place the files on this server:
      $CERT_DIR/origin.pem
      $CERT_DIR/origin-key.pem   (chmod 600)
    Set the zone's SSL mode to "Full (strict)".

 2. As $DEPLOY_USER, create $APP_DIR/.env from .env.example in the repo
    (Turnstile secret, Resend key, contact addresses).

 3. If the GHCR image is private, log the server in once:
      docker login ghcr.io -u <github-user>   (PAT with read:packages only)

 4. Set the real domain in $APP_DIR/nginx/conf.d/ignitox.conf.

 5. In GitHub: set repository variable DEPLOY_ENABLED=true and the secrets
    SSH_HOST / SSH_USER / SSH_PRIVATE_KEY / SSH_KNOWN_HOSTS, then push to
    main — the deploy workflow does the rest.
==============================================================================
EOF
