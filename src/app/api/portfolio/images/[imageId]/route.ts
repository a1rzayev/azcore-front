import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { unlink } from "fs/promises";
import path from "path";

// DELETE: Admin only
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ imageId: string }> }
) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageId } = await params;
  const image = await prisma.projectImage.findUnique({
    where: { id: imageId },
  });

  if (!image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  try {
    const filepath = path.join(process.cwd(), "public", image.path);
    await unlink(filepath).catch(() => null); // ignore if file missing
  } catch {
    // continue
  }

  await prisma.projectImage.delete({ where: { id: imageId } });
  return NextResponse.json({ success: true });
}
