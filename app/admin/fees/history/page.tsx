import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";

import Link from "next/link";

export default function FeesDashboardPage() {

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />



      <main
  className={`flex-1 p-6 transition-all duration-300 ${
    typeof window !==
      "undefined" &&
    (window as any)
      .sidebarOpen

      ? "ml-72"

      : "ml-0"
  }`}
>

        <Navbar />



        <div className="space-y-8">

          {/* HEADER */}

          <div>

            <h1 className="text-4xl font-bold text-gray-900">

              Fee Dashboard

            </h1>



            <p className="text-gray-500 mt-2">

              Manage fee collection and reports

            </p>

          </div>



          {/* CARDS */}

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <p className="text-gray-500 mb-2">

                Total Collection

              </p>



              <h2 className="text-4xl font-bold text-green-600">

                ₹ 0

              </h2>

            </div>



            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <p className="text-gray-500 mb-2">

                Pending Fees

              </p>



              <h2 className="text-4xl font-bold text-red-600">

                ₹ 0

              </h2>

            </div>



            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <p className="text-gray-500 mb-2">

                Today's Collection

              </p>



              <h2 className="text-4xl font-bold text-blue-600">

                ₹ 0

              </h2>

            </div>

          </div>



          {/* ACTIONS */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-2xl font-bold mb-6">

              Quick Actions

            </h2>



            <div className="flex gap-4">

              <Link
                href="/admin/students/list"

                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold"
              >

                Open Student Fees

              </Link>



              <Link
                href="/admin/fees/history"

                className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl font-semibold"
              >

                Fee History

              </Link>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}