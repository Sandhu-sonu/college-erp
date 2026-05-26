import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {

  try {

    const subjects =
      await prisma.subject.findMany({

        include: {

          course: true,

        },

      });

    const students =
      await prisma.student.findMany({

        include: {

          course: true,

        },

      });

    console.log("SUBJECTS:");
    console.log(subjects);

    console.log("STUDENTS:");
    console.log(students);

    const report =
      subjects.map((subject) => {

        console.log(
          "Checking Subject:",
          subject.subjectName,
          subject.courseId
        );

        const subjectStudents =
          students.filter((student) => {

            console.log(
              "Student Course:",
              student.name,
              student.courseId
            );

            return (
              Number(student.courseId) ===
              Number(subject.courseId)
            );

          });

        return {

          ...subject,

          students: subjectStudents,

        };

      });

    return NextResponse.json(report);

  } catch (error: any) {

    console.log(error);

    return NextResponse.json(

      {

        error: error.message,

      },

      {

        status: 500,

      }

    );

  }

}