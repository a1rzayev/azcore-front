import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";

// GET: Public - single post (by id or slug)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await prisma.post.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
      published: true,
    },
  });
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

// PATCH: Admin only
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { title, slug, excerpt, content, coverImage, published, order } = body;

  const data: Record<string, unknown> = {};
  if (title !== undefined) data.title = String(title).trim();
  if (excerpt !== undefined) data.excerpt = excerpt ? String(excerpt).trim() : null;
  if (content !== undefined) data.content = String(content).trim();
  if (coverImage !== undefined) data.coverImage = coverImage || null;
  if (published !== undefined) data.published = !!published;
  if (order !== undefined) data.order = Number(order) ?? 0;

  if (slug !== undefined) {
    const slugValue = String(slug).trim();
    const existing = await prisma.post.findFirst({
      where: { slug: slugValue, NOT: { id } },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }
    data.slug = slugValue;
  }

  const post = await prisma.post.update({
    where: { id },
    data,
  });
  return NextResponse.json(post);
}

// DELETE: Admin only
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
