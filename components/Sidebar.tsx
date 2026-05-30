"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

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

  const { data: session } =
  useSession();
  const role =
  (session?.user as any)
    ?.role;

  const [open, setOpen] =                                             
  useState(false);

useEffect(() => {

  if (open) {                                             

    document.body.classList.add(
      "sidebar-open"
    );

  } else {

    document.body.classList.remove(
      "sidebar-open"
    );

  }

}, [open]);



const menuItems = [

  ...(role !== "CLERK"
    ? [
        {
          title: "Dashboard",
          href:
            "/admin/dashboard",
          icon:
            LayoutDashboard,
        },
      ]
    : []),

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
    title: "Fees",
    href:
      "/admin/fees",
    icon:
      IndianRupee,
  },

  ...(role !== "CLERK"
    ? [
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
          title: "Expenses",
          href:
            "/admin/expenses",
          icon:
            IndianRupee,
        },

        {
          title: "Ledger",
          href:
            "/admin/ledger",
          icon:
            FileText,
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
      ]
    : []),

];

  return (

    <>

      {/* MENU BUTTON */}

     {!open && (

  <button

    onClick={() =>
      setOpen(true)
    }

    className="fixed top-4 left-4 z-50 bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg"
  >

    Menu

  </button>

)}



      {/* SIDEBAR */}

      {open && (

        <aside className="w-72 bg-gradient-to-b from-blue-950 to-blue-900 text-white h-screen fixed left-0 top-0 shadow-2xl flex flex-col z-40 overflow-y-auto">

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

                <div

                  key={item.title}

                  onClick={() => {

                    setOpen(false);



                    setTimeout(() => {

                      window.location.href =
                        item.href;

                    }, 150);

                  }}

                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group cursor-pointer ${
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

                </div>

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

                  {session?.user?.name ||
    "Admin"}

                </p>



                <p className="text-sm text-blue-200">

                   {session?.user?.role ||
    "ADMIN"}

                </p>

              </div>

            </div>
            <button
  onClick={() =>
    signOut({
      callbackUrl: "/login",
    })
  }
  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium"
>
  Logout
</button>

          </div>

        </aside>

      )}

    </>

  );

}