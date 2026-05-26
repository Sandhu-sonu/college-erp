import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";

import prisma from "@/lib/prisma";

import Link from "next/link";



async function getFeeData() {

  const students =
    await prisma.student.findMany({

      include: {

        semesterRecords: true,

      },

    });



  const fees =
    await prisma.fee.findMany({

      orderBy: {

        paymentDate: "desc",

      },

      take: 5,

      include: {

        student: true,

      },

    });



  return {
    students,
    fees,
  };

}



export default async function FeesDashboardPage() {

  const { students, fees } =
    await getFeeData();



  let totalCollection = 0;

  let totalPending = 0;

  let dueStudents = 0;



  students.forEach((student) => {

    const latest =
      student.semesterRecords?.[0];



    if (latest) {

      totalCollection +=
        latest.paidAmount || 0;



      totalPending +=
        latest.remainingFee || 0;



      if (
        (latest.remainingFee || 0) > 0
      ) {

        dueStudents++;

      }

    }

  });



  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />



      <main className="flex-1 ml-72 p-6">

        <Navbar />



        <div className="space-y-8">

          {/* HEADER */}

          <div>

            <h1 className="text-4xl font-bold text-gray-900">

              Fee Dashboard

            </h1>



            <p className="text-gray-500 mt-2">

              Manage fee collection and pending dues

            </p>

          </div>



          {/* SUMMARY CARDS */}

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <p className="text-gray-500 mb-2">

                Total Collection

              </p>



              <h2 className="text-4xl font-bold text-green-600">

                ₹ {totalCollection}

              </h2>

            </div>



            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <p className="text-gray-500 mb-2">

                Pending Fees

              </p>



              <h2 className="text-4xl font-bold text-red-600">

                ₹ {totalPending}

              </h2>

            </div>



            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <p className="text-gray-500 mb-2">

                Due Students

              </p>



              <h2 className="text-4xl font-bold text-orange-500">

                {dueStudents}

              </h2>

            </div>



            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <p className="text-gray-500 mb-2">

                Total Students

              </p>



              <h2 className="text-4xl font-bold text-blue-600">

                {students.length}

              </h2>

            </div>

          </div>



          {/* PENDING STUDENTS */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">

                Pending Fee Students

              </h2>



              <Link
                href="/admin/fees/history"

                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-semibold"
              >

                View History

              </Link>

            </div>



            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>

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

                      Remaining Fee

                    </th>



                    <th className="p-4 text-center">

                      Action

                    </th>

                  </tr>

                </thead>



                <tbody>

                  {students

                    .filter((student) => {

                      const latest =
                        student
                          .semesterRecords?.[0];



                      return (
                        latest &&
                        (latest.remainingFee || 0) > 0
                      );

                    })

                    .map((student) => {

                      const latest =
                        student
                          .semesterRecords?.[0];



                      return (

                        <tr
                          key={student.id}

                          className="border-b hover:bg-gray-50"
                        >

                          <td className="p-4">

                            <div>

                              <p className="font-bold text-gray-800">

                                {student.name}

                              </p>



                              <p className="text-gray-500 text-sm">

                                {student.mobile}

                              </p>

                            </div>

                          </td>



                          <td className="p-4">

                            {student.course}

                          </td>



                          <td className="p-4">

                            Semester {
                              latest?.semester
                            }

                          </td>



                          <td className="p-4 font-bold text-red-600">

                            ₹ {
                              latest?.remainingFee || 0
                            }

                          </td>



                          <td className="p-4 text-center">

                            <Link
                              href={`/admin/students/fees/${student.id}`}

                              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold"
                            >

                              Collect Fee

                            </Link>

                          </td>

                        </tr>

                      );

                    })}

                </tbody>

              </table>

            </div>

          </div>



          {/* RECENT COLLECTIONS */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-2xl font-bold mb-6">

              Recent Collections

            </h2>



            <div className="space-y-4">

              {fees.map((fee) => (

                <div
                  key={fee.id}

                  className="flex justify-between items-center border border-gray-100 rounded-2xl p-5"
                >

                  <div>

                    <p className="font-bold text-gray-800">

                      {fee.student.name}

                    </p>



                    <p className="text-gray-500 text-sm">

                      {new Date(
                        fee.paymentDate
                      ).toLocaleDateString()}

                    </p>

                  </div>



                  <div className="text-right">

                    <p className="text-green-600 text-2xl font-bold">

                      ₹ {fee.amount}

                    </p>



                    <p className="text-gray-500 text-sm">

                      {fee.paymentMethod || "Cash"}

                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}