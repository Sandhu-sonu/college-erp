import Sidebar from "../../components/Sidebar";

export default function DashboardPage() {

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
              120
            </p>

          </div>

          <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-semibold">
              Fees Collected
            </h2>

            <p className="text-4xl mt-4 font-bold text-green-600">
              ₹2.5L
            </p>

          </div>

          <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-semibold">
              Pending Fees
            </h2>

            <p className="text-4xl mt-4 font-bold text-red-600">
              ₹80K
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}