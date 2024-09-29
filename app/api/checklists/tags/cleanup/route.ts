import { NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/types/StandardResponse";
import prisma from "@/lib/prisma";

const POST = async () => {
  try {
    const tags = await prisma.tag.deleteMany({
      where: {
        items: {
          none: {},
        },
      },
    });
    return NextResponse.json(successResponse({
      data: tags,
      message: "Tags cleaned up successfully",
    }));
  } catch (error) {
    return NextResponse.json(errorResponse({
      error: "Failed to cleanup tags",
      message: "Failed to cleanup tags",
    }), { status: 500 });
  }
};

export { POST };