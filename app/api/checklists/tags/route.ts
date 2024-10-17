import { NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/types/StandardResponse";
import prisma from "@/lib/prisma";

const GET = async () => {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        items: true,
      },
    });
    console.log(tags);
    return NextResponse.json(
      successResponse({
        data: tags,
        message: "Tags fetched successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(errorResponse({ error: "Failed to fetch tags", message: "Failed to fetch tags" }), { status: 500 });
  }
};


const POST = async (req: Request) => {
  try {
    const { name } = await req.json();
    const newTag = await prisma.tag.create({
      data: {
        name,
      },
    });
    return NextResponse.json(
      successResponse({
        data: newTag,
        message: "Tag created successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(errorResponse({ error: "Failed to create tag", message: "Failed to create tag" }), { status: 500 });
  }
};

export { GET, POST };
