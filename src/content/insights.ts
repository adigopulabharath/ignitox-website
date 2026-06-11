//==============================================================================
// INSIGHTS (BLOG) CONTENT
//==============================================================================
// Structured, typed posts. Adding an entry here automatically creates the
// article page, lists it on /insights, adds it to search and the sitemap.
// Content is PLACEHOLDER seed material: review or replace with real posts
// before launch. (Future option: migrate to a CMS without changing pages.)
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// TYPES (portable content blocks rendered by /insights/[slug])
//------------------------------------------------------------------------------
export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, newest first on the listing page. */
  date: string;
  readMinutes: number;
  tags: string[];
  author: { name: string; role: string };
  blocks: PostBlock[];
};

const AUTHOR = { name: "Ignitox Engineering", role: "Cloud & Web team" }; // PLACEHOLDER

//------------------------------------------------------------------------------
// POSTS (newest first)
//------------------------------------------------------------------------------
export const POSTS: Post[] = [
  //--------------------------------------------------------------------------
  // CLOUD COST OPTIMIZATION
  //--------------------------------------------------------------------------
  {
    slug: "cloud-cost-optimization-7-quick-wins",
    title: "Cloud cost optimization: 7 quick wins you can ship this week",
    excerpt:
      "Most cloud bills hide 20 to 40 percent of pure waste. Here are the fixes we apply first on AWS, Azure and Google Cloud, none of which require touching your architecture.",
    date: "2026-05-28",
    readMinutes: 6,
    tags: ["Cloud", "FinOps"],
    author: AUTHOR,
    blocks: [
      {
        type: "p",
        text: "Every cloud bill we audit tells the same story. Nobody decided to waste money, it just accumulated. An oversized instance here, an unattached volume there, a dev environment that never sleeps. The good news is that the first 20 to 40 percent of savings rarely requires touching your architecture at all.",
      },
      { type: "h2", text: "Start where the money actually is" },
      {
        type: "p",
        text: "Before optimizing anything, group your spend by service and by environment. In most accounts, three line items cover 80 percent of the bill, usually compute, managed databases and data transfer. Optimizing anything else first is procrastination with extra steps.",
      },
      { type: "h2", text: "The seven quick wins" },
      {
        type: "ul",
        items: [
          "Rightsize compute. Most instances run below 20 percent utilization, so one size down is usually free performance headroom.",
          "Schedule non-production. Dev and staging don't need nights or weekends, and an off-hours schedule cuts their cost by about 65 percent.",
          "Delete unattached storage. Orphaned volumes and old snapshots quietly bill forever.",
          "Buy commitments for the steady baseline. Reserved instances and savings plans make sense for anything that has run for six months straight.",
          "Cap log retention. Thirty to ninety days of hot logs is plenty when archives go to cold storage.",
          "Move static assets behind a CDN. Serving files from object storage through a CDN costs far less than serving them from compute.",
          "Tag everything, then show each team its own bill. Visibility alone changes behaviour.",
        ],
      },
      {
        type: "quote",
        text: "The cheapest instance is the one you turned off. The second cheapest is the one you committed to.",
      },
      { type: "h2", text: "Make it stick" },
      {
        type: "p",
        text: "One-off cleanups decay. Put a monthly 30-minute cost review on the calendar, alert on anomalies, and require a budget tag on every new resource. That's the whole system. It's boring, and it works.",
      },
      {
        type: "p",
        text: "Want the numbers for your own account? Our cloud assessment includes a cost audit with a prioritized savings list. Get in touch and we'll show you what your bill is hiding.",
      },
    ],
  },

  //--------------------------------------------------------------------------
  // WEBSITE SPEED = REVENUE
  //--------------------------------------------------------------------------
  {
    slug: "why-website-speed-is-revenue",
    title: "Why your website should load in under 2 seconds (and how)",
    excerpt:
      "Speed isn't a vanity metric. It drives conversion, search rankings and ad spend efficiency all at once. Here's the playbook we use to get loads under two seconds.",
    date: "2026-05-12",
    readMinutes: 5,
    tags: ["Web Development", "Performance"],
    author: AUTHOR,
    blocks: [
      {
        type: "p",
        text: "Visitors don't compare your site to your competitors' sites. They compare it to the fastest thing they used today. Every extra second of load time measurably increases bounce rate, and Google folds the same signals into its rankings through Core Web Vitals. Slow is expensive twice.",
      },
      { type: "h2", text: "What actually makes sites slow" },
      {
        type: "ul",
        items: [
          "Unoptimized images, which are usually half the page weight. Modern formats and correct sizing fix most of it.",
          "JavaScript doing HTML's job, rendering content in the browser that could have been static.",
          "Third-party scripts. Every chat widget, tracker and testing tool runs on your visitors' phones.",
          "No CDN. Physics still applies, and distance is latency.",
          "Web fonts loaded badly, blocking text the browser could already show.",
        ],
      },
      { type: "h2", text: "The playbook" },
      {
        type: "p",
        text: "Render pages to static HTML at build time, serve them from a CDN, optimize images automatically, self-host fonts with sensible fallbacks, and put a performance budget in your build pipeline so regressions fail the build instead of reaching production. This site practices what we preach. It ships kilobytes, not megabytes.",
      },
      {
        type: "quote",
        text: "Performance isn't a feature you add at the end. It's the absence of weight you never added.",
      },
      {
        type: "p",
        text: "If your Lighthouse scores are in the red, we offer a fixed-price performance overhaul: an audit, the fixes, and a budget in CI that keeps things fast. Bring us your slowest page.",
      },
    ],
  },

  //--------------------------------------------------------------------------
  // MANAGED VS DIY HOSTING
  //--------------------------------------------------------------------------
  {
    slug: "managed-vs-diy-hosting",
    title: "Managed hosting vs DIY: an honest comparison",
    excerpt:
      "A five dollar server looks cheaper than managed hosting, until you price in patching, backups, monitoring and the 3 a.m. incident. Here's how to decide.",
    date: "2026-04-30",
    readMinutes: 7,
    tags: ["Hosting", "Operations"],
    author: AUTHOR,
    blocks: [
      {
        type: "p",
        text: "We sell managed hosting, so you'd expect us to say doing it yourself is a trap. It isn't. We run our own infrastructure on plain servers and we love it. The real question is whose time gets spent keeping it boring, and what that time costs your business.",
      },
      { type: "h2", text: "What DIY really includes" },
      {
        type: "ul",
        items: [
          "Security patching for the operating system and every service, forever",
          "TLS certificates, renewals, and the day they silently fail",
          "Backups, plus the restore drills that make them real",
          "Monitoring, and being the person the alert wakes up",
          "Capacity planning before launches and traffic spikes",
        ],
      },
      {
        type: "p",
        text: "None of this is hard individually. It's the forever part that gets teams: the discipline tax of doing it every month while also building your actual product.",
      },
      { type: "h2", text: "A simple decision rule" },
      {
        type: "p",
        text: "If you have an engineer who genuinely enjoys ops work and your downtime tolerance is measured in hours, DIY is fine and educational. If downtime costs you customers, or that engineer has better things to build, managed hosting pays for itself with the first incident that never happens.",
      },
      {
        type: "quote",
        text: "You're not paying for the server. You're paying for the incidents that never reach you.",
      },
      {
        type: "p",
        text: "Our managed hosting includes everything in the list above, with a 99.9 percent uptime target and humans on call. If you're weighing the options for your site, ask us for the breakdown. We'll tell you honestly if DIY is the better fit.",
      },
    ],
  },
];

//------------------------------------------------------------------------------
// HELPERS
//------------------------------------------------------------------------------
export function getPost(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
