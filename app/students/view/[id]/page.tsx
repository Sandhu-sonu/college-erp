"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

export default function ViewStudentPage() {

  const params = useParams();

  const id = params.id;

  const [student, setStudent] =
    useState<any>(null);

  useEffect(() => {

    fetchStudent();

  }, []);

  const fetchStudent = async () => {

    const response =
      await fetch(
        `/api/students/${id}`
      );

    const data =
      await response.json();

    setStudent(data);

  };

  if (!student) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }

  return (

    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto">

        {/* PROFILE CARD */}

        <div className="bg-white rounded-2xl shadow p-8 mb-8">

          <div className="flex items-center gap-8">

            <img
              src={
                student.photo ||

                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="student"
              className="w-36 h-36 rounded-full border-4 border-blue-600 object-cover"
            />

            <div>

              <h1 className="text-4xl font-bold text-blue-700">

                {student.name}

              </h1>

              <div className="grid md:grid-cols-2 gap-4 mt-6 text-lg">

                <p>
                  <span className="font-bold">
                    Father Name:
                  </span>{" "}
                  {student.fatherName}
                </p>

                <p>
                  <span className="font-bold">
                    Mobile:
                  </span>{" "}
                  {student.mobile}
                </p>

                <p>
                  <span className="font-bold">
                    Course:
                  </span>{" "}
                  {student.course}
                </p>

                <p>
                  <span className="font-bold">
                    Fee Status:
                  </span>{" "}
                  {student.feeStatus}
                </p>

              </div>

            </div>

          </div>

        </div>



        {/* SEMESTER HISTORY */}

        <div className="bg-white rounded-2xl shadow p-8">

          <h2 className="text-3xl font-bold text-blue-700 mb-8">

            Semester History

          </h2>

          <div className="space-y-6">

            {student.semesterRecords.map(
              (record: any) => (

                <div
                  key={record.id}
                  className="border rounded-xl p-6 bg-gray-50"
                >

                  <div className="flex justify-between items-center mb-4">

                    <h3 className="text-2xl font-bold text-blue-700">

                      Semester {record.semester}

                    </h3>

                    <span
                      className={`px-4 py-2 rounded text-white font-bold ${
                        record.feeStatus ===
                        "PAID"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >

                      {record.feeStatus}

                    </span>

                  </div>

                  <div className="grid md:grid-cols-2 gap-4">

                    <p>

                      <span className="font-bold">
                        Subjects:
                      </span>{" "}

                      {record.subjects}

                    </p>

                    <p>

                      <span className="font-bold">
                        Total Fee:
                      </span>{" "}

                      ₹ {record.totalFee}

                    </p>

                    <p>

                      <span className="font-bold">
                        Paid Amount:
                      </span>{" "}

                      ₹ {record.paidAmount}

                    </p>

                    <p>

                      <span className="font-bold">
                        Remaining Fee:
                      </span>{" "}

                      ₹ {record.remainingFee}

                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </main>

  );
}