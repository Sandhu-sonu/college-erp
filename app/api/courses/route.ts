import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const course = await prisma.course.create({
      data: {
        courseName: body.courseName,
        totalFee: Number(body.totalFee),
        duration: body.duration,
      },
    });

    return NextResponse.json({
      success: true,
      course,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );

  }

}

export async function GET() {

  const courses = await prisma.course.findMany({
    orderBy: {
      courseName: "asc",
    },
  });

  return NextResponse.json(courses);

}