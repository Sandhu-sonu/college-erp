import prisma from "../lib/prisma";



async function main() {

  console.log("Seeding Database...");



  /* CLEAR OLD DATA */

  await prisma.fee.deleteMany();

  await prisma.semesterRecord.deleteMany();

  await prisma.subject.deleteMany();

  await prisma.student.deleteMany();

  await prisma.course.deleteMany();



  /* COURSES */

  const courses =
    await Promise.all([

      prisma.course.create({

        data: {

          courseName: "BCA",

          duration: "3 Years",

          semesters: 6,

          totalFee: 120000,

        },

      }),



      prisma.course.create({

        data: {

          courseName: "BCOM",

          duration: "3 Years",

          semesters: 6,

          totalFee: 90000,

        },

      }),



      prisma.course.create({

        data: {

          courseName: "BBA",

          duration: "3 Years",

          semesters: 6,

          totalFee: 100000,

        },

      }),



      prisma.course.create({

        data: {

          courseName: "MCA",

          duration: "2 Years",

          semesters: 4,

          totalFee: 150000,

        },

      }),

    ]);



  /* SUBJECTS */

  const subjectData = [

    "Programming",

    "DBMS",

    "Accounts",

    "Economics",

    "Business Law",

    "Networking",

    "Mathematics",

    "Java",

    "Marketing",

    "AI",

  ];



  for (const course of courses) {

    for (

      let sem = 1;

      sem <= course.semesters;

      sem++

    ) {

      for (

        let i = 0;

        i < 3;

        i++

      ) {

        await prisma.subject.create({

          data: {

            subjectName:
              `${subjectData[i]} ${sem}`,

            semester: sem,

            subjectType:
              i % 2 === 0

                ? "Core"

                : "Practical",

            courseId: course.id,

          },

        });

      }

    }

  }



  /* STUDENTS */

  for (

    let i = 1;

    i <= 100;

    i++

  ) {

    const randomCourse =
      courses[

        Math.floor(

          Math.random() *

            courses.length

        )

      ];



    const paidAmount =
      Math.floor(

        Math.random() *

          randomCourse.totalFee

      );



    const remainingFee =
      randomCourse.totalFee -

      paidAmount;



    const student =
      await prisma.student.create({

        data: {

          name:
            `Student ${i}`,



          fatherName:
            `Father ${i}`,



          mobile:
            `987654${1000 + i}`,



          feeStatus:

            remainingFee > 0

              ? "Pending"

              : "Paid",



          courseId:
            randomCourse.id,

        },

      });



    /* FEES */

    const payments =
      Math.floor(

        Math.random() * 3

      ) + 1;



    for (

      let j = 1;

      j <= payments;

      j++

    ) {

      await prisma.fee.create({

        data: {

          studentId:
            student.id,



          amount:
            Math.floor(

              Math.random() *

                30000

            ) + 5000,



          paymentMethod:

            j % 2 === 0

              ? "Online"

              : "Cash",



          receiptNumber:
            `RCPT-${i}-${j}`,

        },

      });

    }



    /* SEMESTER RECORDS */

    for (

      let sem = 1;

      sem <=
      randomCourse.semesters;

      sem++

    ) {

      await prisma.semesterRecord.create({

        data: {

          studentId:
            student.id,



          semester: sem,



          subjects:
            `Semester ${sem} Subjects`,



          totalFee:
            randomCourse.totalFee,



          paidAmount,



          remainingFee,



          feeStatus:

            remainingFee > 0

              ? "Pending"

              : "Paid",

        },

      });

    }

  }



  console.log(

    "Database Seeded Successfully"

  );

}



main()

  .catch((e) => {

    console.error(e);

    process.exit(1);

  })

  .finally(async () => {

    await prisma.$disconnect();

  });