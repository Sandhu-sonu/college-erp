import Sidebar from "@/components/Sidebar";
import  prisma  from "@/lib/prisma";

async function getStudentCount() {

  const totalStudents = await prisma.student.count();

  return totalStudents;
}

export default async function DashboardPage() {

  const totalStudents = await getStudentCount();

  return (
    <main className="flex">

      <Sidebar />

      <section className="flex-1 p-10 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold text-blue-700">
          Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-6 mt-10">

          <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-semibold">
              Total Students
            </h2>

            <p className="text-4xl mt-4 font-bold text-blue-700">
              {totalStudents}
            </p>

          </div>

          <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-semibold">
              Fees Collected
            </h2>

            <p className="text-4xl mt-4 font-bold text-green-600">
              ₹0
            </p>

          </div>

          <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-semibold">
              Pending Fees
            </h2>

            <p className="text-4xl mt-4 font-bold text-red-600">
              ₹0
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}