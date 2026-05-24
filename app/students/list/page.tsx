"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

export default function StudentsListPage() {

  const [students, setStudents] =
    useState<any[]>([]);

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

  return (

    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

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

              {students.map((student) => {

                const latest =
                  student
                    .semesterRecords[0];

                return (

                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-50"
                  >

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

                    <td className="p-5 font-semibold">

                      {student.course}

                    </td>

                    <td className="p-5">

                      Semester {
                        latest?.semester
                      }

                    </td>

                    <td className="p-5 text-green-700 font-bold">

                      ₹ {
                        latest?.totalFee
                      }

                    </td>

                    <td className="p-5">

                      ₹ {
                        latest?.paidAmount
                      }

                    </td>

                    <td className="p-5 text-red-600 font-bold">

                      ₹ {
                        latest?.remainingFee
                      }

                    </td>

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
              method: "DELETE",
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

              })}

            </tbody>

          </table>

        </div>

      </div>

    </main>

  );

}