"use client";

import { useEffect, useState } from "react";

export default function StudentsPage() {

  const [courses, setCourses] =
    useState<any[]>([]);

  const [subjects, setSubjects] =
    useState<any[]>([]);

  const [selectedSubjects, setSelectedSubjects] =
    useState<string[]>([]);

  const [formData, setFormData] =
    useState({

      studentName: "",

      fatherName: "",

      mobile: "",

      semester: 1,

      totalFee: 0,

      paidAmount: 0,

      remainingFee: 0,
      courseId: "",

    });

  useEffect(() => {

    fetchCourses();

  }, []);

  const fetchCourses = async () => {

    const response =
      await fetch("/api/courses");

    const data =
      await response.json();

    setCourses(data);

  };

 const handleSubmit = async (
  e: any
) => {

  e.preventDefault();



  /* NAME VALIDATION */

  /* STUDENT NAME VALIDATION */

if (

  !/^[A-Za-z\s]+$/.test(
    formData.studentName
  )

) {

  alert(
    "Student name can contain only alphabets"
  );

  return;

}

  if (

    !formData.studentName.trim()

  ) {

    alert(
      "Student name is required"
    );

    return;

  }



  /* FATHER NAME VALIDATION */

  /* FATHER NAME VALIDATION */

if (

  !/^[A-Za-z\s]+$/.test(
    formData.fatherName
  )

) {

  alert(
    "Father name can contain only alphabets"
  );

  return;

}

  if (

    !formData.fatherName.trim()

  ) {

    alert(
      "Father name is required"
    );

    return;

  }



  /* MOBILE VALIDATION */

  if (

    !/^[0-9]{10}$/.test(
      formData.mobile
    )

  ) {

    alert(
      "Invalid mobile number"
    );

    return;

  }



  /* COURSE VALIDATION */

  if (

    !formData.courseId

  ) {

    alert(
      "Please select course"
    );

    return;

  }



  /* SUBJECT VALIDATION */

  if (

    selectedSubjects.length === 0

  ) {

    alert(
      "Please select at least one subject"
    );

    return;

  }



  const response =
    await fetch("/api/students", {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({

        ...formData,

        subjects:
          selectedSubjects.join(", "),

      }),

    });



  const data =
    await response.json();



  if (data.success) {

    alert(
      "Student Registered Successfully"
    );

    window.location.reload();

  } else {

    alert(
      data.error
    );

  }

}


  return (

    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-5xl font-bold text-gray-900">

            Student Registration

          </h1>

          <p className="text-gray-500 mt-3 mb-10 text-lg">

            Register a new student and add semester details

          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-10"
          >

            {/* STUDENT INFO */}

            <div>

              <h2 className="text-2xl font-bold text-blue-700 mb-6">

                Student Information

              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  type="text"
                  placeholder="Student Name"
                  required
                  className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600"

                  onChange={(e) =>
  setFormData({

    ...formData,

    studentName:
      e.target.value

  })
}
                />

                <input
                  type="text"
                  placeholder="Father Name"
                  required
                  className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600"

                  onChange={(e) =>
                    setFormData({

                      ...formData,

                      fatherName:
  e.target.value

                    })
                  }
                />

                <input

  type="text"

  value={formData.mobile}

  onChange={(e) =>

    setFormData({

      ...formData,

      mobile:
        e.target.value

    })

  }

  maxLength={10}

  inputMode="numeric"

  placeholder="Enter Mobile Number"

  className="w-full border rounded-xl p-4"

/>           
              <select
  required
  value={formData.courseId || ""}

  className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600"

  onChange={async (e) => {

    const selectedCourseId =
      e.target.value;

    const foundCourse =
      courses.find(
        (c: any) =>
          c.id ===
          Number(selectedCourseId)
      );

    let fee = 0;

    if (foundCourse) {

      fee =
        foundCourse.totalFee;

    }

    setFormData((prev: any) => ({

      ...prev,

      courseId:
        selectedCourseId,

      totalFee:
        fee,

      remainingFee:
        fee -
        Number(
          prev.paidAmount
        ),

    }));



    /* FETCH SUBJECTS */

    const response =
      await fetch(

        `/api/subjects?courseId=${selectedCourseId}&semester=${formData.semester}`

      );



    const data =
      await response.json();



    setSubjects(data);

  }}

>

  <option value="">
    Select Course
  </option>

  {courses.map((course: any) => (

    <option
      key={course.id}
      value={course.id}
    >

      {course.courseName}

    </option>

  ))}

</select>



<select

  className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600"

  onChange={async (e) => {

    const semester =
      Number(
        e.target.value
      );



    setFormData({

      ...formData,

      semester,

    });



    if (formData.courseId) {

      const response =
        await fetch(

          `/api/subjects?courseId=${formData.courseId}&semester=${semester}`

        );



      const data =
        await response.json();



      setSubjects(data);

    }

  }}

>

  <option value="1">
    Semester 1
  </option>

  <option value="2">
    Semester 2
  </option>

  <option value="3">
    Semester 3
  </option>

  <option value="4">
    Semester 4
  </option>

  <option value="5">
    Semester 5
  </option>

  <option value="6">
    Semester 6
  </option>

</select>

                <input
                  type="number"
                  value={formData.totalFee}
                  readOnly

                  placeholder="Total Fee"

                  className="border-2 border-gray-200 p-4 rounded-2xl bg-gray-50"
                />

                <input
                  type="number"

                  placeholder="Paid Amount"

                  className="border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600"

                  onChange={(e) => {

                    const paid =
                      Number(
                        e.target.value
                      );

                    const total =
                      Number(
                        formData.totalFee
                      );

                    setFormData({

                      ...formData,

                      paidAmount:
                        paid,

                      remainingFee:
                        total - paid,

                    });

                  }}
                />

                <input
                  type="number"

                  value={
                    formData.remainingFee
                  }

                  readOnly

                  placeholder="Remaining Fee"

                  className="border-2 border-gray-200 p-4 rounded-2xl bg-gray-50"
                />

              </div>

            </div>

            {/* SUBJECTS */}

            <div>

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-blue-700">

                  Select Subjects

                </h2>

                <button
                  type="button"

                  className="bg-blue-600 text-white px-5 py-2 rounded-xl"
                  onClick={() => {

                    setSelectedSubjects(

                      subjects.map(
                        (s) =>
                          s.subjectName
                      )

                    );

                  }}
                >

                  Select All

                </button>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {subjects.map((subject) => (

                  <label
                    key={subject.id}

                    className="border-2 border-gray-200 rounded-2xl p-5 flex justify-between items-center cursor-pointer hover:border-blue-500 transition"
                  >

                    <div className="flex items-center gap-3">

                      <input
                        type="checkbox"

                        checked={selectedSubjects.includes(
                          subject.subjectName
                        )}

                        onChange={(e) => {

                          if (
                            e.target.checked
                          ) {

                            setSelectedSubjects([
                              ...selectedSubjects,

                              subject.subjectName,

                            ]);

                          } else {

                            setSelectedSubjects(

                              selectedSubjects.filter(
                                (s) =>
                                  s !==
                                  subject.subjectName
                              )

                            );

                          }

                        }}
                      />

                      <div>

                        <p className="font-semibold text-lg">

                          {
                            subject.subjectName
                          }

                        </p>

                        <p className="text-sm text-gray-500">

                          {
                            subject.subjectType
                          }

                        </p>

                      </div>

                    </div>

                  </label>

                ))}

              </div>

            </div>

            <button
              type="submit"

              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold p-5 rounded-2xl transition"
            >

              Register Student

            </button>

          </form>

        </div>

        {/* RIGHT SUMMARY */}

        <div className="bg-white rounded-3xl shadow-lg p-8 h-fit sticky top-6">

          <h2 className="text-2xl font-bold text-blue-700 mb-8">

            Registration Summary

          </h2>

          <div className="space-y-6 text-lg">

            <div className="flex justify-between">

              <span className="text-gray-500">
                Course
              </span>

              <span className="font-bold">
                {formData.courseId || "-"}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Semester
              </span>

              <span className="font-bold">

                Semester {
                  formData.semester
                }

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Total Fee
              </span>

              <span className="font-bold text-green-600">

                ₹ {
                  formData.totalFee
                }

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Paid Amount
              </span>

              <span className="font-bold">

                ₹ {
                  formData.paidAmount
                }

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Remaining
              </span>

              <span className="font-bold text-red-600">

                ₹ {
                  formData.remainingFee
                }

              </span>

            </div>

            <div className="pt-5 border-t">

              <p className="text-gray-500 mb-2">

                Selected Subjects

              </p>

              <p className="font-bold text-blue-700 text-2xl">

                {
                  selectedSubjects.length
                }

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}