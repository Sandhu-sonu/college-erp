"use client";

import { useState } from "react";

export default function StudentsPage() {

  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    course: "",
    mobile: "",
    feeStatus: "",
  });

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

    const response = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {

      alert("Student Saved Successfully");

      setFormData({
        studentName: "",
        fatherName: "",
        course: "",
        mobile: "",
        feeStatus: "",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-lg bg-white p-8 rounded shadow">

        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Student Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="fatherName"
            placeholder="Father Name"
            value={formData.fatherName}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="feeStatus"
            placeholder="Fee Status"
            value={formData.feeStatus}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Save Student
          </button>

        </form>

      </div>

    </main>
  );
}