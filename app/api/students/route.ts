import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";



// GET ALL STUDENTS

export async function GET() {

  try {

    const students =
      await prisma.student.findMany({

        include: {

          semesterRecords: {

            orderBy: {
              semester: "desc",
            },

            take: 1,

          },

        },

        orderBy: {
          createdAt: "desc",
        },

      });

    return NextResponse.json(
      students
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


// CREATE STUDENT

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    // AUTO CALCULATE REMAINING FEE

    const remainingFee =

      Number(body.totalFee) -

      Number(body.paidAmount);

    // AUTO DETERMINE STATUS

    const feeStatus =

      remainingFee <= 0
        ? "PAID"
        : "PENDING";



    // CREATE STUDENT

    const student =
      await prisma.student.create({

        data: {

          name:
            body.studentName,

          fatherName:
            body.fatherName,

          mobile:
            body.mobile,

          course:
            body.course,

          feeStatus,

        },

      });



    // CREATE SEMESTER RECORD

    await prisma.semesterRecord.create({

      data: {

        studentId:
          student.id,

        semester:
          Number(body.semester),

        subjects:
          body.subjects,

        totalFee:
          Number(body.totalFee),

        paidAmount:
          Number(body.paidAmount),

        remainingFee,

        feeStatus,

      },

    });

    return NextResponse.json({

      success: true,

      student,

    });

  } catch (error: any) {

    console.log(
      "STUDENT CREATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );

  }

}