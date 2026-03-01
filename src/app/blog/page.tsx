"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { INSTAGRAM_PROFILE_URL } from "@/data/instagram";

type Post = {
  id: string;
  caption: string;
  imageUrl: string;
  permalink: string;
  timestamp: string;
  mediaType: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/instagram-posts")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.posts?.length) {
          setPosts(data.posts);
          setError(null);
        } else if (data.error) {
          setError(data.error);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load posts");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container className="pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-gray-800 dark:text-white">
          Blog
        </h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          Latest from our Instagram{" "}
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
          >
            @azcore.az
          </a>
        </p>

        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-50 dark:bg-slate-800 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-slate-700 transition-colors"
        >
          <InstagramIcon />
          Follow us on Instagram
        </a>

        {loading && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden bg-gray-50 dark:bg-slate-800"
              >
                <div className="aspect-square bg-gray-200 dark:bg-slate-700 animate-pulse" />
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
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square relative bg-gray-100 dark:bg-slate-700"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imageUrl}
                    alt={post.caption.slice(0, 100) || "Instagram post"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {post.mediaType === "VIDEO" && (
                    <span className="absolute top-3 right-3 rounded bg-black/60 px-2 py-1 text-xs text-white">
                      Video
                    </span>
                  )}
                </a>
                <div className="p-5">
                  <time
                    dateTime={post.timestamp}
                    className="text-sm text-gray-500 dark:text-gray-400"
                  >
                    {formatDate(post.timestamp)}
                  </time>
                  {post.caption && (
                    <p className="mt-2 text-gray-700 dark:text-gray-300 line-clamp-3">
                      {post.caption}
                    </p>
                  )}
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    View on Instagram
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="mt-12 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 p-10 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              {error
                ? "Instagram posts could not be loaded. Make sure INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_IG_USER_ID (or INSTAGRAM_PAGE_ID) are set in your environment."
                : "Follow us on Instagram to see our latest updates and posts."}
            </p>
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              <InstagramIcon />
              Visit @azcore.az
            </a>
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

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
