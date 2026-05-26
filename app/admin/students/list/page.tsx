"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";

import {
  Eye,
  Pencil,
  IndianRupee,
  Trash2,
  ArrowUp,
} from "lucide-react";

export default function StudentsListPage() {

  const [students, setStudents] =
    useState<any[]>([]);



  const [searchName, setSearchName] =
    useState("");

  const [searchMobile, setSearchMobile] =
    useState("");

  const [searchCourse, setSearchCourse] =
    useState("");



  useEffect(() => {

    fetchStudents();

  }, []);



  const fetchStudents = async () => {

    const response =
      await fetch("/api/students");

    const data =
      await response.json();

    setStudents(data);

  };



  const filteredStudents =

    students.filter((student) => {

      return (

        student.name
          ?.toLowerCase()
          .includes(
            searchName.toLowerCase()
          )

        &&

        student.mobile
          ?.includes(
            searchMobile
          )

        &&

        student.course?.courseName
  ?.toLowerCase()
          .includes(
            searchCourse.toLowerCase()
          )

      );

    });



  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />



      <main className="flex-1 ml-72 p-6">

        <Navbar />



        <div className="bg-white rounded-3xl shadow-sm p-8">

          {/* HEADER */}

          <div className="flex justify-between items-center mb-8">

            <div>

              <h1 className="text-4xl font-bold text-gray-900">

                Students List

              </h1>

              <p className="text-gray-500 mt-2">

                Manage all registered students

              </p>

            </div>



            <Link
              href="/admin/students"

              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg"
            >

              + Add New Student

            </Link>

          </div>



          {/* SEARCH */}

          <div className="grid md:grid-cols-4 gap-4 mb-8">

            <input
              type="text"

              placeholder="Search Mobile Number"

              value={searchMobile}

              onChange={(e) =>
                setSearchMobile(
                  e.target.value
                )
              }

              className="border border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600"
            />



            <input
              type="text"

              placeholder="Search Course"

              value={searchCourse}

              onChange={(e) =>
                setSearchCourse(
                  e.target.value
                )
              }

              className="border border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600"
            />



            <input
              type="text"

              placeholder="Search Student Name"

              value={searchName}

              onChange={(e) =>
                setSearchName(
                  e.target.value
                )
              }

              className="border border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600"
            />



            <button

              onClick={() => {

                setSearchName("");

                setSearchMobile("");

                setSearchCourse("");

              }}

              className="bg-gray-100 hover:bg-gray-200 rounded-2xl font-semibold"
            >

              Clear Filters

            </button>

          </div>



          {/* TABLE */}

          <div className="overflow-x-auto rounded-3xl border border-gray-100">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="p-5 text-left">

                    Student

                  </th>

                  <th className="p-5 text-left">

                    Course

                  </th>

                  <th className="p-5 text-left">

                    Semester

                  </th>

                  <th className="p-5 text-left">

                    Total Fee

                  </th>

                  <th className="p-5 text-left">

                    Paid

                  </th>

                  <th className="p-5 text-left">

                    Remaining

                  </th>

                  <th className="p-5 text-left">

                    Status

                  </th>

                  <th className="p-5 text-center">

                    Actions

                  </th>

                </tr>

              </thead>



              <tbody>

                {filteredStudents.map(
                  (student) => {

                    const latest =
                      student
                        .semesterRecords?.[0];

                    return (

                      <tr
                        key={student.id}

                        className="border-b hover:bg-gray-50 transition"
                      >

                        <td className="p-5">

                          <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">

                              {
                                student.name?.charAt(
                                  0
                                )
                              }

                            </div>



                            <div>

                              <Link
  href={`/admin/students/${student.id}`}

  className="font-bold text-lg text-blue-600 hover:text-blue-800"
>

  {student.name}

</Link>

                              <p className="text-gray-500">

                                {
                                  student.mobile
                                }

                              </p>

                            </div>

                          </div>

                        </td>



                        <td className="p-5 font-semibold text-gray-700">

                         {student.course?.courseName}

                        </td>



                        <td className="p-5">

                          Semester {
                            latest?.semester
                          }

                        </td>



                        <td className="p-5 text-green-700 font-bold text-lg">

                          ₹ {
                            latest?.totalFee
                          }

                        </td>



                        <td className="p-5 text-lg">

                          ₹ {
                            latest?.paidAmount
                          }

                        </td>



                        <td className="p-5 text-red-600 font-bold text-lg">

                          ₹ {
                            latest?.remainingFee
                          }

                        </td>



                        <td className="p-5">

                          <span

                            className={`px-5 py-2 rounded-full text-sm font-bold ${
                              latest?.feeStatus ===
                              "PAID"

                                ? "bg-green-100 text-green-700"

                                : "bg-red-100 text-red-700"
                            }`}
                          >

                            {
                              latest?.feeStatus
                            }

                          </span>

                        </td>



                        <td className="p-5">

                          <div className="flex gap-3 justify-center">

                            <Link
                              href={`/admin/students/view/${student.id}`}

                              className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:scale-105 transition"
                            >

                              <Eye size={18} />

                            </Link>



                            <Link
                              href={`/admin/students/edit/${student.id}`}

                              className="w-11 h-11 rounded-xl bg-yellow-500 text-white flex items-center justify-center hover:scale-105 transition"
                            >

                              <Pencil size={18} />

                            </Link>



                            <Link
                              href={`/admin/students/fees/${student.id}`}

                              className="w-11 h-11 rounded-xl bg-green-600 text-white flex items-center justify-center hover:scale-105 transition"
                            >

                              <IndianRupee size={18} />

                            </Link>



                            <button

                              className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center hover:scale-105 transition"

                              onClick={async () => {

                                const response =
                                  await fetch(

                                    "/api/students/promote",

                                    {

                                      method:
                                        "POST",

                                      headers: {
                                        "Content-Type":
                                          "application/json",
                                      },

                                      body: JSON.stringify({

                                        studentId:
                                          student.id,

                                      }),

                                    }

                                  );

                                const data =
                                  await response.json();

                                if (
                                  data.success
                                ) {

                                  alert(
                                    "Student Promoted Successfully"
                                  );

                                  fetchStudents();

                                } else {

                                  alert(
                                    data.error
                                  );

                                }

                              }}
                            >

                              <ArrowUp size={18} />

                            </button>



                            <button

                              className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center hover:scale-105 transition"

                              onClick={async () => {

                                const confirmDelete =
                                  confirm(
                                    "Delete Student?"
                                  );

                                if (
                                  confirmDelete
                                ) {

                                  await fetch(

                                    `/api/students/${student.id}`,

                                    {
                                      method:
                                        "DELETE",
                                    }

                                  );

                                  fetchStudents();

                                }

                              }}
                            >

                              <Trash2 size={18} />

                            </button>

                          </div>

                        </td>

                      </tr>

                    );

                  }
                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>

  );

}