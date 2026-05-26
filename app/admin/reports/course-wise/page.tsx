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

  feeStatus: string;

}



interface Course {

  id: number;

  courseName: string;

  totalFee: number;

  duration: string;

  students: Student[];

}



export default function CourseWiseReportPage() {

  const [courses, setCourses] =
    useState<Course[]>([]);



  const fetchReports =
    async () => {

      const response =
        await fetch(

          "/api/reports/course-wise"

        );



      const data =
        await response.json();



      setCourses(

        Array.isArray(data)

          ? data

          : []

      );

    };



  useEffect(() => {

    fetchReports();

  }, []);



  /* TOTAL STUDENTS */

  const totalStudents =
    courses.reduce(

      (sum, course) =>

        sum +

        course.students.length,

      0

    );



  /* EXPORT */

  const exportToExcel = () => {

    const excelData =
      courses.flatMap(

        (course) =>

          course.students.map(

            (student) => ({

              Course:
                course.courseName,



              Student:
                student.name,



              Mobile:
                student.mobile,



              FeeStatus:
                student.feeStatus,

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

      "Course Wise Report"

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

      "Course_Wise_Report.xlsx"

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

                Course Wise Student Report

              </h1>



              <p className="text-gray-500 mt-3 text-lg">

                Students grouped by courses

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

                Total Courses

              </p>



              <h2 className="text-5xl font-bold text-blue-700 mt-4">

                {
                  courses.length
                }

              </h2>

            </div>



            <div className="bg-white rounded-3xl shadow-sm p-8">

              <p className="text-gray-500">

                Total Students

              </p>



              <h2 className="text-5xl font-bold text-green-700 mt-4">

                {
                  totalStudents
                }

              </h2>

            </div>



            <div className="bg-white rounded-3xl shadow-sm p-8">

              <p className="text-gray-500">

                Average Students

              </p>



              <h2 className="text-5xl font-bold text-purple-700 mt-4">

                {courses.length > 0

                  ? Math.floor(

                      totalStudents /

                        courses.length

                    )

                  : 0}

              </h2>

            </div>

          </div>



          {/* COURSE LIST */}

          <div className="space-y-8">

            {courses.map(

              (course) => (

                <div

                  key={course.id}

                  className="bg-white rounded-3xl shadow-sm p-8"
                >

                  {/* COURSE HEADER */}

                  <div className="flex justify-between items-center mb-8">

                    <div>

                      <h2 className="text-4xl font-bold text-blue-700">

                        {
                          course.courseName
                        }

                      </h2>



                      <p className="text-gray-500 mt-2">

                        {
                          course.duration
                        }

                      </p>

                    </div>



                    <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-2xl font-bold text-xl">

                      {
                        course.students
                          .length
                      }{" "}

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



                          <th className="p-4 text-left">

                            Fee Status

                          </th>

                        </tr>

                      </thead>



                      <tbody>

                        {course.students.map(

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



                              <td className="p-4">

                                <span className={`px-4 py-2 rounded-xl font-semibold ${

                                  student.feeStatus ===
                                  "Paid"

                                    ? "bg-green-100 text-green-700"

                                    : "bg-red-100 text-red-700"

                                }`}>

                                  {
                                    student.feeStatus
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

              )

            )}

          </div>

        </div>

      </main>

    </div>

  );

}