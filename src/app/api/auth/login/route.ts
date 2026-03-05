import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  verifyPassword,
  createToken,
  setAuthCookie,
} from "@/lib/auth";

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
    await setAuthCookie(token);

    // #region agent log
    fetch('http://127.0.0.1:7931/ingest/af8e5731-0c54-455b-b3c7-a6a0ba6afaa0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'987f9d'},body:JSON.stringify({sessionId:'987f9d',location:'api/auth/login/route.ts:41',message:'Cookie set attempted, returning success',data:{tokenLength:token.length},hypothesisId:'H-B',timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    const response = NextResponse.json({ success: true });

    // #region agent log
    const setCookieHeader = response.headers.get('set-cookie');
    fetch('http://127.0.0.1:7931/ingest/af8e5731-0c54-455b-b3c7-a6a0ba6afaa0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'987f9d'},body:JSON.stringify({sessionId:'987f9d',location:'api/auth/login/route.ts:47',message:'Response set-cookie header check',data:{setCookieHeader},hypothesisId:'H-B',timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    return response;
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7931/ingest/af8e5731-0c54-455b-b3c7-a6a0ba6afaa0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'987f9d'},body:JSON.stringify({sessionId:'987f9d',location:'api/auth/login/route.ts:53',message:'Login API threw exception',data:{error:String(error)},hypothesisId:'H-D',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
