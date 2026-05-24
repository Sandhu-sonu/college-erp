"use client";

import { useState } from "react";

export default function ManageCoursesPage() {

  const [formData, setFormData] = useState({
    courseName: "",
    totalFee: "",
    duration: "",
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

    const response = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {

      alert("Course Added Successfully");

      setFormData({
        courseName: "",
        totalFee: "",
        duration: "",
      });

    } else {

      alert("Failed to Add Course");

    }

  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">

        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Manage Courses
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="courseName"
            placeholder="Course Name"
            value={formData.courseName}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="totalFee"
            placeholder="Total Course Fee"
            value={formData.totalFee}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="duration"
            placeholder="Course Duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Save Course
          </button>

        </form>

      </div>

    </main>
  );
}