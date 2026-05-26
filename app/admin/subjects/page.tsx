"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";



interface Subject {

  id: number;

  subjectName: string;

  courseName: string;

  semester: number;

  subjectType: string;

}



interface Course {

  id: number;

  name: string;

}



export default function SubjectsPage() {

  const [subjects, setSubjects] =
    useState<Subject[]>([]);



  const [courses, setCourses] =
    useState<Course[]>([]);



  const [courseFilter, setCourseFilter] =
    useState("ALL");



  const [formData, setFormData] =
    useState({

      subjectName: "",

      courseName: "",

      semester: "",

      subjectType: "",

    });



  useEffect(() => {

    fetchSubjects();



    const savedCourses =
      localStorage.getItem(
        "courses"
      );



    if (savedCourses) {

      setCourses(
        JSON.parse(savedCourses)
      );

    }

  }, []);



  const fetchSubjects = async () => {

    const response =
      await fetch("/api/subjects");



    const data =
      await response.json();



    setSubjects(data);

  };



  const handleChange = (

    e: React.ChangeEvent<

      HTMLInputElement |

      HTMLSelectElement

    >

  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };



  const handleSubmit = async (

    e: React.FormEvent

  ) => {

    e.preventDefault();



    const response =
      await fetch("/api/subjects", {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

        },

        body: JSON.stringify({

          ...formData,

          semester: Number(
            formData.semester
          ),

        }),

      });



    if (response.ok) {

      alert(
        "Subject Added Successfully"
      );



      setFormData({

        subjectName: "",

        courseName: "",

        semester: "",

        subjectType: "",

      });



      fetchSubjects();

    }

  };



  const deleteSubject = async (

    id: number

  ) => {

    const confirmDelete =
      confirm(

        "Delete this subject?"

      );



    if (!confirmDelete)
      return;



    await fetch(

      `/api/subjects/${id}`,

      {

        method: "DELETE",

      }

    );



    fetchSubjects();

  };



  const filteredSubjects =

    courseFilter === "ALL"

      ? subjects

      : subjects.filter(

          (subject) =>

            subject.courseName ===
            courseFilter

        );



  const groupedSubjects =
    filteredSubjects.reduce(

      (acc: any, subject) => {

        const sem =
          subject.semester;



        if (!acc[sem]) {

          acc[sem] = [];

        }



        acc[sem].push(subject);



        return acc;

      },

      {}

    );



  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />



      <main className="flex-1 ml-72 p-6">

        <Navbar />



        <div className="space-y-8">

          {/* HEADER */}

          <div>

            <h1 className="text-5xl font-bold text-gray-900">

              Subject Management

            </h1>



            <p className="text-gray-500 mt-3 text-lg">

              Manage semester-wise subjects

            </p>

          </div>



          {/* ADD SUBJECT */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-3xl font-bold mb-8">

              Add Subject

            </h2>



            <form

              onSubmit={handleSubmit}

              className="grid md:grid-cols-4 gap-6"
            >

              <input
                type="text"

                name="subjectName"

                placeholder="Subject Name"

                value={formData.subjectName}

                onChange={handleChange}

                className="border border-gray-200 p-4 rounded-2xl"
              />



              {/* DYNAMIC COURSES */}

              <select
                name="courseName"

                value={formData.courseName}

                onChange={handleChange}

                className="border border-gray-200 p-4 rounded-2xl"
              >

                <option value="">

                  Select Course

                </option>



                {courses.map(

                  (course) => (

                    <option
                      key={course.id}

                      value={
                        course.name
                      }
                    >

                      {course.name}

                    </option>

                  )

                )}

              </select>



              <select
                name="semester"

                value={formData.semester}

                onChange={handleChange}

                className="border border-gray-200 p-4 rounded-2xl"
              >

                <option value="">

                  Semester

                </option>



                {[1,2,3,4,5,6,7,8].map(

                  (sem) => (

                    <option
                      key={sem}

                      value={sem}
                    >

                      Semester {sem}

                    </option>

                  )

                )}

              </select>



              <select
                name="subjectType"

                value={formData.subjectType}

                onChange={handleChange}

                className="border border-gray-200 p-4 rounded-2xl"
              >

                <option value="">

                  Subject Type

                </option>



                <option value="Core">

                  Core

                </option>



                <option value="Elective">

                  Elective

                </option>



                <option value="Practical">

                  Practical

                </option>

              </select>



              <button
                type="submit"

                className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold md:col-span-4"
              >

                Add Subject

              </button>

            </form>

          </div>



          {/* FILTER */}

          <div className="bg-white rounded-3xl shadow-sm p-6 flex items-center gap-5">

            <h3 className="font-bold text-xl">

              Filter Course:

            </h3>



            <select

              value={courseFilter}

              onChange={(e) =>

                setCourseFilter(
                  e.target.value
                )
              }

              className="border border-gray-200 p-3 rounded-2xl"
            >

              <option value="ALL">

                All Courses

              </option>



              {courses.map(

                (course) => (

                  <option
                    key={course.id}

                    value={
                      course.name
                    }
                  >

                    {course.name}

                  </option>

                )

              )}

            </select>

          </div>



          {/* SEMESTERS */}

          <div className="space-y-8">

            {Object.keys(

              groupedSubjects

            ).map((semester) => (

              <div
                key={semester}

                className="bg-white rounded-3xl shadow-sm p-8"
              >

                <h2 className="text-3xl font-bold text-blue-700 mb-8">

                  Semester {semester}

                </h2>



                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {groupedSubjects[
                    semester
                  ].map(

                    (
                      subject: Subject
                    ) => (

                      <div
                        key={subject.id}

                        className="border border-gray-100 rounded-3xl p-6 hover:shadow-xl transition"
                      >

                        <div className="flex justify-between items-start">

                          <div>

                            <h3 className="text-2xl font-bold text-gray-800">

                              {
                                subject.subjectName
                              }

                            </h3>



                            <p className="text-gray-500 mt-3">

                              {
                                subject.courseName
                              }

                            </p>

                          </div>



                          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">

                            {
                              subject.subjectType
                            }

                          </span>

                        </div>



                        <button

                          onClick={() =>
                            deleteSubject(
                              subject.id
                            )
                          }

                          className="mt-6 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl font-semibold"
                        >

                          Delete

                        </button>

                      </div>

                    )

                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>

  );

}