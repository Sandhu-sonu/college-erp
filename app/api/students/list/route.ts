import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    const students =
  await prisma.student.findMany({

    where: {

      OR: [

        {

          status:
            "ACTIVE",

        },



        {

          status: null,

        },

      ],

    },



    include: {

      semesterRecords: {

        orderBy: {

          semester:
            "desc",

        },



        take: 1,

      },

    },



    orderBy: {

      createdAt:
        "desc",

    },

  });
    return NextResponse.json(students);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );

  }

}