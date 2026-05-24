"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

export default function EditStudentPage() {

  const params = useParams();

  const router = useRouter();

  const id = params.id;

  const [formData, setFormData] = useState<any>({
    studentName: "",
    fatherName: "",
    mobile: "",
    course: "",
    session: "",
    paidAmount: "",
  });

  useEffect(() => {

    fetchStudent();

  }, []);

  const fetchStudent = async () => {

    const response = await fetch(
      `/api/students/${id}`
    );

    const data = await response.json();

    setFormData(data);

  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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

    const response = await fetch(
      `/api/students/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {

      alert("Student Updated Successfully");

      router.push("/students/list");

    } else {

      alert("Failed To Update Student");

    }

  };

  return (

    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow">

        <h1 className="text-4xl font-bold mb-8 text-blue-700">
          Edit Student
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={formData.studentName || ""}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="fatherName"
            placeholder="Father Name"
            value={formData.fatherName || ""}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile || ""}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course || ""}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="session"
            placeholder="Session"
            value={formData.session || ""}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="paidAmount"
            placeholder="Paid Amount"
            value={formData.paidAmount || ""}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-4 rounded hover:bg-blue-700 md:col-span-2"
          >
            Update Student
          </button>

        </form>

      </div>

    </main>

  );

}