"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

export default function ReceiptPage() {

  const params = useParams();

  const id = params.id;

  const [student, setStudent] = useState<any>(null);

  useEffect(() => {

    fetchStudent();

  }, []);

  const fetchStudent = async () => {

    const response = await fetch(
      `/api/students/${id}`
    );

    const data = await response.json();

    setStudent(data);

  };

  if (!student) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }

  const currentYear =
    new Date().getFullYear();

  const paddedId =
    String(student.id).padStart(4, "0");

  const receiptNumber =
    `RCPT-${currentYear}-${paddedId}`;

  const todayDate =
    new Date().toLocaleDateString();

  return (

    <main className="bg-gray-100 py-6 min-h-screen">

      <div className="max-w-2xl mx-auto bg-white border-2 border-black shadow-lg p-6">

        {/* HEADER */}

        <div className="text-center border-b-2 border-black pb-4">

          <h1 className="text-2xl font-bold uppercase text-blue-900">
            Baba Kundan Singh Co-Edu College
          </h1>

          <p className="text-sm font-medium mt-1">
            Affiliated To Punjab University Chandigarh
          </p>

          <div className="flex justify-center gap-6 mt-2 text-sm font-semibold">

            <span>
              99149-10509
            </span>

            <span>
              98154-04754
            </span>

          </div>

          <h2 className="text-xl font-bold mt-4 uppercase">
            Official Fee Receipt
          </h2>

        </div>

        {/* RECEIPT INFO */}

        <div className="flex justify-between mt-5 text-sm">

          <p>
            <span className="font-bold">
              Receipt No:
            </span>{" "}
            {receiptNumber}
          </p>

          <p>
            <span className="font-bold">
              Date:
            </span>{" "}
            {todayDate}
          </p>

        </div>

        {/* STUDENT INFO */}

        <div className="mt-6 text-sm space-y-3">

          <div className="grid grid-cols-2 gap-4">

            <p>
              <span className="font-bold">
                Student Name:
              </span>{" "}
              {student.studentName}
            </p>

            <p>
              <span className="font-bold">
                Roll Number:
              </span>{" "}
              {student.rollNumber}
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <p>
              <span className="font-bold">
                Course:
              </span>{" "}
              {student.course}
            </p>

            <p>
              <span className="font-bold">
                Session:
              </span>{" "}
              {student.session}
            </p>

          </div>

        </div>

        {/* FEE DETAILS */}

        <div className="mt-8">

          <div className="border-y-2 border-black py-2 text-center">

            <h2 className="text-lg font-bold uppercase">
              Fee Details
            </h2>

          </div>

          <table className="w-full mt-4 border border-black text-sm">

            <tbody>

              <tr>

                <td className="border border-black p-3 font-bold">
                  Total Fee
                </td>

                <td className="border border-black p-3">
                  ₹ {student.totalFee || 0}
                </td>

              </tr>

              <tr>

                <td className="border border-black p-3 font-bold">
                  Paid Amount
                </td>

                <td className="border border-black p-3">
                  ₹ {student.paidAmount || 0}
                </td>

              </tr>

              <tr>

                <td className="border border-black p-3 font-bold">
                  Remaining Fee
                </td>

                <td className="border border-black p-3">
                  ₹ {student.remainingFee || 0}
                </td>

              </tr>

              <tr>

                <td className="border border-black p-3 font-bold">
                  Status
                </td>

                <td className="border border-black p-3">
                  {student.feeStatus}
                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* SIGNATURES */}

        <div className="flex justify-between mt-16 text-center text-sm">

          <div>

            <div className="border-t border-black w-40 mb-2"></div>

            <p className="font-semibold">
              Student Signature
            </p>

          </div>

          <div>

            <div className="border-t border-black w-40 mb-2"></div>

            <p className="font-semibold">
              Authorized Signature
            </p>

          </div>

        </div>

        {/* PRINT BUTTON */}

        <div className="text-center mt-10">

          <button
            onClick={() => window.print()}
            className="bg-blue-900 text-white px-6 py-2 rounded text-sm font-bold"
          >
            Print Receipt
          </button>

        </div>

      </div>

    </main>

  );

}