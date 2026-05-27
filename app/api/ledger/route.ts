import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";



export async function GET() {

  try {

    /* FEES */

    const fees =
      await prisma.fee.findMany({

        include: {

          student: true,

        },

      });



    /* EXPENSES */

    const expenses =
      await prisma.expense.findMany();



    /* TRANSACTIONS ARRAY */

    const transactions: any[] =
      [];



    /* PUSH FEES */

    fees.forEach((fee) => {

      transactions.push({

        date:
          fee.paymentDate,



        type: "Income",



        description:
          `${fee.student?.name} Fee Payment`,



        income:
          fee.amount,



        expense: 0,

      });

    });



    /* PUSH EXPENSES */

    expenses.forEach(

      (expense) => {

        transactions.push({

          date:
            expense.expenseDate,



          type: "Expense",



          description:
            expense.title,



          income: 0,



          expense:
            expense.amount,

        });

      }

    );



    /* SORT BY DATE */

    transactions.sort(

      (a, b) =>

        new Date(
          a.date
        ).getTime() -

        new Date(
          b.date
        ).getTime()

    );



    /* RUNNING BALANCE */

    let runningBalance = 0;



    const ledger =
      transactions.map(

        (transaction) => {

          runningBalance +=

            transaction.income -

            transaction.expense;



          return {

            ...transaction,



            balance:
              runningBalance,

          };

        }

      );



    /* TOTALS */

    const totalIncome =
      ledger.reduce(

        (sum, item) =>

          sum + item.income,

        0

      );



    const totalExpense =
      ledger.reduce(

        (sum, item) =>

          sum + item.expense,

        0

      );



    return NextResponse.json({

      totalIncome,

      totalExpense,



      netBalance:
        totalIncome -
        totalExpense,



      ledger,

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