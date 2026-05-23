import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    console.log(body);

    const fee = await prisma.fee.create({
      data: {
        studentId: Number(body.studentId),
        amount: Number(body.amount),
        status: body.status,
      },
    });

    return NextResponse.json({
      success: true,
      fee,
    });

  } catch (error) {

    console.log("FEE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to save fee" },
      { status: 500 }
    );
  }
}