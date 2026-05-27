import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";



/* GET ALL EXPENSES */

export async function GET() {

  try {

    const expenses =
      await prisma.expense.findMany({

        orderBy: {

          expenseDate:
            "desc",

        },

      });



    return NextResponse.json(
      expenses
    );

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



/* CREATE EXPENSE */

export async function POST(

  request: Request

) {

  try {

    const body =
      await request.json();



    const expense =
      await prisma.expense.create({

        data: {

          title:
            body.title,



          category:
            body.category,



          amount:
            Number(
              body.amount
            ),



          description:
            body.description,



          expenseDate:
            new Date(
              body.expenseDate
            ),

        },

      });



    return NextResponse.json({

      success: true,



      expense,

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