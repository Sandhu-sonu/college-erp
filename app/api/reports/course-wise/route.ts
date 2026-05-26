import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";



export async function GET() {

  try {

    const courses =
      await prisma.course.findMany({

        include: {

          students: true,

        },



        orderBy: {

          courseName: "asc",

        },

      });



    return NextResponse.json(
      courses
    );

  } catch (error: any) {

    console.log(error);



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