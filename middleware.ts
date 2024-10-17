import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("auth_token")?.value;

  console.log("token", token);

  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/api/auth" ||
    req.nextUrl.pathname === "/api/logout" ||
    req.nextUrl.pathname === "/api/check-auth"
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jose.jwtVerify(token, SECRET_KEY);

    return NextResponse.next();
  } catch (error) {
    console.log("error", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export default middleware;