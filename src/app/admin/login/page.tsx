"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // #region agent log
      fetch('http://127.0.0.1:7931/ingest/af8e5731-0c54-455b-b3c7-a6a0ba6afaa0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'987f9d'},body:JSON.stringify({sessionId:'987f9d',location:'admin/login/page.tsx:26',message:'API response received',data:{status:res.status,ok:res.ok,data},hypothesisId:'H-A',timestamp:Date.now()})}).catch(()=>{});
      // #endregion

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // #region agent log
      fetch('http://127.0.0.1:7931/ingest/af8e5731-0c54-455b-b3c7-a6a0ba6afaa0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'987f9d'},body:JSON.stringify({sessionId:'987f9d',location:'admin/login/page.tsx:33',message:'About to call router.replace(/admin)',data:{},hypothesisId:'H-C',timestamp:Date.now()})}).catch(()=>{});
      // #endregion

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Login
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Sign in to manage your portfolio
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="text-primary-600 hover:text-primary-500">
              ← Back to site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
