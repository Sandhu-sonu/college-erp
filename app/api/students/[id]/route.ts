import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



// GET SINGLE STUDENT

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const resolvedParams =
      await params;

    const student =
      await prisma.student.findUnique({

        where: {
          id: Number(
            resolvedParams.id
          ),
        },

        include: {

          semesterRecords: {

            orderBy: {
              semester: "asc",
            },

          },

        },

      });

    return NextResponse.json(
      student
    );

  } catch (error: any) {

    console.log(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );

  }

}



// UPDATE STUDENT

export async function PUT(
  request: Request,
  context: any
) {

  try {

    const id =
      Number(
        context.params.id
      );

    const body =
      await request.json();

    const student =
      await prisma.student.update({

        where: { id },

        data: {

          name:
            body.name,

          fatherName:
            body.fatherName,

          mobile:
            body.mobile,

          feeStatus:
            body.feeStatus,

        },

      });

    return NextResponse.json({

      success: true,

      student,

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


// DELETE STUDENT

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const resolvedParams =
      await params;

    const studentId =
      Number(
        resolvedParams.id
      );



    await prisma.student.update({

      where: {

        id: studentId,

      },



      data: {

        status: "DELETED",

      },

    });



    return NextResponse.json({

      success: true,

    });

  } catch (error: any) {

    console.log(
      "DELETE ERROR:",
      error
    );



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
