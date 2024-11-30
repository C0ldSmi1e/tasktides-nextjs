import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/types/StandardResponse";

const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(successResponse({ data: note }));
  } catch (error) {
    return NextResponse.json(
      errorResponse({
        error: error as string,
        message: "Failed to fetch note",
      })
    );
  }
};

const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const body = await req.json();
  const { title, content, isImportant } = body;
  try {
    const note = await prisma.note.update({
      where: { id },
      data: { title, content, isImportant },
    });
    return NextResponse.json(successResponse({ data: note }));
  } catch (error) {
    return NextResponse.json(
      errorResponse({
        error: error as string,
        message: "Failed to update note",
      })
    );
  }
};

const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    const note = await prisma.note.delete({ where: { id } });
    return NextResponse.json(
      successResponse({
        data: note,
        message: "Note deleted successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      errorResponse({
        error: error as string,
        message: "Failed to delete note",
      })
    );
  }
};

export { GET, PUT, DELETE };
