import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";



export async function GET(
  request: Request
) {

  try {

    const { searchParams } =
      new URL(request.url);



    const courseId =
      searchParams.get(
        "courseId"
      );



    const semester =
      searchParams.get(
        "semester"
      );



    const subjects =
      await prisma.subject.findMany({

        where: {

          ...(courseId
            ? {

                courseId:
                  Number(courseId),

              }
            : {}),



          ...(semester
            ? {

                semester:
                  Number(semester),

              }
            : {}),

        },



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

    console.log(error);



    return NextResponse.json(

      {

        error:
          error.message,

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
            Number(body.semester),

          subjectType:
            body.subjectType,

          courseId:
            Number(body.courseId),

        },

      });



    return NextResponse.json(
      subject
    );

  } catch (error: any) {

    return NextResponse.json(

      {

        error:
          error.message,

      },

      {

        status: 500,

      }

    );

  }

}