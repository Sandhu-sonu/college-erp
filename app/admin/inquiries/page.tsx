import prisma from "@/lib/prisma";

export default async function InquiriesPage() {

  const inquiries = await (prisma as any).inquiry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Admission Inquiries
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">

        <table className="w-full border-collapse">

          <thead className="bg-blue-700 text-white">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Mobile</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Date</th>
            </tr>

          </thead>

          <tbody>

            {inquiries.map((item: any) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-100"
              >

                <td className="p-4">{item.fullName}</td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">{item.mobile}</td>
                <td className="p-4">{item.course}</td>

                <td className="p-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}