"use client";

import {
  useEffect,
  useState,
} from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

interface Course {
  id: number;
  courseName: string;
}

interface Subject {
  id: number;
  subjectName: string;
  semester: number;
  subjectType: string;

  course: {
    id: number;
    courseName: string;
  };
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
      courseId: "",
      semester: "",
      subjectType: "",
    });

  /* FETCH SUBJECTS */

  const fetchSubjects =
    async () => {

      const response =
        await fetch(
          "/api/subjects"
        );

      const data =
        await response.json();

      setSubjects(
        Array.isArray(data)
          ? data
          : []
      );
    };

  /* FETCH COURSES */

  const fetchCourses =
    async () => {

      const response =
        await fetch(
          "/api/courses"
        );

      const data =
        await response.json();

      setCourses(
        Array.isArray(data)
          ? data
          : []
      );
    };

  useEffect(() => {

    fetchSubjects();
    fetchCourses();

  }, []);

  /* HANDLE INPUT */

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

  /* ADD SUBJECT */

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      const response =
        await fetch(
          "/api/subjects",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              subjectName:
                formData.subjectName,

              semester:
                Number(
                  formData.semester
                ),

              subjectType:
                formData.subjectType,

              courseId:
                Number(
                  formData.courseId
                ),

            }),
          }
        );

      if (response.ok) {

        alert(
          "Subject Added Successfully"
        );

        setFormData({

          subjectName: "",
          courseId: "",
          semester: "",
          subjectType: "",

        });

        fetchSubjects();
      }
    };

  /* DELETE SUBJECT */

  const deleteSubject =
    async (id: number) => {

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

  /* FILTER */

  const filteredSubjects =

    courseFilter === "ALL"

      ? subjects

      : subjects.filter(
          (subject) =>
            subject.course
              .courseName ===
            courseFilter
        );

  /* GROUP BY COURSE + SEMESTER */

  const groupedSubjects =
    filteredSubjects.reduce(

      (acc: any, subject) => {

        const courseName =
          subject.course.courseName;

        const semester =
          `Semester ${subject.semester}`;

        /* CREATE COURSE */

        if (!acc[courseName]) {

          acc[courseName] = {};
        }

        /* CREATE SEMESTER */

        if (
          !acc[courseName][semester]
        ) {

          acc[courseName][semester] =
            [];
        }

        /* PUSH SUBJECT */

        acc[courseName][semester]
          .push(subject);

        return acc;

      },

      {}

    );

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <main className="flex-1 p-6 transition-all duration-300 body-sidebar">

        <Navbar />

        <div className="space-y-8">

          {/* HEADER */}

          <div>

            <h1 className="text-5xl font-bold text-gray-900">

              Subject Management

            </h1>

            <p className="text-gray-500 mt-3 text-lg">

              Manage subjects course-wise and semester-wise

            </p>

          </div>

          {/* ADD SUBJECT */}

          <div className="bg-white rounded-3xl shadow-sm p-6 h-fit">

            <h2 className="text-3xl font-bold mb-8">

              Add Subject

            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-4 gap-6"
            >

              {/* SUBJECT NAME */}

              <input
                type="text"
                name="subjectName"
                placeholder="Subject Name"
                value={formData.subjectName}
                onChange={handleChange}
                className="border border-gray-200 p-4 rounded-2xl"
              />

              {/* COURSE */}

              <select
                name="courseId"
                value={formData.courseId}
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
                      value={course.id}
                    >

                      {course.courseName}

                    </option>
                  )
                )}

              </select>

              {/* SEMESTER */}

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

              {/* SUBJECT TYPE */}

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

              {/* BUTTON */}

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
                      course.courseName
                    }
                  >

                    {course.courseName}

                  </option>
                )
              )}

            </select>

          </div>

          {/* COURSE + SEMESTER VIEW */}

          {/* COURSE + SEMESTER VIEW */}

<div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">

  {Object.entries(
    groupedSubjects
  ).map(
    (
      [courseName, semesters]: any
    ) => (

      <div
        key={courseName}
        className="bg-white rounded-3xl shadow-sm p-6 h-fit"
      >

        {/* COURSE TITLE */}

        <h2 className="text-4xl font-bold text-blue-700 mb-10">

          {courseName}

        </h2>

        {/* SEMESTERS */}

        {Object.entries(
          semesters
        ).map(
          (
            [semester, subjects]: any
          ) => (

            <div
              key={semester}
              className="mb-10"
            >

              {/* SEMESTER TITLE */}

              <h3 className="text-2xl font-bold text-gray-700 mb-5">

                {semester}

              </h3>

              {/* SUBJECT TABLE */}

              <div className="overflow-hidden rounded-2xl border border-gray-200">

                {/* TABLE HEADER */}

                <div className="grid grid-cols-12 bg-gray-100 px-6 py-4 font-bold text-gray-700">

                  <div className="col-span-5">

                    Subject Name

                  </div>

                  <div className="col-span-3">

                    Type

                  </div>

                  <div className="col-span-4 text-right">

                    Action

                  </div>

                </div>

                {/* SUBJECT ROWS */}

                {subjects.map(
                  (
                    subject: Subject,
                    index: number
                  ) => (

                    <div
                      key={subject.id}
                      className={`grid grid-cols-12 px-6 py-5 items-center border-t border-gray-100 hover:bg-gray-50 transition ${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50/40"
                      }`}
                    >

                      {/* SUBJECT NAME */}

                      <div className="col-span-5 text-lg font-semibold text-gray-800">

                        {
                          subject.subjectName
                        }

                      </div>

                      {/* TYPE */}

                      <div className="col-span-3">

                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">

                          {
                            subject.subjectType
                          }

                        </span>

                      </div>

                      {/* ACTION */}

                      <div className="col-span-4 text-right">

                        <button
                          onClick={() =>
                            deleteSubject(
                              subject.id
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold transition"
                        >

                          Delete

                        </button>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>
          )
        )}

      </div>
    )
  )}

</div>

        </div>

      </main>

    </div>
  );
}