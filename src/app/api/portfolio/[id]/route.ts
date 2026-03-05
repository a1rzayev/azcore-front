import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";

// GET: Public - single project
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = await prisma.portfolioProject.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
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
  const { title, description, order } = body;

  const data: { title?: string; description?: string; order?: number } = {};
  if (title !== undefined) data.title = String(title).trim();
  if (description !== undefined) data.description = String(description).trim();
  if (order !== undefined) data.order = Number(order) ?? 0;

  const project = await prisma.portfolioProject.update({
    where: { id },
    data,
  });
  return NextResponse.json(project);
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
  await prisma.portfolioProject.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
