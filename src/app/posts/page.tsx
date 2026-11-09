import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Posts",
  description: "Articles, technical notes, and writings by Payton Pei.",
  alternates: {
    canonical: "/posts",
  },
  openGraph: {
    title: "Posts | Payton Pei",
    description: "Articles, technical notes, and writings by Payton Pei.",
    url: "/posts",
    type: "website",
  },
};

export default function PostsPage() {
  const posts = getPosts();

  return (
    <main className="mx-auto w-full max-w-[720px] px-4 py-8 sm:px-6 sm:py-12">
      <div className="space-y-2 pb-8 border-b border-border/60">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Posts
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Articles, notes, and technical writing.
        </p>
      </div>

      <div className="divide-y divide-border/40">
        {posts.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No posts published yet.
          </p>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className="py-6 sm:py-8 space-y-2.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:underline hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              {post.description ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
              ) : null}
              {post.tags && post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </article>
          ))
        )}
      </div>
    </main>
  );
}
