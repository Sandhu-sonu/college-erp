"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

export default function EditStudentPage() {

  const params = useParams();

  const router = useRouter();

  const studentId =
    params.id;



  const [student, setStudent] =
    useState<any>(null);

  const [courses, setCourses] =
    useState<any[]>([]);



  useEffect(() => {

    fetchStudent();

    fetchCourses();

  }, []);



  const fetchStudent = async () => {

    const response =
      await fetch(

        `/api/students/${studentId}`

      );

    const data =
      await response.json();

    setStudent(data);

  };



  const fetchCourses = async () => {

    const response =
      await fetch("/api/courses");

    const data =
      await response.json();

    setCourses(data);

  };



  const handleUpdate = async (
    e: any
  ) => {

    e.preventDefault();

    const response =
      await fetch(

        `/api/students/${studentId}`,

        {

          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            student
          ),

        }
      );

    const data =
      await response.json();

    if (data.success) {

      alert(
        "Student Updated Successfully"
      );

      router.push(
        "/students/list"
      );

    }

  };



  if (!student) {

    return (

      <div className="p-10 text-center text-2xl">

        Loading...

      </div>

    );

  }



  return (

    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-10">

          Edit Student

        </h1>



        <form
          onSubmit={handleUpdate}
          className="grid md:grid-cols-2 gap-6"
        >

          {/* NAME */}

          <input
            type="text"

            value={student.name}

            className="border-2 border-gray-200 p-4 rounded-2xl"

            onChange={(e) =>
              setStudent({

                ...student,

                name:
                  e.target.value,

              })
            }
          />



          {/* FATHER NAME */}

          <input
            type="text"

            value={
              student.fatherName
            }

            className="border-2 border-gray-200 p-4 rounded-2xl"

            onChange={(e) =>
              setStudent({

                ...student,

                fatherName:
                  e.target.value,

              })
            }
          />



          {/* MOBILE */}

          <input
            type="text"

            value={
              student.mobile
            }

            className="border-2 border-gray-200 p-4 rounded-2xl"

            onChange={(e) =>
              setStudent({

                ...student,

                mobile:
                  e.target.value,

              })
            }
          />



          {/* COURSE */}

          <select

           value={
  student.courseId
}
            className="border-2 border-gray-200 p-4 rounded-2xl"

            onChange={(e) =>
              setStudent({

                ...student,

                courseId:
  Number(
    e.target.value
  ),

              })
            }
          >

            {courses.map((course) => (

              <option
                key={course.id}

                value={
                  course.courseName
                }
              >

                {
                  course.courseName
                }

              </option>

            ))}

          </select>



          {/* FEE STATUS */}

          <select

            value={
              student.feeStatus
            }

            className="border-2 border-gray-200 p-4 rounded-2xl"

            onChange={(e) =>
              setStudent({

                ...student,

                feeStatus:
                  e.target.value,

              })
            }
          >

            <option value="PAID">
              PAID
            </option>

            <option value="PENDING">
              PENDING
            </option>

          </select>



          <button
            type="submit"

            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl text-lg font-semibold md:col-span-2"
          >

            Update Student

          </button>

        </form>

      </div>

    </main>

  );

}