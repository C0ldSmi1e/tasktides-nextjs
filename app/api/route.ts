import { NextResponse } from "next/server";

const GET = () => {
  return NextResponse.json({ message: "Hello World" });
};

export { GET };