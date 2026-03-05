import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createToken } from "@/lib/auth";

const COOKIE_NAME = "azcore_admin_token";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, admin.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await createToken({ sub: admin.id });

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
