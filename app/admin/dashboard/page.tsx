"use client";

import {

  useEffect,

  useState,

} from "react";



import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";



interface Student {

  id: number;

  name: string;

  course: string;

}



interface Payment {

  id: number;

  amount: number;

  paymentDate: string;



  student: {

    name: string;

  };

}



export default function DashboardPage() {

  const [dashboard, setDashboard] =
    useState<any>(null);



  const fetchDashboard =
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

    fetchDashboard();

  }, []);



  if (!dashboard) {

    return (

      <div className="p-20 text-3xl">

        Loading Dashboard...

      </div>

    );

  }



  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />



      <main className="flex-1 ml-72 p-6">

        <Navbar />



        <div className="space-y-8">

          {/* HEADER */}

          <div>

            <h1 className="text-5xl font-bold text-gray-900">

              College ERP Dashboard

            </h1>



            <p className="text-gray-500 mt-3 text-lg">

              Welcome back Admin 👋

            </p>

          </div>



          {/* STATS */}

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

            {/* STUDENTS */}

            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition">

              <p className="text-gray-500">

                Total Students

              </p>



              <h2 className="text-5xl font-bold text-blue-700 mt-4">

                {
                  dashboard.totalStudents
                }

              </h2>

            </div>



            {/* COURSES */}

            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition">

              <p className="text-gray-500">

                Total Courses

              </p>



              <h2 className="text-5xl font-bold text-green-700 mt-4">

                {
                  dashboard.totalCourses
                }

              </h2>

            </div>



            {/* SUBJECTS */}

            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition">

              <p className="text-gray-500">

                Total Subjects

              </p>



              <h2 className="text-5xl font-bold text-purple-700 mt-4">

                {
                  dashboard.totalSubjects
                }

              </h2>

            </div>



            {/* COLLECTION */}

            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition">

              <p className="text-gray-500">

                Fee Collection

              </p>



              <h2 className="text-4xl font-bold text-yellow-600 mt-4">

                ₹
                {
                  dashboard.totalCollection
                }

              </h2>

            </div>

          </div>



          {/* RECENT SECTION */}

          <div className="grid lg:grid-cols-2 gap-8">

            {/* RECENT STUDENTS */}

            <div className="bg-white rounded-3xl shadow-sm p-8">

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-bold">

                  Recent Admissions

                </h2>

              </div>



              <div className="space-y-5">

                {dashboard.recentStudents.map(

                  (
                    student: Student
                  ) => (

                    <div
                      key={student.id}

                      className="flex justify-between items-center border border-gray-100 rounded-2xl p-5"
                    >

                      <div>

                        <h3 className="font-bold text-xl">

                          {
                            student.name
                          }

                        </h3>



                        <p className="text-gray-500 mt-2">

                          {
                            student.course
                          }

                        </p>

                      </div>



                      <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">

                        New

                      </div>

                    </div>

                  )

                )}

              </div>

            </div>



            {/* RECENT PAYMENTS */}

            <div className="bg-white rounded-3xl shadow-sm p-8">

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-bold">

                  Recent Payments

                </h2>

              </div>



              <div className="space-y-5">

                {dashboard.recentPayments.map(

                  (
                    payment: Payment
                  ) => (

                    <div
                      key={payment.id}

                      className="flex justify-between items-center border border-gray-100 rounded-2xl p-5"
                    >

                      <div>

                        <h3 className="font-bold text-xl">

                          {
                            payment
                              .student
                              .name
                          }

                        </h3>



                        <p className="text-gray-500 mt-2">

                          {new Date(

                            payment.paymentDate

                          ).toLocaleDateString()}

                        </p>

                      </div>



                      <div className="text-green-700 font-bold text-2xl">

                        ₹
                        {
                          payment.amount
                        }

                      </div>

                    </div>

                  )

                )}

              </div>

            </div>

          </div>



          {/* QUICK ACTIONS */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-3xl font-bold mb-8">

              Quick Actions

            </h2>



            <div className="grid md:grid-cols-4 gap-6">

              <a
                href="/admin/students/add"

                className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-3xl text-center font-bold text-xl"
              >

                + Add Student

              </a>



              <a
                href="/admin/fees"

                className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-3xl text-center font-bold text-xl"
              >

                Collect Fee

              </a>



              <a
                href="/admin/courses"

                className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-3xl text-center font-bold text-xl"
              >

                Manage Courses

              </a>



              <a
                href="/admin/subjects"

                className="bg-yellow-500 hover:bg-yellow-600 text-white p-6 rounded-3xl text-center font-bold text-xl"
              >

                Manage Subjects

              </a>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}