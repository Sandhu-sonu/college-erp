import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";



export async function POST(

  request: Request

) {

  try {

    const body =
      await request.json();



    const studentId =
      Number(body.studentId);



    /* FIND STUDENT */

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

        {

          status: 404,

        }

      );

    }



    /* GET LAST SEMESTER */

    const lastSemester =
      await prisma.semesterRecord.findFirst({

        where: {

          studentId,

        },



        orderBy: {

          semester:
            "desc",

        },

      });



    /* NEXT SEM */

    const nextSemester =

      lastSemester

        ? lastSemester.semester +
          1

        : 1;



    /* PREVIOUS DUE */

    const previousDue =

      lastSemester?.remainingFee ||

      0;



    /* CURRENT SEM FEE */

    const currentSemesterFee =

      body.currentSemesterFee

        ? Number(
            body.currentSemesterFee
          )

        : 0;



    /* TOTAL */

    const totalFee =

      Number(previousDue) +

      Number(currentSemesterFee);



    /* SUBJECTS */

    /* FIND COURSE */



/* SUBJECTS */

const subjects =
  await prisma.subject.findMany({

    where: {

      courseId:
  Number(
    student.courseId
  ),


      semester:
        nextSemester,

    },

  });



    const subjectNames =
  subjects.map(

    (subject) =>

      subject.subjectName

  );



    /* NO SUBJECTS */

    if (subjectNames.length === 0) {

      return NextResponse.json(

        {

          error:
            `No subjects found for Semester ${nextSemester}`,

        },

        {

          status: 400,

        }

      );

    }



    /* TOTAL SEMESTERS */

    /* TOTAL SEMESTERS */

const course =
  await prisma.course.findUnique({

    where: {

      id:
        student.courseId ?? undefined,

    },

  });



const totalSemesters =

  Number(
    course?.semesters
  ) || 6;



    /* LAST SEM CHECK */

    if (

      lastSemester &&

      lastSemester.semester >=
        totalSemesters

    ) {

      /* PENDING DUES */

      if (

  Number(
    lastSemester.remainingFee
  ) > 0

) {

        return NextResponse.json(

          {

            error:
              "Student has pending dues",

          },

          {

            status: 400,

          }

        );

      }



      /* COMPLETE STUDENT */

      await prisma.student.update({

        where: {

          id: studentId,

        },



        data: {

          status:
            "COMPLETED",

        },

      });



      return NextResponse.json({

        success: true,



        message:
          "Student completed course successfully",

      });

    }



    /* CREATE NEW SEMESTER */

    const newSemester =
      await prisma.semesterRecord.create({

        data: {

          studentId,



          semester:
            nextSemester,



          subjects:
  subjectNames.join(", "),



          previousDue,



          currentSemesterFee,



          totalFee,



          paidAmount: 0,



          remainingFee:
            totalFee,



          feeStatus:
            "PENDING",

        },

      });



    return NextResponse.json({

      success: true,



      message:
        "Student promoted successfully",



      newSemester,

    });

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