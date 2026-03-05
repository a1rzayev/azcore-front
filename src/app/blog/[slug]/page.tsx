import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.post.findFirst({
    where: { slug, published: true },
  });

  if (!post) notFound();

  return (
    <Container className="pb-16">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:underline mb-6"
        >
          ← Back to Blog
        </Link>

        <header className="mb-8">
          <time
            dateTime={post.createdAt.toISOString()}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {post.createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              {post.excerpt}
            </p>
          )}
        </header>

        {post.coverImage && (
          <div className="mb-8 rounded-xl overflow-hidden aspect-video bg-gray-100 dark:bg-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
            {post.content}
          </div>
        </div>
      </article>
    </Container>
  );
}

