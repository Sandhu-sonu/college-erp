"use client";

import { useEffect, useState } from "react";

interface Student {
  id: number;
  studentName: string;
  fatherName: string;
  course: string;
  mobile: string;
  feeStatus: string;
}

export default function StudentListPage() {

  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {

    const response = await fetch("/api/students/list");

    const data = await response.json();

    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id: number) => {

    const confirmDelete = confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    await fetch("/api/students", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchStudents();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="bg-white p-6 rounded shadow">

        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Student List
        </h1>

        <table className="w-full border border-collapse">

          <thead>

            <tr className="bg-blue-600 text-white">

              <th className="border p-3">ID</th>
              <th className="border p-3">Student Name</th>
              <th className="border p-3">Father Name</th>
              <th className="border p-3">Course</th>
              <th className="border p-3">Mobile</th>
              <th className="border p-3">Fee Status</th>
              <th className="border p-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr key={student.id}>

                <td className="border p-3">
                  {student.id}
                </td>

                <td className="border p-3">
                  {student.studentName}
                </td>

                <td className="border p-3">
                  {student.fatherName}
                </td>

                <td className="border p-3">
                  {student.course}
                </td>

                <td className="border p-3">
                  {student.mobile}
                </td>

                <td className="border p-3">
                  {student.feeStatus}
                </td>

                <td className="border p-3">

                  <button
                    onClick={() =>
                      deleteStudent(student.id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}