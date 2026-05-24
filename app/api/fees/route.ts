import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";



// GET FEES

export async function GET(
  request: Request
) {

  try {

    const { searchParams } =
      new URL(request.url);

    const studentId =
      searchParams.get(
        "studentId"
      );

    const fees =
      await prisma.fee.findMany({

        where: {

          studentId:
            Number(studentId),

        },

        orderBy: {
          paymentDate: "desc",
        },

      });

    return NextResponse.json(
      fees
    );

  } catch (error: any) {

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );

  }

}



// ADD FEE

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    // CREATE FEE ENTRY

    const fee =
      await prisma.fee.create({

        data: {

          studentId:
            Number(
              body.studentId
            ),

          amount:
            Number(
              body.amount
            ),

          paymentMethod:
            body.paymentMethod,

          remarks:
            body.remarks,

          receiptNumber:
            `RCPT-${Date.now()}`,

        },

      });



    // GET LATEST SEMESTER RECORD

    const latestSemester =
      await prisma.semesterRecord.findFirst({

        where: {

          studentId:
            Number(
              body.studentId
            ),

        },

        orderBy: {
          semester: "desc",
        },

      });



    if (latestSemester) {

      const newPaidAmount =

        Number(
          latestSemester.paidAmount
        ) +

        Number(body.amount);



      const remainingFee =

        Number(
          latestSemester.totalFee
        ) -

        newPaidAmount;



      await prisma.semesterRecord.update({

        where: {
          id:
            latestSemester.id,
        },

        data: {

          paidAmount:
            newPaidAmount,

          remainingFee,

          feeStatus:
            remainingFee <= 0
              ? "PAID"
              : "PENDING",

        },

      });

    }

    return NextResponse.json({

      success: true,

      fee,

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