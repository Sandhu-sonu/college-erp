import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";



export async function DELETE(

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



    await prisma.subject.delete({

      where: {

        id: Number(id),

      },

    });



    return NextResponse.json({

      success: true,

    });

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