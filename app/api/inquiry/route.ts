import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const inquiry = await prisma.inquiry.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        mobile: body.mobile,
        course: body.course,
        message: body.message,
      },
    });

    return NextResponse.json(inquiry);

  } catch (error) {

    console.log("ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}