import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const student = await prisma.student.create({
      data: {
        studentName: body.studentName,
        fatherName: body.fatherName,
        course: body.course,
        mobile: body.mobile,
        feeStatus: body.feeStatus,
      },
    });

    return NextResponse.json(student);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
export async function DELETE(request: Request) {

  try {

    const { id } = await request.json();

    await prisma.student.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      message: "Student Deleted",
    });

  } catch (error) {

    return NextResponse.json(
      { error: "Delete Failed" },
      { status: 500 }
    );
  }
}