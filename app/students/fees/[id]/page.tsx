"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

export default function FeesPage() {

  const params = useParams();

  const studentId =
    params.id;

  const [student, setStudent] =
    useState<any>(null);

  const [fees, setFees] =
    useState<any[]>([]);

  const [amount, setAmount] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  const [remarks, setRemarks] =
    useState("");



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

    const response =
      await fetch(

        `/api/fees?studentId=${studentId}`

      );

    const data =
      await response.json();

    setFees(data);

  };



  const handleSubmit = async (
    e: any
  ) => {

    e.preventDefault();

    const response =
      await fetch("/api/fees", {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          studentId,

          amount,

          paymentMethod,

          remarks,

        }),

      });

    const data =
      await response.json();

    if (data.success) {

      alert(
        "Fee Added Successfully"
      );

      setAmount("");

      setRemarks("");

      fetchStudent();

      fetchFees();

    }

  };



  const latest =
    student?.semesterRecords?.[0];



  return (

    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* LEFT */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-4xl font-bold mb-8">

            Fee Collection

          </h1>



          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-blue-50 p-6 rounded-2xl">

              <p className="text-gray-500">

                Total Fee

              </p>

              <h2 className="text-3xl font-bold text-blue-700 mt-2">

                ₹ {latest?.totalFee}

              </h2>

            </div>



            <div className="bg-green-50 p-6 rounded-2xl">

              <p className="text-gray-500">

                Paid

              </p>

              <h2 className="text-3xl font-bold text-green-700 mt-2">

                ₹ {latest?.paidAmount}

              </h2>

            </div>



            <div className="bg-red-50 p-6 rounded-2xl">

              <p className="text-gray-500">

                Remaining

              </p>

              <h2 className="text-3xl font-bold text-red-700 mt-2">

                ₹ {latest?.remainingFee}

              </h2>

            </div>

          </div>



          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <input
              type="number"

              required

              value={amount}

              placeholder="Enter Amount"

              className="w-full border-2 border-gray-200 p-4 rounded-2xl"

              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
            />



            <select
              className="w-full border-2 border-gray-200 p-4 rounded-2xl"

              value={
                paymentMethod
              }

              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            >

              <option>
                Cash
              </option>

              <option>
                UPI
              </option>

              <option>
                Bank Transfer
              </option>

              <option>
                Card
              </option>

            </select>



            <textarea
              rows={4}

              value={remarks}

              placeholder="Remarks"

              className="w-full border-2 border-gray-200 p-4 rounded-2xl"

              onChange={(e) =>
                setRemarks(
                  e.target.value
                )
              }
            />



            <button
              type="submit"

              className="w-full bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl text-xl font-semibold"
            >

              Add Fee

            </button>

          </form>

        </div>



        {/* RIGHT */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-8">

            Fee History

          </h2>



          <div className="space-y-5">

            {fees.map((fee) => (

              <div
                key={fee.id}

                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between mb-2">

                  <p className="font-bold text-lg">

                    ₹ {fee.amount}

                  </p>

                  <p className="text-sm text-gray-500">

                    {
                      new Date(
                        fee.paymentDate
                      ).toLocaleDateString()
                    }

                  </p>

                </div>

                <p className="text-gray-600">

                  {
                    fee.paymentMethod
                  }

                </p>

                <p className="text-sm text-gray-500 mt-2">

                  {
                    fee.receiptNumber
                  }

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>

  );

}