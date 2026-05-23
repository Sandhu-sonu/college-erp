-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "studentName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "feeStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
