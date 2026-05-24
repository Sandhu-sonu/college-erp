"use client";

import { useState } from "react";

export default function StudentsPage() {

  const [formData, setFormData] = useState({

    studentName: "",
    fatherName: "",
    motherName: "",

    gender: "",
    dob: "",

    mobile: "",
    alternatePhone: "",

    email: "",
    address: "",

    city: "",
    state: "",
    pinCode: "",

    course: "",

    session: "",
    admissionDate: "",

    qualification: "",
    rollNumber: "",

    feeStatus: "",

  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
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
        motherName: "",

        gender: "",
        dob: "",

        mobile: "",
        alternatePhone: "",

        email: "",
        address: "",

        city: "",
        state: "",
        pinCode: "",

        course: "",

        session: "",
        admissionDate: "",

        qualification: "",
        rollNumber: "",

        feeStatus: "",

      });

    } else {

      alert("Failed to Save Student");

    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow">

        <h1 className="text-4xl font-bold mb-8 text-blue-700">
          Student Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="fatherName"
            placeholder="Father Name"
            value={formData.fatherName}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="motherName"
            placeholder="Mother Name"
            value={formData.motherName}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="alternatePhone"
            placeholder="Alternate Phone"
            value={formData.alternatePhone}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="session"
            placeholder="Session"
            value={formData.session}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="date"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="pinCode"
            placeholder="PIN Code"
            value={formData.pinCode}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="feeStatus"
            placeholder="Fee Status"
            value={formData.feeStatus}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-3 rounded md:col-span-2"
            rows={4}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-4 rounded hover:bg-blue-700 md:col-span-2"
          >
            Save Student
          </button>

        </form>

      </div>

    </main>
  );
}