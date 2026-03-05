"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
    >
      Logout
    </button>
  );
}
