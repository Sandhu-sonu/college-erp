import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";



export async function GET() {

  try {

    const records =
      await prisma.semesterRecord.findMany({

        where: {

          remainingFee: {

            gt: 0,

          },

        },



        include: {

          student: true,

        },



        orderBy: {

          remainingFee: "desc",

        },

      });



    return NextResponse.json(
      records
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