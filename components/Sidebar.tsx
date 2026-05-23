import Link from "next/link";

export default function Sidebar() {

  return (
    <aside className="w-64 min-h-screen bg-blue-700 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        College ERP
      </h1>

      <nav className="space-y-4">

        <Link
          href="/dashboard"
          className="block hover:bg-blue-800 p-3 rounded"
        >
          Dashboard
        </Link>

        <Link
          href="/students"
          className="block hover:bg-blue-800 p-3 rounded"
        >
          Add Student
        </Link>

        <Link
          href="/students/list"
          className="block hover:bg-blue-800 p-3 rounded"
        >
          Student List
        </Link>

        <Link
          href="/fees"
          className="block hover:bg-blue-800 p-3 rounded"
        >
          Fee Management
        </Link>

        <Link
          href="/reports"
          className="block hover:bg-blue-800 p-3 rounded"
        >
          Reports
        </Link>

      </nav>

    </aside>
  );
}
