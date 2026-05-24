import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const student = await prisma.student.create({

      data: {

        studentName: body.studentName,
        fatherName: body.fatherName,
        motherName: body.motherName,

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
        rollNumber: body.rollNumber,

        feeStatus: body.feeStatus,

      },

    });

    return NextResponse.json({
      success: true,
      student,
    });

  } catch (error) {

    console.log("STUDENT ERROR FULL:", JSON.stringify(error, null, 2));

    return NextResponse.json(
      { error: "Failed to save student" },
      { status: 500 }
    );

  }

}