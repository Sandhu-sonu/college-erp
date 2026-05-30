import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {

  const password =
    await bcrypt.hash(
      "admin123",
      10
    );

  await prisma.admin.createMany({

    data: [

      {

        name: "Principal",

        email:
          "principal@college.com",

        password,

        role:
          "PRINCIPAL",

      },

      {

        name: "Head",

        email:
          "head@college.com",

        password,

        role:
          "HEAD",

      },

      {

        name: "Clerk",

        email:
          "clerk@college.com",

        password,

        role:
          "CLERK",

      },

    ],

  });

  console.log(
    "Admin users created successfully"
  );

}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });