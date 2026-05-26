"use client";

import {

  useEffect,

  useState,

} from "react";



import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";



import * as XLSX from "xlsx";

import { saveAs } from "file-saver";



interface Student {

  id: number;

  name: string;

  mobile: string;

}



interface SubjectReport {

  id: number;

  subjectName: string;

  semester: number;

  subjectType: string;



  course: {

    courseName: string;

  };



  students: Student[];

}



export default function SubjectWiseStudentReportPage() {

  const [reports, setReports] =
    useState<SubjectReport[]>([]);



  const fetchReports =
    async () => {

      const response =
        await fetch(

          "/api/reports/subjects"

        );



      const data =
        await response.json();



      setReports(

        Array.isArray(data)

          ? data

          : []

      );

    };



  useEffect(() => {

    fetchReports();

  }, []);



  /* EXPORT */

  const exportToExcel = () => {

    const excelData =
      reports.flatMap(

        (report) =>

          report.students.map(

            (student) => ({

              Course:
                report.course
                  .courseName,



              Semester:
                report.semester,



              Subject:
                report.subjectName,



              Student:
                student.name,



              Mobile:
                student.mobile,

            })

          )

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

      "Subject Students"

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

      "Subject_Student_Report.xlsx"

    );

  };



  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />



     <main className="flex-1 p-6 transition-all duration-300 body-sidebar">

        <Navbar />



        <div className="space-y-8">

          {/* HEADER */}

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-5xl font-bold text-gray-900">

                Subject Wise Report

              </h1>



              <p className="text-gray-500 mt-3 text-lg">

                Students grouped by subjects

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



          {/* SUBJECT REPORTS */}

          <div className="space-y-8">

            {reports.map(

              (report) => (

                <div

                  key={report.id}

                  className="bg-white rounded-3xl shadow-sm p-8"
                >

                  {/* HEADER */}

                  <div className="flex justify-between items-center mb-8">

                    <div>

                      <h2 className="text-4xl font-bold text-blue-700">

                        {
                          report.subjectName
                        }

                      </h2>



                      <p className="text-gray-500 mt-2">

                        {
                          report.course
                            .courseName
                        }

                        {" • "}

                        Semester
                        {" "}

                        {
                          report.semester
                        }

                      </p>

                    </div>



                    <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-2xl font-bold">

                      {
                        report.students
                          .length
                      }

                      {" "}

                      Students

                    </div>

                  </div>



                  {/* TABLE */}

                  <div className="overflow-x-auto">

                    <table className="w-full">

                      <thead>

                        <tr className="bg-gray-100">

                          <th className="p-4 text-left">

                            Student

                          </th>



                          <th className="p-4 text-left">

                            Mobile

                          </th>

                        </tr>

                      </thead>



                      <tbody>

                        {report.students.map(

                          (student) => (

                            <tr

                              key={student.id}

                              className="border-b hover:bg-gray-50"
                            >

                              <td className="p-4 font-semibold">

                                {
                                  student.name
                                }

                              </td>



                              <td className="p-4">

                                {
                                  student.mobile
                                }

                              </td>

                            </tr>

                          )

                        )}

                      </tbody>

                    </table>

                  </div>

                </div>

              )

            )}

          </div>

        </div>

      </main>

    </div>

  );

}