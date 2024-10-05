import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);
const PASSWORD = process.env.APP_PASSWORD as string;

const POST = async (req: Request) => {
  const { password } = await req.json();

  if (password === PASSWORD) {
    const token = await new jose.SignJWT({ authorized: true })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(SECRET_KEY);

    cookies().set("auth_token", token, { httpOnly: true, secure: true });
    return NextResponse.json({ success: true }, { status: 200 });
  }
  return NextResponse.json({ success: false }, { status: 401 });
};

export { POST };