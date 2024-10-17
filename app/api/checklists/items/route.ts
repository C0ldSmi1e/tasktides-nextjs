import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/types/StandardResponse";
import { Tag } from "@/app/checklists/types/tag";

const GET = async () => {
  console.log("GET items");
  try {
    const items = await prisma.item.findMany({
      include: {
        tags: true,
      },
    });
    console.log("items", items);
    return NextResponse.json(
      successResponse({
        data: items,
        message: "Items fetched successfully",
      })
    );
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      errorResponse({
        error: "Failed to fetch items",
        message: "Failed to fetch items",
      }),
      { status: 500 }
    );
  }
};

const POST = async (req: Request) => {
  try {
    const { name, description, dueDate, isImportant, tags }: { name: string; description: string; dueDate: Date; isImportant: boolean; tags: Tag[] } = await req.json();
    console.log("tags", tags);
    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        dueDate,
        isImportant,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { id: tag.id },
            create: { name: tag.name },
          })),
        },
      },
      include: {
        tags: true,
      },
    });
    return NextResponse.json(
      successResponse({
        data: newItem,
        message: "Item created successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(errorResponse({ error: "Failed to create item", message: "Failed to create item" }), { status: 500 });
  }
};

export { GET, POST };