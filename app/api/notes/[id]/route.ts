import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/types/StandardResponse";

const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    const note = await prisma.note.findUnique({ where: { id } });
    return NextResponse.json(successResponse({ data: note }));
  } catch (error) {
    return NextResponse.json(errorResponse({ error: error as string }));
  }
};

export { GET };
