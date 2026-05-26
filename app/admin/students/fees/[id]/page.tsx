"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";

import jsPDF from "jspdf";



interface Fee {

  id: number;

  amount: number;

  paymentDate: string;

  paymentMethod?: string;

}



interface Student {

  id: number;

  name: string;

  mobile: string;

  course: string;

  feeStatus: string;

  semesterRecords: {

    semester: number;

    totalFee: number;

    paidAmount: number;

    remainingFee: number;

  }[];

}



export default function StudentFeePage() {

  const params =
    useParams();



  const studentId =
    params.id;



  const [student, setStudent] =
    useState<Student | null>(null);



  const [fees, setFees] =
    useState<Fee[]>([]);



  const [paymentAmount, setPaymentAmount] =
    useState("");



  const [showReceiptButton, setShowReceiptButton] =
    useState(false);



  useEffect(() => {

    fetchStudent();

    fetchFees();

  }, []);



  const fetchStudent = async () => {

    const response =
      await fetch(

        `/api/students/${studentId}`

      );



    const data =
      await response.json();



    setStudent(data);

  };



 
const fetchFees = async () => {

  try {

    const response =
      await fetch(
        `/api/fees/${studentId}`
      );



    const data =
      await response.json();



    if (Array.isArray(data)) {

      setFees(data);

    } else {

      console.log(
        "Invalid fees data:",
        data
      );

      setFees([]);

    }

  } catch (error) {

    console.log(error);

    setFees([]);

  }

};

  const latestSemester =
    student?.semesterRecords?.[0];



  const handlePayment = async () => {

    if (!paymentAmount) {

      alert(
        "Enter payment amount"
      );

      return;

    }



    const response =
      await fetch("/api/fees", {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

        },

        body: JSON.stringify({

          studentId,

          amount:
            Number(paymentAmount),

        }),

      });



    if (response.ok) {

      alert(
        "Payment Added Successfully"
      );



      setShowReceiptButton(true);



      setPaymentAmount("");



      fetchStudent();

      fetchFees();

    }

  };



  const generateReceipt = () => {

    if (!student) return;



    const doc =
      new jsPDF();



    // HEADER

    doc.setFillColor(
      37,
      99,
      235
    );



    doc.rect(
      0,
      0,
      210,
      35,
      "F"
    );



    doc.setTextColor(
      255,
      255,
      255
    );



    doc.setFontSize(24);

    doc.text(
      "COLLEGE ERP",
      20,
      20
    );



    doc.setFontSize(11);

    doc.text(
      "Official Fee Receipt",
      20,
      28
    );



    // RESET COLOR

    doc.setTextColor(
      0,
      0,
      0
    );



    // RECEIPT INFO

    doc.setFontSize(12);



    doc.text(
      `Receipt No: RCPT-${Date.now()}`,
      140,
      50
    );



    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      140,
      58
    );



    // STUDENT BOX

    doc.setDrawColor(220);



    doc.roundedRect(
      15,
      45,
      180,
      45,
      3,
      3
    );



    doc.setFontSize(16);

    doc.text(
      "Student Details",
      20,
      58
    );



    doc.setFontSize(12);



    doc.text(
      `Name: ${student.name}`,
      20,
      70
    );



    doc.text(
      `Course: ${student.course}`,
      20,
      78
    );



    doc.text(
      `Mobile: ${student.mobile}`,
      110,
      70
    );



    doc.text(
      `Semester: ${
        latestSemester?.semester || "-"
      }`,
      110,
      78
    );



    // PAYMENT TABLE HEADER

    doc.setFillColor(
      37,
      99,
      235
    );



    doc.rect(
      15,
      105,
      180,
      12,
      "F"
    );



    doc.setTextColor(
      255,
      255,
      255
    );



    doc.setFontSize(13);

    doc.text(
      "Fee Details",
      20,
      113
    );



    doc.setTextColor(
      0,
      0,
      0
    );



    // TABLE

    doc.rect(
      15,
      117,
      180,
      50
    );



    doc.line(
      120,
      117,
      120,
      167
    );



    doc.line(
      15,
      130,
      195,
      130
    );



    doc.line(
      15,
      143,
      195,
      143
    );



    doc.line(
      15,
      156,
      195,
      156
    );



    doc.setFontSize(12);



    doc.text(
      "Description",
      20,
      126
    );



    doc.text(
      "Amount",
      145,
      126
    );



    doc.text(
      "Total Fee",
      20,
      139
    );



    doc.text(
      `₹ ${
        latestSemester?.totalFee || 0
      }`,
      145,
      139
    );



    doc.text(
      "Paid Amount",
      20,
      152
    );



    doc.text(
      `₹ ${
        latestSemester?.paidAmount || 0
      }`,
      145,
      152
    );



    doc.text(
      "Remaining Fee",
      20,
      165
    );



    doc.text(
      `₹ ${
        latestSemester?.remainingFee || 0
      }`,
      145,
      165
    );



    // FOOTER

    doc.setFontSize(11);



    doc.text(
      "Authorized Signature",
      145,
      210
    );



    doc.line(
      130,
      205,
      190,
      205
    );



    doc.setTextColor(100);



    doc.text(
      "This is a system generated receipt.",
      20,
      250
    );



    // PREVIEW PDF

    const pdfBlobUrl =
      doc.output("bloburl");



    window.open(
      pdfBlobUrl,
      "_blank"
    );

  };



  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />



      <main className="flex-1 ml-72 p-6">

        <Navbar />



        <div className="space-y-8">

          {/* HEADER */}

          <div>

            <h1 className="text-4xl font-bold text-gray-900">

              Student Fee Management

            </h1>



            <p className="text-gray-500 mt-2">

              Collect fees and manage payment history

            </p>

          </div>



          {/* STUDENT INFO */}

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <p className="text-gray-500 mb-2">

                Student

              </p>



              <h2 className="text-2xl font-bold text-gray-800">

                {student?.name}

              </h2>

            </div>



            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <p className="text-gray-500 mb-2">

                Total Fee

              </p>



              <h2 className="text-3xl font-bold text-blue-600">

                ₹ {
                  latestSemester?.totalFee || 0
                }

              </h2>

            </div>



            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <p className="text-gray-500 mb-2">

                Paid Amount

              </p>



              <h2 className="text-3xl font-bold text-green-600">

                ₹ {
                  latestSemester?.paidAmount || 0
                }

              </h2>

            </div>



            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <p className="text-gray-500 mb-2">

                Remaining Fee

              </p>



              <h2 className="text-3xl font-bold text-red-600">

                ₹ {
                  latestSemester?.remainingFee || 0
                }

              </h2>

            </div>

          </div>



          {/* PAYMENT FORM */}

          <div className="bg-white rounded-3xl shadow-sm p-8 max-w-2xl">

            <h2 className="text-2xl font-bold mb-6">

              Add Fee Payment

            </h2>



            <div className="space-y-5">

              <input
                type="number"

                placeholder="Enter Payment Amount"

                value={paymentAmount}

                onChange={(e) =>
                  setPaymentAmount(
                    e.target.value
                  )
                }

                className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600"
              />



              <div className="flex gap-4">

                <button

                  onClick={handlePayment}

                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold"
                >

                  Save Payment

                </button>



                {showReceiptButton && (

                  <button

                    onClick={generateReceipt}

                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold"
                  >

                    View Receipt

                  </button>

                )}

              </div>

            </div>

          </div>



          {/* PAYMENT HISTORY */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-2xl font-bold mb-6">

              Payment History

            </h2>



            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="p-4 text-left">

                      Amount

                    </th>



                    <th className="p-4 text-left">

                      Payment Method

                    </th>



                    <th className="p-4 text-left">

                      Date

                    </th>

                  </tr>

                </thead>



                <tbody>

                  {fees.map((fee) => (

                    <tr
                      key={fee.id}

                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4 font-bold text-green-600">

                        ₹ {fee.amount}

                      </td>



                      <td className="p-4">

                        {fee.paymentMethod || "Cash"}

                      </td>



                      <td className="p-4">

                        {new Date(
                          fee.paymentDate
                        ).toLocaleDateString()}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}