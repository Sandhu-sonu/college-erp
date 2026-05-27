"use client";

import {

  useEffect,

  useState,

} from "react";



import * as XLSX from "xlsx";

import { saveAs } from "file-saver";



import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";



interface LedgerItem {

  date: string;

  type: string;

  description: string;

  income: number;

  expense: number;

  balance: number;

}



interface LedgerData {

  totalIncome: number;

  totalExpense: number;

  netBalance: number;

  ledger: LedgerItem[];

}



export default function LedgerPage() {

  const [data, setData] =
    useState<LedgerData | null>(
      null
    );



  const [fromDate, setFromDate] =
    useState("");



  const [toDate, setToDate] =
    useState("");



  /* FETCH LEDGER */

  const fetchLedger =
    async () => {

      const response =
        await fetch(

          "/api/ledger"

        );



      const result =
        await response.json();



      setData(result);

    };



  useEffect(() => {

    fetchLedger();

  }, []);



  /* FILTERED DATA */

  const filteredLedger =

    data?.ledger.filter(

      (item) => {

        if (

          !fromDate ||

          !toDate

        )

          return true;



        const itemDate =
          new Date(
            item.date
          );



        return (

          itemDate >=
            new Date(
              fromDate
            ) &&

          itemDate <=
            new Date(
              toDate
            )

        );

      }

    ) || [];



  /* EXPORT EXCEL */

  const exportLedger =
    () => {

      const exportData =
        filteredLedger.map(

          (item) => ({

            Date:
              new Date(

                item.date

              ).toLocaleDateString(),



            Type:
              item.type,



            Description:
              item.description,



            Income:
              item.income,



            Expense:
              item.expense,



            Balance:
              item.balance,

          })

        );



      const worksheet =
        XLSX.utils.json_to_sheet(

          exportData

        );



      const workbook =
        XLSX.utils.book_new();



      XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        "Ledger"

      );



      const excelBuffer =
        XLSX.write(

          workbook,

          {

            bookType:
              "xlsx",



            type: "array",

          }

        );



      const fileData =
        new Blob(

          [excelBuffer],

          {

            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

          }

        );



      saveAs(

        fileData,

        "ledger-report.xlsx"

      );

    };



  if (!data) {

    return (

      <div className="p-10 text-2xl">

        Loading...

      </div>

    );

  }



  return (

    <div className="flex">

      <Sidebar />



      <main className="body-sidebar flex-1 p-6 transition-all duration-300">

        <Navbar />



        <div className="space-y-8">

          {/* HEADER */}

          <div>

            <h1 className="text-5xl font-bold text-gray-900">

              Financial Ledger

            </h1>



            <p className="text-gray-500 mt-3 text-lg">

              Complete income & expense transactions

            </p>

          </div>



          {/* SUMMARY CARDS */}

          <div className="grid lg:grid-cols-3 gap-6">

            {/* INCOME */}

            <div className="bg-green-600 text-white rounded-3xl p-8 shadow-lg">

              <h2 className="text-2xl font-bold">

                Total Income

              </h2>



              <p className="text-5xl font-black mt-6">

                ₹

                {

                  data.totalIncome

                }

              </p>

            </div>



            {/* EXPENSE */}

            <div className="bg-red-600 text-white rounded-3xl p-8 shadow-lg">

              <h2 className="text-2xl font-bold">

                Total Expense

              </h2>



              <p className="text-5xl font-black mt-6">

                ₹

                {

                  data.totalExpense

                }

              </p>

            </div>



            {/* BALANCE */}

            <div className="bg-blue-700 text-white rounded-3xl p-8 shadow-lg">

              <h2 className="text-2xl font-bold">

                Net Balance

              </h2>



              <p className="text-5xl font-black mt-6">

                ₹

                {

                  data.netBalance

                }

              </p>

            </div>

          </div>



          {/* FILTERS */}

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <div className="flex flex-wrap gap-4">

              {/* FROM DATE */}

              <input

                type="date"

                value={fromDate}

                onChange={(e) =>

                  setFromDate(
                    e.target.value
                  )
                }

                className="border p-3 rounded-xl"
              />



              {/* TO DATE */}

              <input

                type="date"

                value={toDate}

                onChange={(e) =>

                  setToDate(
                    e.target.value
                  )
                }

                className="border p-3 rounded-xl"
              />



              {/* EXPORT */}

              <button

                onClick={exportLedger}

                className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-xl"
              >

                Export Excel

              </button>

            </div>

          </div>



          {/* LEDGER TABLE */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-3xl font-bold">

                Transaction Ledger

              </h2>



              <div className="text-gray-500">

                {

                  filteredLedger.length

                }

                {" "}

                Transactions

              </div>

            </div>



            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="p-4 text-left">

                      Date

                    </th>



                    <th className="p-4 text-left">

                      Type

                    </th>



                    <th className="p-4 text-left">

                      Description

                    </th>



                    <th className="p-4 text-left">

                      Income

                    </th>



                    <th className="p-4 text-left">

                      Expense

                    </th>



                    <th className="p-4 text-left">

                      Balance

                    </th>

                  </tr>

                </thead>



                <tbody>

                  {filteredLedger.map(

                    (

                      item,

                      index

                    ) => (

                      <tr

                        key={index}

                        className="border-b hover:bg-gray-50"
                      >

                        {/* DATE */}

                        <td className="p-4">

                          {

                            new Date(

                              item.date

                            ).toLocaleDateString()

                          }

                        </td>



                        {/* TYPE */}

                        <td className="p-4">

                          <span className={`px-4 py-2 rounded-xl text-white text-sm font-semibold ${
                            item.type ===
                            "Income"

                              ? "bg-green-600"

                              : "bg-red-600"
                          }`}>

                            {

                              item.type

                            }

                          </span>

                        </td>



                        {/* DESCRIPTION */}

                        <td className="p-4 font-medium">

                          {

                            item.description

                          }

                        </td>



                        {/* INCOME */}

                        <td className="p-4 text-green-600 font-bold">

                          {item.income >

                          0

                            ? `₹${item.income}`

                            : "-"}
                        </td>



                        {/* EXPENSE */}

                        <td className="p-4 text-red-600 font-bold">

                          {item.expense >

                          0

                            ? `₹${item.expense}`

                            : "-"}
                        </td>



                        {/* BALANCE */}

                        <td className="p-4 text-blue-700 font-bold">

                          ₹

                          {

                            item.balance

                          }

                        </td>

                      </tr>

                    )

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}