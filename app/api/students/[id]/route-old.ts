import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: any
) {

  try {

    const student = await prisma.student.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(student);

  } catch (error: any) {

    console.log(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );

  }

}