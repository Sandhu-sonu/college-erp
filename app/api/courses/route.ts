import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";



export async function GET() {

  try {

    const courses =
      await prisma.course.findMany({

        orderBy: {
          id: "asc",
        },

      });

    return NextResponse.json(
      courses
    );

  } catch (error: any) {

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );

  }

}



export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const course =
      await prisma.course.create({

        data: {

          courseName:
            body.courseName,

          totalFee:
            Number(body.totalFee),

          duration:
            body.duration,

        },

      });

    return NextResponse.json({

      success: true,

      course,

    });

  } catch (error: any) {

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );

  }

}