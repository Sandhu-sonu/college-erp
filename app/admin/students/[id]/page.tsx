import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";

import prisma from "@/lib/prisma";

import Link from "next/link";


async function getStudent(
  id: number
) {

  const student =
    await prisma.student.findUnique({

      where: {

        id,

      },



      include: {

        fees: {

          orderBy: {

            paymentDate: "desc",

          },

        },



        semesterRecords: {

          orderBy: {

            semester: "asc",

          },

        },

      },

    });



  if (!student)
    return null;



  /* FETCH SUBJECTS */

  const subjects =
    await prisma.subject.findMany({

      where: {

        course: {

          courseName:
            student.course,

        },

      },



      include: {

        course: true,

      },



      orderBy: {

        semester: "asc",

      },

    });



  return {

    ...student,

    subjects,

  };

}

export default async function StudentProfilePage(

  {

    params,

  }: {

    params: Promise<{

      id: string;

    }>;

  }

) {

  const { id } =
    await params;



  const student =
    await getStudent(
      Number(id)
    );



  if (!student) {

    return (

      <div className="p-20">

        Student not found

      </div>

    );

  }



  /* TOTAL PAID */

  const totalPaid =
    student.fees.reduce(

      (sum, fee) =>

        sum + fee.amount,

      0

    );



  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />



     <main className="flex-1 p-6 transition-all duration-300 body-sidebar">

        <Navbar />



        <div className="space-y-8">

          {/* PROFILE HEADER */}

          <div className="bg-white rounded-3xl shadow-sm p-10">

            <div className="flex items-center gap-8">

              {/* PHOTO */}

              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-5xl font-bold text-blue-700">

                {
                  student.name[0]
                }

              </div>



              {/* INFO */}

              <div>

                <h1 className="text-5xl font-bold text-gray-900">

                  {student.name}

                </h1>



                <p className="text-gray-500 mt-3 text-lg">

                  Student ID:
                  {" "}
                  {student.id}

                </p>



                <div className="flex gap-4 mt-5">

                  <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-2xl font-semibold">

                    {
                      student.course
                    }

                  </span>



                  <span className="bg-green-100 text-green-700 px-5 py-2 rounded-2xl font-semibold">

                    {
                      student.feeStatus
                    }

                  </span>

                </div>

              </div>

            </div>

          </div>



          {/* QUICK INFO */}

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white rounded-3xl p-8 shadow-sm">

              <p className="text-gray-500">

                Father Name

              </p>



              <h2 className="text-2xl font-bold mt-3">

                {
                  student.fatherName
                }

              </h2>

            </div>



            <div className="bg-white rounded-3xl p-8 shadow-sm">

              <p className="text-gray-500">

                Mobile

              </p>



              <h2 className="text-2xl font-bold mt-3">

                {
                  student.mobile
                }

              </h2>

            </div>



            <div className="bg-white rounded-3xl p-8 shadow-sm">

              <p className="text-gray-500">

                Total Payments

              </p>



              <h2 className="text-3xl font-bold mt-3 text-green-700">

                ₹{totalPaid}

              </h2>

            </div>



            <div className="bg-white rounded-3xl p-8 shadow-sm">

              <p className="text-gray-500">

                Joined

              </p>



              <h2 className="text-2xl font-bold mt-3">

                {new Date(

                  student.createdAt

                ).toLocaleDateString()}

              </h2>

            </div>

          </div>



          {/* SEMESTERS */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">

                Semester Records

              </h2>



              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold">

                + Add Semester

              </button>

            </div>



            <div className="space-y-6">

              {student.semesterRecords
                .length > 0 ? (

                student.semesterRecords.map(

                  (record) => (

                    <div
                      key={
                        record.id
                      }

                      className="border border-gray-100 rounded-3xl p-6"
                    >

                      <div className="flex justify-between items-center">

                        <div>

                          <h3 className="text-2xl font-bold text-blue-700">

                            Semester
                            {" "}
                            {
                              record.semester
                            }

                          </h3>



                          <div className="flex flex-wrap gap-2 mt-4">

  {student.subjects

    .filter(

      (subject) =>

        subject.semester ===
        record.semester

    )

    .map((subject) => (

      <span
        key={subject.id}

        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold"
      >

        {subject.subjectName}

      </span>

    ))}

</div>

                        </div>



                        <div className="text-right">

                          <p className="text-gray-500">

                            Fee Status

                          </p>



                          <h3 className="text-xl font-bold mt-2">

                            {
                              record.feeStatus
                            }

                          </h3>

                        </div>

                      </div>

                    </div>

                  )

                )

              ) : (

                <p className="text-gray-400">

                  No semester records found

                </p>

              )}

            </div>

          </div>



          {/* PAYMENT HISTORY */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">

                Payment History

              </h2>



              <Link
                href={`/admin/students/fees/${student.id}`}

                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold"
              >

                Add Payment

              </Link>

            </div>



            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="p-4 text-left">

                      Amount

                    </th>



                    <th className="p-4 text-left">

                      Date

                    </th>



                    <th className="p-4 text-left">

                      Method

                    </th>



                    <th className="p-4 text-left">

                      Receipt

                    </th>

                  </tr>

                </thead>



                <tbody>

                  {student.fees
                    .length > 0 ? (

                    student.fees.map(

                      (fee) => (

                        <tr
                          key={fee.id}

                          className="border-b"
                        >

                          <td className="p-4 font-bold text-green-700">

                            ₹{
                              fee.amount
                            }

                          </td>



                          <td className="p-4">

                            {new Date(

                              fee.paymentDate

                            ).toLocaleDateString()}

                          </td>



                          <td className="p-4">

                            {
                              fee.paymentMethod ||
                              "-"
                            }

                          </td>



                          <td className="p-4">

                            {
                              fee.receiptNumber ||
                              "-"
                            }

                          </td>

                        </tr>

                      )

                    )

                  ) : (

                    <tr>

                      <td
                        colSpan={4}

                        className="p-8 text-center text-gray-400"
                      >

                        No payments found

                      </td>

                    </tr>

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