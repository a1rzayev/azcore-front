"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className="pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-gray-800 dark:text-white">
          Blog
        </h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          Latest updates and insights from AzCore OutSource.
        </p>

        {loading && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden bg-gray-50 dark:bg-slate-800"
              >
                <div className="aspect-video bg-gray-200 dark:bg-slate-700 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-1/3" />
                  <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-full" />
                  <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block aspect-video relative bg-gray-100 dark:bg-slate-700"
                >
                  {post.coverImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 text-4xl font-bold">
                      {post.title.charAt(0)}
                    </div>
                  )}
                </Link>
                <div className="p-5">
                  <time
                    dateTime={post.createdAt}
                    className="text-sm text-gray-500 dark:text-gray-400"
                  >
                    {formatDate(post.createdAt)}
                  </time>
                  <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-3 inline-flex gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Read more
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="mt-12 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 p-10 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              No posts yet. Check back soon for updates.
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
