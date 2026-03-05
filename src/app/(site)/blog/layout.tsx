import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | AzCore OutSource",
  description:
    "Latest updates and posts from AzCore OutSource.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
