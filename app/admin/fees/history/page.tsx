import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";

import prisma from "@/lib/prisma";

async function getFees() {

  return await prisma.fee.findMany({

    include: {

      student: true,

    },

    orderBy: {

      paymentDate: "desc",

    },

  });

}



export default async function FeeHistoryPage() {

  const fees = await getFees();



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

                Fee History

              </h1>



              <p className="text-gray-500 mt-2">

                Complete fee payment records

              </p>

            </div>

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

                    Amount

                  </th>



                  <th className="p-5 text-left">

                    Receipt No.

                  </th>



                  <th className="p-5 text-left">

                    Payment Method

                  </th>



                  <th className="p-5 text-left">

                    Date

                  </th>

                </tr>

              </thead>



              <tbody>

                {fees.map((fee) => (

                  <tr
                    key={fee.id}

                    className="border-b hover:bg-gray-50 transition"
                  >

                    {/* STUDENT */}

                    <td className="p-5">

                      <div>

                        <p className="font-bold text-gray-800">

                          {fee.student.name}

                        </p>



                        <p className="text-gray-500 text-sm">

                          {fee.student.mobile}

                        </p>

                      </div>

                    </td>



                    {/* COURSE */}

                    <td className="p-5 font-medium text-gray-700">

                      {fee.student.course}

                    </td>



                    {/* AMOUNT */}

                    <td className="p-5 text-green-700 font-bold text-lg">

                      ₹ {fee.amount}

                    </td>



                    {/* RECEIPT */}

                    <td className="p-5">

                      {fee.receiptNumber || "-"}

                    </td>



                    {/* METHOD */}

                    <td className="p-5">

                      {fee.paymentMethod || "Cash"}

                    </td>



                    {/* DATE */}

                    <td className="p-5">

                      {new Date(

                        fee.paymentDate

                      ).toLocaleDateString()}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>

  );

}