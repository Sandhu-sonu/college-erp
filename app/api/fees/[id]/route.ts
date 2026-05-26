import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";



export async function GET(

  request: Request,

  context: {

    params: Promise<{

      id: string;

    }>;

  }

) {

  try {

    const { id } =
      await context.params;



    const fees =
      await prisma.fee.findMany({

        where: {

          studentId: Number(id),

        },

        orderBy: {

          paymentDate: "desc",

        },

      });



    return NextResponse.json(
      fees
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