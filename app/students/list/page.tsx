"use client";

import { useEffect, useState } from "react";

export default function StudentListPage() {

  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {

    fetchStudents();

  }, []);

  const fetchStudents = async () => {

    const response = await fetch("/api/students/list");

    const data = await response.json();

    setStudents(data);

  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow">

        <h1 className="text-4xl font-bold mb-8 text-blue-700">
          Student List
        </h1>

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-blue-600 text-white">

                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-left">Student Name</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Session</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Total Fee</th>
                <th className="p-3 text-left">Paid</th>
                <th className="p-3 text-left">Remaining</th>
                <th className="p-3 text-left">Status</th>

              </tr>

            </thead>

            <tbody>

              {students.map((student) => (

                <tr
                  key={student.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">
                    {student.rollNumber}
                  </td>

                  <td className="p-3">
                    {student.studentName}
                  </td>

                  <td className="p-3">
                    {student.course}
                  </td>

                  <td className="p-3">
                    {student.session}
                  </td>

                  <td className="p-3">
                    {student.mobile}
                  </td>

                  <td className="p-3">
                    ₹ {student.totalFee}
                  </td>

                  <td className="p-3">
                    ₹ {student.paidAmount}
                  </td>

                  <td className="p-3">
                    ₹ {student.remainingFee}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded text-white text-sm ${
                        student.feeStatus === "PAID"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {student.feeStatus}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}