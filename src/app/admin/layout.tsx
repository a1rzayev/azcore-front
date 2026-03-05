import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/admin"
            className="text-xl font-bold text-primary-600 dark:text-primary-400"
          >
            AzCore Admin
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/admin/portfolio"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Portfolio
            </Link>
            <Link
              href="/admin/posts"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Posts
            </Link>
            <Link
              href="/portfolio"
              target="_blank"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Portfolio →
            </Link>
            <Link
              href="/blog"
              target="_blank"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Blog →
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
