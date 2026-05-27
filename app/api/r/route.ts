import prisma from "@/lib/prisma";



export async function GET() {

  await prisma.fee.deleteMany();

  await prisma.semesterRecord.deleteMany();

  await prisma.student.deleteMany();



  return Response.json({

    success: true,

  });

}