"use client";

import { useState } from "react";
import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";

export default function AdmissionsPage() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    course: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {

      alert("Application Submitted Successfully");

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        course: "",
        message: "",
      });

    } else {

      alert("Submission Failed");

    }
  };

  return (
    <>
      <Navbar />

      <section className="py-20 bg-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4">

          <h1 className="text-5xl font-bold text-blue-700 mb-10 text-center">
            Admissions Open 2026
          </h1>

          <div className="bg-gray-100 p-10 rounded-2xl shadow-md">

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-6"
            >

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="p-4 rounded-lg border"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="p-4 rounded-lg border"
              />

              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="p-4 rounded-lg border"
              />

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="p-4 rounded-lg border"
              >
                <option value="">Select Course</option>
                <option>BA</option>
                <option>BCA</option>
                <option>BCOM</option>
                <option>PGDCA</option>
              </select>

              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="p-4 rounded-lg border md:col-span-2"
              />

              <button
                type="submit"
                className="bg-blue-700 text-white py-4 rounded-lg font-semibold md:col-span-2"
              >
                Submit Application
              </button>

            </form>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}