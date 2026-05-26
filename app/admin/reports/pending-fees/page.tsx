"use client";

import {

  useEffect,

  useState,

} from "react";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";



interface PendingFee {

  id: number;

  semester: number;

  totalFee: number;

  paidAmount: number;

  remainingFee: number;

  feeStatus: string;



  student: {

    id: number;

    name: string;

    course: string;

    mobile: string;

  };

}



export default function PendingFeesPage() {

  const [records, setRecords] =
    useState<PendingFee[]>([]);



  const [search, setSearch] =
    useState("");



  const fetchPendingFees =
    async () => {

      const response =
        await fetch(

          "/api/reports/pending-fees"

        );



      const data =
        await response.json();



      setRecords(

        Array.isArray(data)

          ? data

          : []

      );

    };



  useEffect(() => {

    fetchPendingFees();

  }, []);



  /* FILTER */

  const filteredRecords =
    records.filter((record) =>

      record.student.name

        .toLowerCase()

        .includes(

          search.toLowerCase()

        )

    );



  /* TOTAL */

  const totalPending =
    filteredRecords.reduce(

      (sum, record) =>

        sum +

        (record.remainingFee ||
          0),

      0

    );

const exportToExcel = () => {

  const excelData =
    filteredRecords.map(

      (record) => ({

        Student:
          record.student.name,



        Course:
          record.student.course,



        Semester:
          record.semester,



        Mobile:
          record.student.mobile,



        TotalFee:
          record.totalFee,



        Paid:
          record.paidAmount,



        Pending:
          record.remainingFee,



        Status:
          record.feeStatus,

      })

    );



  const worksheet =
    XLSX.utils.json_to_sheet(
      excelData
    );



  const workbook =
    XLSX.utils.book_new();



  XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Pending Fees"

  );



  const excelBuffer =
    XLSX.write(workbook, {

      bookType: "xlsx",

      type: "array",

    });



  const fileData =
    new Blob(

      [excelBuffer],

      {

        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",

      }

    );



  saveAs(

    fileData,

    "Pending_Fee_Report.xlsx"

  );

};

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />



      <main className="flex-1 ml-72 p-6">

        <Navbar />



        <div className="space-y-8">

          {/* HEADER */}

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-5xl font-bold text-gray-900">

                Pending Fee Report

              </h1>



              <p className="text-gray-500 mt-3 text-lg">

                Students with unpaid dues

              </p>

            </div>



            <div className="flex gap-4">

  <button

    onClick={exportToExcel}

    className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl font-bold"
  >

    Export Excel

  </button>



  <button

    onClick={() =>
      window.print()
    }

    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-bold"
  >

    Print Report

  </button>

</div>

          </div>



          {/* STATS */}

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-3xl shadow-sm p-8">

              <p className="text-gray-500">

                Pending Students

              </p>



              <h2 className="text-5xl font-bold text-red-600 mt-4">

                {
                  filteredRecords.length
                }

              </h2>

            </div>



            <div className="bg-white rounded-3xl shadow-sm p-8">

              <p className="text-gray-500">

                Total Pending Amount

              </p>



              <h2 className="text-4xl font-bold text-yellow-600 mt-4">

                ₹{totalPending}

              </h2>

            </div>



            <div className="bg-white rounded-3xl shadow-sm p-8">

              <p className="text-gray-500">

                Average Pending

              </p>



              <h2 className="text-4xl font-bold text-blue-700 mt-4">

                ₹
                {filteredRecords
                  .length > 0

                  ? Math.floor(

                      totalPending /

                        filteredRecords.length

                    )

                  : 0}

              </h2>

            </div>

          </div>



          {/* SEARCH */}

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <input
              type="text"

              placeholder="Search Student..."

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

              className="w-full border border-gray-200 p-4 rounded-2xl"
            />

          </div>



          {/* TABLE */}

          <div className="bg-white rounded-3xl shadow-sm p-8 overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-gray-100">

                  <th className="p-4 text-left">

                    Student

                  </th>



                  <th className="p-4 text-left">

                    Course

                  </th>



                  <th className="p-4 text-left">

                    Semester

                  </th>



                  <th className="p-4 text-left">

                    Total Fee

                  </th>



                  <th className="p-4 text-left">

                    Paid

                  </th>



                  <th className="p-4 text-left">

                    Pending

                  </th>



                  <th className="p-4 text-left">

                    Status

                  </th>

                </tr>

              </thead>



              <tbody>

                {filteredRecords.map(

                  (record) => (

                    <tr
                      key={record.id}

                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4">

                        <div>

                          <h3 className="font-bold">

                            {
                              record
                                .student
                                .name
                            }

                          </h3>



                          <p className="text-gray-500 text-sm mt-1">

                            {
                              record
                                .student
                                .mobile
                            }

                          </p>

                        </div>

                      </td>



                      <td className="p-4 font-semibold">

                        {
                          record
                            .student
                            .course
                        }

                      </td>



                      <td className="p-4">

                        Semester
                        {" "}
                        {
                          record.semester
                        }

                      </td>



                      <td className="p-4 font-semibold">

                        ₹
                        {
                          record.totalFee
                        }

                      </td>



                      <td className="p-4 text-green-700 font-bold">

                        ₹
                        {
                          record.paidAmount
                        }

                      </td>



                      <td className="p-4 text-red-600 font-bold">

                        ₹
                        {
                          record.remainingFee
                        }

                      </td>



                      <td className="p-4">

                        <span className="bg-red-100 text-red-700 px-4 py-2 rounded-xl font-semibold">

                          {
                            record.feeStatus
                          }

                        </span>

                      </td>

                    </tr>

                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>

  );

}