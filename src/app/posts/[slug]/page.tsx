import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const canonicalUrl = `/posts/${slug}`;
  const images = post.cover ? [post.cover] : undefined;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.date,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Payton Pei",
      url: "https://cv.paytonpei.top",
    },
    ...(post.cover
      ? {
          image: post.cover.startsWith("http")
            ? post.cover
            : `https://cv.paytonpei.top${post.cover}`,
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main className="mx-auto w-full max-w-[720px] px-4 py-8 sm:px-6 sm:py-12">
        <article lang={post.lang}>
          <header className="space-y-3 pb-8 border-b border-border/60">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <time dateTime={post.date}>{post.date}</time>
              {post.tags && post.tags.length > 0 ? (
                <>
                  <span>•</span>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>
            {post.description ? (
              <p className="text-base text-muted-foreground sm:text-lg">
                {post.description}
              </p>
            ) : null}
          </header>

          {post.cover ? (
            <div className="my-8 overflow-hidden rounded-lg border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover}
                alt={post.title}
                className="w-full h-auto object-cover max-h-[420px]"
              />
            </div>
          ) : null}

          <div
            className="post-body mt-8"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <footer className="mt-12 pt-6 border-t border-border/60">
            <Link
              href="/posts"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {post.lang?.startsWith("zh") ? "← 所有文章" : "← All posts"}
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}
