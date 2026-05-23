import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const hashedPassword = await bcrypt.hash(
      body.password,
      10
    );

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}