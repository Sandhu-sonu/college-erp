import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";



/* UPDATE EXPENSE */

export async function PUT(

  request: Request

) {

  try {

    const id =
      Number(

        request.url
          .split("/")
          .pop()

      );



    const body =
      await request.json();



    const updatedExpense =
      await prisma.expense.update({

        where: {

          id,

        },



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



      updatedExpense,

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



/* DELETE EXPENSE */

export async function DELETE(

  request: Request

) {

  try {

    const id =
      Number(

        request.url
          .split("/")
          .pop()

      );



    await prisma.expense.delete({

      where: {

        id,

      },

    });



    return NextResponse.json({

      success: true,

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