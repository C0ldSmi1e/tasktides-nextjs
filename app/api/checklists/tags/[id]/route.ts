import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Tag } from "@/app/checklists/types/tag";
import { successResponse, errorResponse } from "@/types/StandardResponse";

const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const tag = await prisma.tag.findUnique({
      where: {
        id: params.id,
      },
      include: {
        items: true,
      },
    });
    return NextResponse.json(
      successResponse({
        data: tag,
        message: "Tag fetched successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(errorResponse({ error: "Failed to fetch tag", message: "Failed to fetch tag" }), { status: 500 });
  }
};


const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const tag: Tag = await req.json();
    const updatedTag = await prisma.tag.update({
      where: {
        id: params.id,
      },
      data: tag,
    });
    return NextResponse.json(
      successResponse({
        data: updatedTag,
        message: "Tag updated successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(errorResponse({ error: "Failed to update tag", message: "Failed to update tag" }), { status: 500 });
  }
};

const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const tag = await prisma.tag.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(
      successResponse({
        data: tag,
        message: "Tag deleted successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(errorResponse({ error: "Failed to delete tag", message: "Failed to delete tag" }), { status: 500 });
  }
};

export { GET, PUT, DELETE };
