//==============================================================================
// RATE LIMITER — IN-MEMORY SLIDING WINDOW
//==============================================================================
// Per-key (typically per-IP) sliding window limiter. In-memory state is
// correct for the single-container deployment this site runs on; swap for a
// shared store (e.g. Redis) before scaling to multiple instances. nginx adds
// a second, outer rate limit in production (deploy/nginx).
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// CONFIGURATION
//------------------------------------------------------------------------------
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_TRACKED_KEYS = 5_000; // memory cap — prune when exceeded

const hits = new Map<string, number[]>();

//------------------------------------------------------------------------------
// TYPES
//------------------------------------------------------------------------------
export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

//------------------------------------------------------------------------------
// CHECK
//------------------------------------------------------------------------------
export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, recent);
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000),
    };
  }

  recent.push(now);
  hits.set(key, recent);
  pruneIfNeeded(now);
  return { allowed: true };
}

//------------------------------------------------------------------------------
// MEMORY PRUNING
//------------------------------------------------------------------------------
function pruneIfNeeded(now: number): void {
  if (hits.size <= MAX_TRACKED_KEYS) return;
  for (const [key, timestamps] of hits) {
    if (timestamps.every((time) => now - time >= WINDOW_MS)) {
      hits.delete(key);
    }
  }
}
