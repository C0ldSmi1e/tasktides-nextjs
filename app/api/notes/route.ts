import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/types/StandardResponse";

const GET = async () => {
  try {
    const notes = await prisma.note.findMany();
    return NextResponse.json(
      successResponse({
        data: notes,
        message: "Notes fetched successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      errorResponse({
        error: error as string,
        message: "Failed to fetch notes",
      })
    );
  }
};

const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { title, content, isImportant } = body;
  try {
    const note = await prisma.note.create({
      data: { title, content, isImportant },
    });
    return NextResponse.json(successResponse({ data: note }));
  } catch (error) {
    return NextResponse.json(
      errorResponse({
        error: error as string,
        message: "Failed to create note",
      })
    );
  }
};

export { GET, POST };
