"use client";

import {

  useEffect,

  useState,

} from "react";



import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";



export default function ReportsPage() {

  const [dashboard, setDashboard] =
    useState<any>(null);



  const fetchReports =
    async () => {

      const response =
        await fetch(
          "/api/dashboard"
        );



      const data =
        await response.json();



      setDashboard(data);

    };



  useEffect(() => {

    fetchReports();

  }, []);



  if (!dashboard) {

    return (

      <div className="p-20 text-3xl">

        Loading Reports...

      </div>

    );

  }



  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />



      <main className="flex-1 p-6 transition-all duration-300 body-sidebar">

        <Navbar />



        <div className="space-y-8">

          {/* HEADER */}

          <div>

            <h1 className="text-5xl font-bold text-gray-900">

              Reports Center

            </h1>



            <p className="text-gray-500 mt-3 text-lg">

              Analytics & report management

            </p>

          </div>



          {/* TOP REPORT CARDS */}

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

            {/* TOTAL COLLECTION */}

            <div className="bg-white rounded-3xl shadow-sm p-8">

              <p className="text-gray-500">

                Total Collection

              </p>



              <h2 className="text-4xl font-bold text-green-700 mt-4">

                ₹
                {
                  dashboard.totalCollection
                }

              </h2>

            </div>



            {/* TOTAL STUDENTS */}

            <div className="bg-white rounded-3xl shadow-sm p-8">

              <p className="text-gray-500">

                Total Students

              </p>



              <h2 className="text-4xl font-bold text-blue-700 mt-4">

                {
                  dashboard.totalStudents
                }

              </h2>

            </div>



            {/* COURSES */}

            <div className="bg-white rounded-3xl shadow-sm p-8">

              <p className="text-gray-500">

                Total Courses

              </p>



              <h2 className="text-4xl font-bold text-purple-700 mt-4">

                {
                  dashboard.totalCourses
                }

              </h2>

            </div>



            {/* SUBJECTS */}

            <div className="bg-white rounded-3xl shadow-sm p-8">

              <p className="text-gray-500">

                Total Subjects

              </p>



              <h2 className="text-4xl font-bold text-yellow-600 mt-4">

                {
                  dashboard.totalSubjects
                }

              </h2>

            </div>

          </div>



          {/* REPORT MODULES */}

          <div className="grid lg:grid-cols-3 gap-8">

            {/* STUDENT REPORT */}

            <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-xl transition">

              <h2 className="text-3xl font-bold text-blue-700">

                Student Reports

              </h2>



              <p className="text-gray-500 mt-4 leading-relaxed">

                Generate course-wise,
                semester-wise and admission reports.

              </p>



              <div className="mt-8 space-y-3">

                <div className="bg-blue-50 p-4 rounded-2xl">

                  Course-wise Students

                </div>



                <div className="bg-blue-50 p-4 rounded-2xl">

                  Semester Reports

                </div>



                <div className="bg-blue-50 p-4 rounded-2xl">

                  New Admissions

                </div>

              </div>



              <a

  href="/admin/reports/course-wise"

  className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center"
>

  Generate Report

</a>

            </div>



            {/* FEE REPORT */}

            <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-xl transition">

              <h2 className="text-3xl font-bold text-green-700">

                Fee Reports

              </h2>



              <p className="text-gray-500 mt-4 leading-relaxed">

                Analyze collection,
                pending dues and payment history.

              </p>



              <div className="mt-8 space-y-3">

                <div className="bg-green-50 p-4 rounded-2xl">

                  Monthly Collection

                </div>



                <div className="bg-green-50 p-4 rounded-2xl">

                  Pending Fees

                </div>



                <div className="bg-green-50 p-4 rounded-2xl">

                  Payment History

                </div>

              </div>



              <a

  href="/admin/reports/pending-fees"

  className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center"
>

  Generate Report

</a>

            </div>



            {/* SUBJECT REPORT */}

            <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-xl transition">

              <h2 className="text-3xl font-bold text-purple-700">

                Subject Reports

              </h2>



              <p className="text-gray-500 mt-4 leading-relaxed">

                Generate semester-wise and course-wise subject reports.

              </p>



              <div className="mt-8 space-y-3">

                <div className="bg-purple-50 p-4 rounded-2xl">

                  Semester Subjects

                </div>



                <div className="bg-purple-50 p-4 rounded-2xl">

                  Course Subjects

                </div>



                <div className="bg-purple-50 p-4 rounded-2xl">

                  Subject Categories

                </div>

              </div>



              <a

  href="/admin/reports/subjects"

  className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center"
>

  Generate Report

</a>
            </div>

          </div>



          {/* RECENT PAYMENTS */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">

                Recent Transactions

              </h2>

            </div>



            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="p-4 text-left">

                      Student

                    </th>



                    <th className="p-4 text-left">

                      Amount

                    </th>



                    <th className="p-4 text-left">

                      Date

                    </th>

                  </tr>

                </thead>



                <tbody>

                  {dashboard.recentPayments.map(

                    (payment: any) => (

                      <tr
                        key={payment.id}

                        className="border-b"
                      >

                        <td className="p-4 font-semibold">

                          {
                            payment
                              .student
                              .name
                          }

                        </td>



                        <td className="p-4 text-green-700 font-bold">

                          ₹
                          {
                            payment.amount
                          }

                        </td>



                        <td className="p-4">

                          {new Date(

                            payment.paymentDate

                          ).toLocaleDateString()}

                        </td>

                      </tr>

                    )

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