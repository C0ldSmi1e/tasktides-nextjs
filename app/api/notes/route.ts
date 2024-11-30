import { Note } from "@/app/notes/types/note";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/types/StandardResponse";

const GET = async () => {
  try {
    const notes: Note[] = [];
    return NextResponse.json(
      successResponse({
        data: notes,
        message: "Notes fetched successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(errorResponse({ error: error as string }));
  }
};

export { GET };
