import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

const GET = async () => {
  const token = cookies().get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  try {
    await jose.jwtVerify(token, SECRET_KEY);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ success: false }, { status: 401 });
  }
};

export { GET };
