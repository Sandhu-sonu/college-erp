"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full shadow-md bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        <div className="text-2xl font-bold text-blue-700">
          COLLEGE ERP
        </div>

        <div className="hidden md:flex gap-6 font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/admissions">Admissions</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <Link
          href="/login"
          className="hidden md:block bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Login
        </Link>

        <button className="md:hidden">
          <Menu />
        </button>

      </div>
    </nav>
  );
}