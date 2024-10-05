import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const POST = async () => {
  cookies().set("auth_token", "", {
    expires: new Date(0),
    httpOnly: true, 
    secure: true
  });
  return NextResponse.json({ success: true }, { status: 200 });
};

export { POST };
