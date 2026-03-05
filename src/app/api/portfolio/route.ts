import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";

// GET: Public - list all portfolio projects with images
export async function GET() {
  const projects = await prisma.portfolioProject.findMany({
    orderBy: { order: "asc" },
    include: {
      images: { orderBy: { order: "asc" } },
    },
  });
  return NextResponse.json(projects);
}

// POST: Admin only - create project
export async function POST(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, order = 0 } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const project = await prisma.portfolioProject.create({
      data: {
        title: String(title).trim(),
        description: String(description).trim(),
        order: Number(order) || 0,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
