import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Manage your portfolio and blog content. Public users can only view company info.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/admin/portfolio"
          className="block p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Portfolio
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Add, edit, and manage portfolio projects with images for the slideshow.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400">
            Manage Portfolio →
          </span>
        </Link>

        <Link
          href="/admin/posts"
          className="block p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Blog Posts
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create, edit, and publish blog posts. Drafts are hidden from the public.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400">
            Manage Posts →
          </span>
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Quick links
        </h3>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            Home
          </a>
          <a
            href="/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            Portfolio (public)
          </a>
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            Blog (public)
          </a>
        </div>
      </div>
    </div>
  );
}
