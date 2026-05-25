"use client";

import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

interface Student {
  id: number;
  studentName: string;
}

export default function FeesPage() {

  const [students, setStudents] = useState<Student[]>([]);

  const [formData, setFormData] = useState({
    studentId: "",
    amount: "",
    status: "Paid",
  });

  useEffect(() => {

    fetchStudents();

  }, []);

  const fetchStudents = async () => {

    const response = await fetch("/api/students/list");

    const data = await response.json();

    setStudents(data);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const response = await fetch("/api/fees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {

      alert("Fee Saved Successfully");

      setFormData({
        studentId: "",
        amount: "",
        status: "Paid",
      });
    }
  };

  return (

  <div className="flex bg-gray-100 min-h-screen">

    <Sidebar />



    <main className="flex-1 ml-72 p-6">

      <div className="bg-white rounded-3xl shadow-sm p-10 max-w-2xl">

        <h1 className="text-4xl font-bold text-blue-700 mb-8">

          Fee Management

        </h1>



        <form
          onSubmit={handleSubmit}

          className="space-y-5"
        >

          <select
            name="studentId"

            value={formData.studentId}

            onChange={handleChange}

            className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600"
          >

            <option value="">
              Select Student
            </option>



            {students.map((student) => (

              <option
                key={student.id}

                value={student.id}
              >

                {student.studentName}

              </option>

            ))}

          </select>



          <input
            type="number"

            name="amount"

            placeholder="Fee Amount"

            value={formData.amount}

            onChange={handleChange}

            className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600"
          />



          <select
            name="status"

            value={formData.status}

            onChange={handleChange}

            className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600"
          >

            <option value="Paid">

              Paid

            </option>



            <option value="Pending">

              Pending

            </option>

          </select>



          <button
            type="submit"

            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
          >

            Save Fee

          </button>

        </form>

      </div>

    </main>

  </div>

);
}