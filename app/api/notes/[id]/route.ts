import prisma from "@/lib/prisma";
import { Note } from "@/app/notes/types/note";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/types/StandardResponse";

const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    const note: Note | null = null;
    return NextResponse.json(successResponse({ data: note }));
  } catch (error) {
    return NextResponse.json(errorResponse({ error: error as string }));
  }
};

export { GET };
