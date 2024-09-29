import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Item } from "@/app/checklists/types/item";
import { successResponse, errorResponse } from "@/types/StandardResponse";

const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: params.id,
      },
      include: {
        tags: true,
      },
    });
    return NextResponse.json(
      successResponse({
        data: item,
        message: "Item fetched successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      errorResponse({
        error: "Failed to fetch item",
        message: "Failed to fetch item",
      }),
      { status: 500 }
    );
  }
};

const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const item: Item = await req.json();
    console.log("PUT request received");
    console.log("Item:", item);
    const updatedItem = await prisma.item.update({
      where: {
        id: params.id,
      },
      data: {
        name: item.name,
        description: item.description,
        dueDate: item.dueDate,
        isDone: item.isDone,
        isImportant: item.isImportant,
        tags: {
          set: [],
          connectOrCreate: item.tags.map((tag) => ({
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
        data: updatedItem,
        message: "Item updated successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(errorResponse({
      error: "Failed to update item",
      message: "Failed to update item",
    }),
    { status: 500 }
    );
  }
};

const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const item = await prisma.item.delete({
      where: {
        id: params.id,
      },
      include: {
        tags: true,
      },
    });
    return NextResponse.json(
      successResponse({
        data: item,
        message: "Item deleted successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      errorResponse({
        error: "Failed to delete item",
        message: "Failed to delete item",
      }),
      { status: 500 }
    );
  }
};

export { GET, PUT, DELETE };