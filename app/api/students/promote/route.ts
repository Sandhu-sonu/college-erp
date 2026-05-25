import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const studentId =
      Number(
        body.studentId
      );



    // GET STUDENT

    const student =
      await prisma.student.findUnique({

        where: {
          id: studentId,
        },

      });



    if (!student) {

      return NextResponse.json(
        {
          error:
            "Student not found",
        },
        { status: 404 }
      );

    }



    // GET CURRENT SEMESTER

    const currentSemester =
      await prisma.semesterRecord.findFirst({

        where: {
          studentId,
        },

        orderBy: {
          semester: "desc",
        },

      });



    if (!currentSemester) {

      return NextResponse.json(
        {
          error:
            "Semester record not found",
        },
        { status: 404 }
      );

    }



    const nextSemester =
      currentSemester.semester + 1;



    if (nextSemester > 6) {

      return NextResponse.json(
        {
          error:
            "Student already completed course",
        },
        { status: 400 }
      );

    }



    // GET NEXT SEM SUBJECTS

    const subjects =
      await prisma.subject.findMany({

        where: {

          courseName:
            student.course,

          semester:
            nextSemester,

        },

      });



    const subjectNames =
      subjects.map(
        (s) =>
          s.subjectName
      );



    // CREATE NEW SEMESTER RECORD

    const newSemester =
      await prisma.semesterRecord.create({

        data: {

          studentId,

          semester:
            nextSemester,

          subjects:
            subjectNames.join(
              ", "
            ),

          totalFee:
            currentSemester.totalFee,

          paidAmount: 0,

          remainingFee:

            currentSemester.remainingFee +

            currentSemester.totalFee,

          feeStatus:
            "PENDING",

        },

      });



    return NextResponse.json({

      success: true,

      newSemester,

    });

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