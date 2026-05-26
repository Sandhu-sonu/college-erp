import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";



export async function GET() {

  try {

    const subjects =
      await prisma.subject.findMany({

        include: {

          course: true,

        },

        orderBy: [

          {

            semester: "asc",

          },

        ],

      });



    return NextResponse.json(
      subjects
    );

  } catch (error: any) {

    return NextResponse.json(

      {

        error: error.message,

      },

      {

        status: 500,

      }

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

          semester:
            body.semester,

          subjectType:
            body.subjectType,

          courseId:
            body.courseId,

        },

      });



    return NextResponse.json(
      subject
    );

  } catch (error: any) {

    return NextResponse.json(

      {

        error: error.message,

      },

      {

        status: 500,

      }

    );

  }

}