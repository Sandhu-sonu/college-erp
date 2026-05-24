"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

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

        student.course
          ?.toLowerCase()
          .includes(
            searchCourse.toLowerCase()
          )

      );

    });



  return (

    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

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
            href="/students"

            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
          >

            + Add Student

          </Link>

        </div>



        {/* SEARCH FILTERS */}

        <div className="grid md:grid-cols-3 gap-4 mb-6">

          {/* MOBILE */}

          <input
            type="text"

            placeholder="Search Mobile Number"

            value={searchMobile}

            onChange={(e) =>
              setSearchMobile(
                e.target.value
              )
            }

            className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600 bg-white"
          />



          {/* COURSE */}

          <input
            type="text"

            placeholder="Search Course"

            value={searchCourse}

            onChange={(e) =>
              setSearchCourse(
                e.target.value
              )
            }

            className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600 bg-white"
          />



          {/* NAME */}

          <input
            type="text"

            placeholder="Search Student Name"

            value={searchName}

            onChange={(e) =>
              setSearchName(
                e.target.value
              )
            }

            className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600 bg-white"
          />

        </div>



        {/* TABLE */}

        <div className="overflow-x-auto bg-white rounded-3xl shadow-lg">

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

                      className="border-b hover:bg-gray-50"
                    >

                      {/* STUDENT */}

                      <td className="p-5">

                        <div>

                          <p className="font-bold text-lg">

                            {student.name}

                          </p>

                          <p className="text-gray-500">

                            {
                              student.mobile
                            }

                          </p>

                        </div>

                      </td>



                      {/* COURSE */}

                      <td className="p-5 font-semibold">

                        {
                          student.course
                        }

                      </td>



                      {/* SEMESTER */}

                      <td className="p-5">

                        Semester {
                          latest?.semester
                        }

                      </td>



                      {/* TOTAL FEE */}

                      <td className="p-5 text-green-700 font-bold">

                        ₹ {
                          latest?.totalFee
                        }

                      </td>



                      {/* PAID */}

                      <td className="p-5">

                        ₹ {
                          latest?.paidAmount
                        }

                      </td>



                      {/* REMAINING */}

                      <td className="p-5 text-red-600 font-bold">

                        ₹ {
                          latest?.remainingFee
                        }

                      </td>



                      {/* STATUS */}

                      <td className="p-5">

                        <span

                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
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



                      {/* ACTIONS */}

                      <td className="p-5">

                        <div className="flex gap-2 justify-center flex-wrap">

                          <Link
                            href={`/students/view/${student.id}`}

                            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                          >

                            View

                          </Link>



                          <Link
                            href={`/students/edit/${student.id}`}

                            className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
                          >

                            Edit

                          </Link>



                          <Link
                            href={`/students/fees/${student.id}`}

                            className="bg-green-600 text-white px-4 py-2 rounded-xl"
                          >

                            Add Fee

                          </Link>



                          <button

                            className="bg-red-600 text-white px-4 py-2 rounded-xl"

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

                            Delete

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

  );

}