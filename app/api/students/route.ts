import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    // Auto fee calculations
    const totalFee = Number(body.totalFee || 0);

    const paidAmount = Number(body.paidAmount || 0);

    const remainingFee = totalFee - paidAmount;

    // Auto fee status
    const feeStatus =
      remainingFee <= 0 ? "PAID" : "PENDING";

    // Auto roll number generation
    const lastStudent = await prisma.student.findFirst({
      where: {
        course: body.course,
      },
      orderBy: {
        rollNumber: "desc",
      },
    });

    const nextRollNumber = lastStudent?.rollNumber
      ? lastStudent.rollNumber + 1
      : 1;

    // Create student
    const student = await prisma.student.create({

      data: {

        studentName: body.studentName,
        fatherName: body.fatherName,
        motherName: body.motherName,
        photo: body.photo,

        gender: body.gender,
        dob: body.dob,

        mobile: body.mobile,
        alternatePhone: body.alternatePhone,

        email: body.email,
        address: body.address,

        city: body.city,
        state: body.state,
        pinCode: body.pinCode,

        course: body.course,

        session: body.session,
        admissionDate: body.admissionDate,

        qualification: body.qualification,

        rollNumber: nextRollNumber,

        feeStatus: feeStatus,

        totalFee: totalFee,
        paidAmount: paidAmount,
        remainingFee: remainingFee,

      },

    });

    return NextResponse.json({
      success: true,
      student,
    });

  } catch (error) {

    console.log("STUDENT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to save student" },
      { status: 500 }
    );

  }

}