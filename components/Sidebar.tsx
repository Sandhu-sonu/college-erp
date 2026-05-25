"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {

  LayoutDashboard,

  Users,

  IndianRupee,

  FileText,

  Settings,

  BookOpen,

  GraduationCap,

} from "lucide-react";



export default function Sidebar() {

  const pathname =
    usePathname();



  const menuItems = [

    {

      title: "Dashboard",

      href:
        "/admin/dashboard",

      icon:
        LayoutDashboard,

    },

    {

      title: "Students",

      href:
        "/admin/students/list",

      icon:
        Users,

    },

    {

      title: "Admissions",

      href:
        "/admin/admissions",

      icon:
        GraduationCap,

    },

    {

      title: "Courses",

      href:
        "/admin/courses",

      icon:
        BookOpen,

    },

    {

      title: "Subjects",

      href:
        "/admin/subjects",

      icon:
        BookOpen,

    },

    {

      title: "Fees",

      href:
        "/admin/fees",

      icon:
        IndianRupee,

    },

    {

      title: "Reports",

      href:
        "/admin/reports",

      icon:
        FileText,

    },

    {

      title: "Settings",

      href:
        "/admin/settings",

      icon:
        Settings,

    },

  ];



  return (

    <aside className="w-72 bg-gradient-to-b from-blue-950 to-blue-900 text-white min-h-screen fixed left-0 top-0 shadow-2xl flex flex-col">

      {/* LOGO */}

      <div className="p-8 border-b border-blue-800">

        <h1 className="text-3xl font-bold tracking-wide">

          College ERP

        </h1>

        <p className="text-blue-200 mt-2 text-sm">

          Management System

        </p>

      </div>



      {/* MENU */}

      <nav className="flex-1 p-5 space-y-2 overflow-y-auto">

        {menuItems.map((item) => {

          const Icon =
            item.icon;

          const active =
            pathname ===
            item.href;



          return (

            <Link
              key={item.title}

              href={item.href}

              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group ${
                active

                  ? "bg-blue-700 shadow-lg"

                  : "hover:bg-blue-800"
              }`}
            >

              <Icon
                size={22}

                className="group-hover:scale-110 transition"
              />

              <span className="font-medium text-[15px]">

                {item.title}

              </span>

            </Link>

          );

        })}

      </nav>



      {/* FOOTER */}

      <div className="p-6 border-t border-blue-800">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold shadow-lg">

            A

          </div>



          <div>

            <p className="font-semibold">

              Admin

            </p>

            <p className="text-sm text-blue-200">

              Administrator

            </p>

          </div>

        </div>

      </div>

    </aside>

  );

}