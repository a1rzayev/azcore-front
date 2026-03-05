import { NextResponse } from "next/server";

const COOKIE_NAME = "azcore_admin_token";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
