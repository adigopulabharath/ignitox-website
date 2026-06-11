//==============================================================================
// POST CARD
//==============================================================================
// Insights listing card with spotlight hover. `featured` renders the larger
// hero variant used for the newest post.
//------------------------------------------------------------------------------

import Link from "next/link";
import { formatPostDate, type Post } from "@/content/insights";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ArrowUpRightIcon } from "@/components/icons";
import { cx } from "@/lib/cx";

type PostCardProps = {
  post: Post;
  featured?: boolean;
};

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link href={`/insights/${post.slug}`} className="block h-full">
      <SpotlightCard className="h-full rounded-2xl border border-border bg-surface transition-colors hover:border-flame/50">
        <div className={cx("flex h-full flex-col", featured ? "p-8 md:p-10" : "p-6")}>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 font-mono text-[11px] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title & excerpt */}
          <h3
            className={cx(
              "mt-4 font-semibold tracking-tight text-foreground",
              featured ? "max-w-2xl text-2xl md:text-4xl" : "text-lg",
            )}
          >
            {post.title}
          </h3>
          <p
            className={cx(
              "mt-3 leading-relaxed text-muted",
              featured ? "max-w-2xl text-base" : "text-sm",
            )}
          >
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="mt-auto flex items-center justify-between pt-6 text-xs text-muted">
            <span className="font-mono">
              {formatPostDate(post.date)} · {post.readMinutes} min read
            </span>
            <ArrowUpRightIcon className="size-4 text-flame transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}
