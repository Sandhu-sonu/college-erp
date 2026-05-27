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

const latestSemester =

  student.semesterRecords?.[0];

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



    <main className="body-sidebar flex-1 p-6 transition-all duration-300">

      <Navbar />



      {/* PAGE HEADER */}

      <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

        <div className="flex flex-col lg:flex-row justify-between gap-8">

          {/* LEFT */}

          <div className="flex items-center gap-6">

            {/* AVATAR */}

            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-6xl font-bold text-blue-700">

              {student.name.charAt(0)}

            </div>



            {/* INFO */}

            <div>

              <h1 className="text-5xl font-black text-gray-900">

                {student.name}

              </h1>



              <p className="text-gray-500 mt-2 text-lg">

                Student ID: {student.id}

              </p>



              <div className="flex flex-wrap gap-3 mt-5">

                {/* STATUS */}

                <span className={`px-5 py-2 rounded-full text-sm font-bold text-white ${
                  student.status ===
                  "COMPLETED"

                    ? "bg-green-600"

                    : "bg-blue-600"
                }`}>

                  {student.status}

                </span>



                {/* FEE STATUS */}

                <span
  className={`px-5 py-2 rounded-full text-sm font-bold ${
    latestSemester?.feeStatus ===
    "PAID"

      ? "bg-green-100 text-green-700"

      : "bg-red-100 text-red-700"
  }`}
>

  {latestSemester?.feeStatus}

</span>



                {/* COURSE */}

                <span className="px-5 py-2 rounded-full text-sm font-bold bg-blue-100 text-blue-700">

                  {

                    student.course

                      ?.courseName

                  }

                </span>

              </div>

            </div>

          </div>



          {/* ACTIONS */}

          <div className="flex flex-wrap gap-4 items-start">

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold">

              Edit Student

            </button>



            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold">

              Add Payment

            </button>



            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-semibold">

              Promote

            </button>

          </div>

        </div>

      </div>



      {/* SUMMARY CARDS */}

      <div className="grid lg:grid-cols-4 gap-6 mb-8">

        {/* TOTAL FEE */}

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500 font-medium">

            Total Fee

          </p>



          <h2 className="text-4xl font-black text-green-600 mt-3">

            ₹

            {

              latestSemester?.totalFee ||

              0

            }

          </h2>

        </div>



        {/* PAID */}

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500 font-medium">

            Paid

          </p>



          <h2 className="text-4xl font-black text-blue-700 mt-3">

            ₹

            {

              latestSemester?.paidAmount ||

              0

            }

          </h2>

        </div>



        {/* REMAINING */}

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500 font-medium">

            Remaining

          </p>



          <h2 className="text-4xl font-black text-red-600 mt-3">

            ₹

            {

              latestSemester?.remainingFee ||

              0

            }

          </h2>

        </div>



        {/* CURRENT SEM */}

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500 font-medium">

            Current Semester

          </p>



          <h2 className="text-4xl font-black text-purple-700 mt-3">

            {

              latestSemester?.semester ||

              1

            }

          </h2>

        </div>

      </div>



      {/* STUDENT INFO */}

      <div className="grid lg:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500">

            Father Name

          </p>



          <h3 className="text-2xl font-bold mt-4">

            {

              student.fatherName

            }

          </h3>

        </div>



        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500">

            Mobile

          </p>



          <h3 className="text-2xl font-bold mt-4">

            {

              student.mobile

            }

          </h3>

        </div>



        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500">

            Joined

          </p>



          <h3 className="text-2xl font-bold mt-4">

            {

              new Date(

                student.createdAt

              ).toLocaleDateString()

            }

          </h3>

        </div>

      </div>



      {/* SEMESTER HISTORY */}

      <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-4xl font-black">

            Semester Records

          </h2>



          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold">

            + Add Semester

          </button>

        </div>



        <div className="space-y-6">

          {student.semesterRecords.map(

            (sem: any) => (

              <div
                key={sem.id}

                className="border rounded-3xl p-8 hover:shadow-md transition"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-8">

                  {/* LEFT */}

                  <div className="flex-1">

                    <h3 className="text-3xl font-black text-blue-700">

                      Semester {sem.semester}

                    </h3>



                    <div className="flex flex-wrap gap-3 mt-6">

                      {sem.subjects
                        ?.split(",")

                        .map(

                          (

                            subject:
                              string,

                            index:
                              number

                          ) => (

                            <span
                              key={index}

                              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold"
                            >

                              {

                                subject

                              }

                            </span>

                          )

                        )}

                    </div>

                  </div>



                  {/* RIGHT */}

                  <div className="grid grid-cols-2 gap-6 min-w-[320px]">

                    <div>

                      <p className="text-gray-500">

                        Total Fee

                      </p>



                      <h4 className="text-2xl font-black text-green-600 mt-2">

                        ₹{sem.totalFee}

                      </h4>

                    </div>



                    <div>

                      <p className="text-gray-500">

                        Paid

                      </p>



                      <h4 className="text-2xl font-black text-blue-700 mt-2">

                        ₹{sem.paidAmount}

                      </h4>

                    </div>



                    <div>

                      <p className="text-gray-500">

                        Remaining

                      </p>



                      <h4 className="text-2xl font-black text-red-600 mt-2">

                        ₹{sem.remainingFee}

                      </h4>

                    </div>



                    <div>

                      <p className="text-gray-500">

                        Fee Status

                      </p>



                      <span className={`inline-block mt-2 px-4 py-2 rounded-xl text-sm font-bold ${
                        sem.feeStatus ===
                        "PAID"

                          ? "bg-green-100 text-green-700"

                          : "bg-red-100 text-red-700"
                      }`}>

                        {

                          sem.feeStatus

                        }

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            )

          )}

        </div>

      </div>



      {/* PAYMENT HISTORY */}

      <div className="bg-white rounded-3xl shadow-sm p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-4xl font-black">

            Payment History

          </h2>



          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold">

            Add Payment

          </button>

        </div>



        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-5 text-left">

                  Amount

                </th>



                <th className="p-5 text-left">

                  Date

                </th>



                <th className="p-5 text-left">

                  Method

                </th>



                <th className="p-5 text-left">

                  Receipt

                </th>

              </tr>

            </thead>



            <tbody>

              {student.fees.length >

              0 ? (

                student.fees.map(

                  (

                    fee: any

                  ) => (

                    <tr
                      key={fee.id}

                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-5 font-bold text-green-600">

                        ₹

                        {

                          fee.amount

                        }

                      </td>



                      <td className="p-5">

                        {

                          new Date(

                            fee.paymentDate

                          ).toLocaleDateString()

                        }

                      </td>



                      <td className="p-5">

                        {

                          fee.paymentMethod ||

                          "Cash"

                        }

                      </td>



                      <td className="p-5">

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

                    className="text-center p-10 text-gray-400"
                  >

                    No payments found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </main>

  </div>

);

}