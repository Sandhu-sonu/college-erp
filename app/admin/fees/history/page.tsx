import Sidebar from "@/components/Sidebar";
import prisma  from "@/lib/prisma";

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
    <main className="flex">

      <Sidebar />

      <section className="flex-1 p-10 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          Fee History
        </h1>

        <div className="bg-white p-6 rounded shadow">

          <table className="w-full border border-collapse">

            <thead>

              <tr className="bg-blue-600 text-white">

                <th className="border p-3">
                  Student
                </th>

                <th className="border p-3">
                  Amount
                </th>

                <th className="border p-3">
                  Status
                </th>

                <th className="border p-3">
                  Payment Date
                </th>

              </tr>

            </thead>

            <tbody>

              {fees.map((fee) => (

                <tr key={fee.id}>

                  <td className="border p-3">
                    {fee.student.studentName}
                  </td>

                  <td className="border p-3">
                    ₹ {fee.amount}
                  </td>

                  <td className="border p-3">
                    {fee.status}
                  </td>

                  <td className="border p-3">
                    {new Date(
                      fee.paymentDate
                    ).toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}