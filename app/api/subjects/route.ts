import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";



export async function GET(
  request: Request
) {

  try {

    const { searchParams } =
      new URL(request.url);

    const course =
      searchParams.get(
        "course"
      );

    const semester =
      searchParams.get(
        "semester"
      );

    const subjects =
      await prisma.subject.findMany({

        where: {

          courseName:
            course || undefined,

          semester:
            semester
              ? Number(
                  semester
                )
              : undefined,

        },

      });

    return NextResponse.json(
      subjects
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

    const subject =
      await prisma.subject.create({

        data: {

          subjectName:
            body.subjectName,

          courseName:
            body.courseName,

          semester:
            Number(
              body.semester
            ),

          subjectType:
            body.subjectType,

        },

      });

    return NextResponse.json({

      success: true,

      subject,

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