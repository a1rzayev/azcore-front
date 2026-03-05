import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";

// GET: Public - list posts (published only for public, or all for admin)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const admin = await getAuthenticatedAdmin();
  const includeDrafts = searchParams.get("drafts") === "true" && !!admin;

  const posts = await prisma.post.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    where: includeDrafts ? undefined : { published: true },
  });
  return NextResponse.json(posts);
}

// POST: Admin only - create post
export async function POST(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, coverImage, published, order } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const slugValue =
      slug?.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const existing = await prisma.post.findUnique({
      where: { slug: slugValue },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title: String(title).trim(),
        slug: slugValue,
        excerpt: excerpt ? String(excerpt).trim() : null,
        content: String(content).trim(),
        coverImage: coverImage || null,
        published: !!published,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
