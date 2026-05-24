import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await context.params;

    await prisma.inquiry.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Inquiry Deleted",
    });

  } catch (error) {

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}