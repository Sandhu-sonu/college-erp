"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

export default function StudentProfilePage() {

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
      <div className="p-10 text-xl">
        Loading...
      </div>
    );

  }

  return (

    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-blue-700 text-white p-8 flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              Student Profile
            </h1>

            <p className="mt-2 text-lg">
              College ERP Management System
            </p>

          </div>

          <button
            onClick={() => window.print()}
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold"
          >
            Print
          </button>

        </div>

        {/* Main Content */}

        <div className="p-10">

          {/* Top Section */}

          <div className="grid md:grid-cols-3 gap-8">

            {/* Photo */}

            <div className="flex justify-center">

              <div className="text-center">

                <img
                  src={
                    student.photo ||
                    "https://via.placeholder.com/200x220.png?text=Student+Photo"
                  }
                  alt="Student"
                  className="w-52 h-60 object-cover rounded-2xl border-4 border-blue-600 shadow-lg"
                />

                <h2 className="mt-4 text-2xl font-bold">
                  {student.studentName}
                </h2>

                <p className="text-gray-600">
                  Roll No: {student.rollNumber}
                </p>

              </div>

            </div>

            {/* Academic Info */}

            <div className="md:col-span-2 grid md:grid-cols-2 gap-6">

              <ProfileField
                label="Course"
                value={student.course}
              />

              <ProfileField
                label="Session"
                value={student.session}
              />

              <ProfileField
                label="Father Name"
                value={student.fatherName}
              />

              <ProfileField
                label="Mother Name"
                value={student.motherName}
              />

              <ProfileField
                label="Gender"
                value={student.gender}
              />

              <ProfileField
                label="Date of Birth"
                value={student.dob}
              />

              <ProfileField
                label="Qualification"
                value={student.qualification}
              />

              <ProfileField
                label="Admission Date"
                value={student.admissionDate}
              />

            </div>

          </div>

          {/* Contact Section */}

          <div className="mt-12">

            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Contact Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <ProfileField
                label="Mobile Number"
                value={student.mobile}
              />

              <ProfileField
                label="Alternate Phone"
                value={student.alternatePhone}
              />

              <ProfileField
                label="Email"
                value={student.email}
              />

              <ProfileField
                label="City"
                value={student.city}
              />

              <ProfileField
                label="State"
                value={student.state}
              />

              <ProfileField
                label="PIN Code"
                value={student.pinCode}
              />

            </div>

            <div className="mt-6">

              <ProfileField
                label="Address"
                value={student.address}
              />

            </div>

          </div>

          {/* Fee Section */}

          <div className="mt-12">

            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Fee Information
            </h2>

            <div className="grid md:grid-cols-4 gap-6">

              <FeeCard
                title="Total Fee"
                value={`₹ ${student.totalFee || 0}`}
                color="bg-blue-600"
              />

              <FeeCard
                title="Paid Amount"
                value={`₹ ${student.paidAmount || 0}`}
                color="bg-green-600"
              />

              <FeeCard
                title="Remaining Fee"
                value={`₹ ${student.remainingFee || 0}`}
                color="bg-red-600"
              />

              <FeeCard
                title="Status"
                value={student.feeStatus}
                color={
                  student.feeStatus === "PAID"
                    ? "bg-green-700"
                    : "bg-orange-600"
                }
              />

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}



// PROFILE FIELD COMPONENT

function ProfileField({
  label,
  value,
}: {
  label: string;
  value: any;
}) {

  return (

    <div className="bg-gray-50 p-5 rounded-2xl border">

      <h3 className="text-sm text-gray-500 font-semibold">
        {label}
      </h3>

      <p className="text-lg font-medium mt-2">
        {value || "-"}
      </p>

    </div>

  );

}



// FEE CARD COMPONENT

function FeeCard({
  title,
  value,
  color,
}: {
  title: string;
  value: any;
  color: string;
}) {

  return (

    <div className={`${color} text-white p-6 rounded-2xl shadow`}>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-3">
        {value}
      </p>

    </div>

  );

}