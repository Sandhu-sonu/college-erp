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

const course =
  await prisma.course.findFirst({

    where: {

      courseName:
        student.course,

    },

  });



if (!course) {

  return NextResponse.json(

    {

      error:
        "Course not found",

    },

    {

      status: 400,

    }

  );

}



/* SUBJECTS */

const subjects =
  await prisma.subject.findMany({

    where: {

      courseId:
        course.id,



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

    const totalSemesters =
      student.course
        ?.toLowerCase()
        .includes("mca")

        ? 4

        : student.course
            ?.toLowerCase()
            .includes("bca")

        ? 6

        : 6;



    /* LAST SEM CHECK */

    if (

      lastSemester &&

      lastSemester.semester >=
        totalSemesters

    ) {

      /* PENDING DUES */

      if (

        lastSemester.remainingFee >
        0

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