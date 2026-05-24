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
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const resolvedParams = await params;

    const body = await request.json();

    const updatedStudent = await prisma.student.update({

      where: {
        id: Number(resolvedParams.id),
      },

      data: {

        studentName: body.studentName,

        fatherName: body.fatherName,
        photo: body.photo,

        mobile: body.mobile,

        course: body.course,

        session: body.session,

        paidAmount: Number(body.paidAmount),

      },

    });

    return NextResponse.json(updatedStudent);

  } catch (error: any) {

    console.log("UPDATE ERROR:", error);

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

    const resolvedParams = await params;

    await prisma.student.delete({

      where: {
        id: Number(resolvedParams.id),
      },

    });

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {

    console.log("DELETE ERROR:", error);

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );

  }

}