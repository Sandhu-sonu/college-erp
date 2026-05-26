import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";



export async function GET() {

  try {

    const courses =
      await prisma.course.findMany({

        include: {

          subjects: true,

        },

        orderBy: {

          createdAt: "desc",

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



    const course =
      await prisma.course.create({

        data: {

          courseName:
            body.courseName,

          duration:
            body.duration,

          semesters:
            body.semesters,

          totalFee:
            body.totalFee || 0,

        },

      });



    return NextResponse.json(
      course
    );

  } catch (error: any) {console.log(error);

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