"use client";

import { useState } from "react";

export default function RegisterPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

    const response = await fetch(
      "/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {

      alert("Admin Registered Successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded shadow w-full max-w-md">

        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Admin Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Register
          </button>

        </form>

      </div>

    </main>
  );
}