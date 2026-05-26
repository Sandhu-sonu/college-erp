import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";



export async function GET() {

  try {

    /* TOTAL STUDENTS */

    const totalStudents =
      await prisma.student.count();



    /* TOTAL COURSES */

    const totalCourses =
      await prisma.course.count();



    /* TOTAL SUBJECTS */

    const totalSubjects =
      await prisma.subject.count();



    /* TOTAL COLLECTION */

    const fees =
      await prisma.fee.findMany();



    const totalCollection =
      fees.reduce(

        (sum, fee) =>

          sum + fee.amount,

        0

      );



    /* RECENT STUDENTS */

    const recentStudents =
      await prisma.student.findMany({

        take: 5,



        orderBy: {

          createdAt: "desc",

        },

      });



    /* RECENT PAYMENTS */

    const recentPayments =
      await prisma.fee.findMany({

        include: {

          student: true,

        },



        take: 5,



        orderBy: {

          paymentDate: "desc",

        },

      });



    return NextResponse.json({

      totalStudents,

      totalCourses,

      totalSubjects,

      totalCollection,

      recentStudents,

      recentPayments,

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