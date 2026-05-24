import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const resolvedParams = await params;

    const studentId = Number(resolvedParams.id);

    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    return NextResponse.json(student);

  } catch (error: any) {

    console.log("REAL ERROR:", error);

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );

  }

}
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