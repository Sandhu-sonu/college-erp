"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    const result =
      await signIn(
        "credentials",
        {
          email,
          password,
          redirect: false,
        }
      );

    setLoading(false);

    if (result?.error) {

      alert(
        "Invalid Email or Password"
      );

      return;

    }

    router.push(
      "/admin/dashboard"
    );

  };

  return (

    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-blue-700 p-6">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-blue-800 mb-2">

          College ERP

        </h1>

        <p className="text-center text-gray-500 mb-8">

          Sign in to continue

        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full border-2 border-gray-200 rounded-xl p-4"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border-2 border-gray-200 rounded-xl p-4"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-xl p-4 font-semibold"
          >

            {loading
              ? "Signing In..."
              : "Login"}

          </button>

        </form>

      </div>

    </main>

  );

}