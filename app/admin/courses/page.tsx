"use client";

import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";

import Link from "next/link";

import {

  useEffect,

  useState,

} from "react";



interface Course {

  id: number;

  name: string;

  duration: string;

  semesters: number;

  subjects: string[];

}



const initialCourses: Course[] = [

  {

    id: 1,

    name: "BCA",

    duration: "3 Years",

    semesters: 6,

    subjects: [

      "Programming",

      "DBMS",

      "Networking",

      "Data Structures",

    ],

  },

  {

    id: 2,

    name: "BCOM",

    duration: "3 Years",

    semesters: 6,

    subjects: [

      "Accounts",

      "Economics",

      "Taxation",

      "Business Law",

    ],

  },

  {

    id: 3,

    name: "BA",

    duration: "3 Years",

    semesters: 6,

    subjects: [

      "History",

      "Political Science",

      "Punjabi",

      "English",

    ],

  },

];



export default function CoursesPage() {

  const [courses, setCourses] =
    useState<Course[]>([]);



  const [showModal, setShowModal] =
    useState(false);



  const [courseName, setCourseName] =
    useState("");



  const [duration, setDuration] =
    useState("3 Years");



  const [semesters, setSemesters] =
    useState(6);



  /* LOAD COURSES */

  useEffect(() => {

    const savedCourses =
      localStorage.getItem(
        "courses"
      );



    if (savedCourses) {

      setCourses(
        JSON.parse(savedCourses)
      );

    } else {

      setCourses(
        initialCourses
      );



      localStorage.setItem(

        "courses",

        JSON.stringify(
          initialCourses
        )

      );

    }

  }, []);



  /* SAVE COURSES */

  useEffect(() => {

    if (courses.length > 0) {

      localStorage.setItem(

        "courses",

        JSON.stringify(courses)

      );

    }

  }, [courses]);



  /* ADD COURSE */

  const addCourse = () => {

    if (!courseName) {

      alert("Enter course name");

      return;

    }



    const newCourse: Course = {

      id: Date.now(),

      name: courseName,

      duration,

      semesters,

      subjects: [],

    };



    setCourses([

      ...courses,

      newCourse,

    ]);



    setCourseName("");



    setDuration("3 Years");



    setSemesters(6);



    setShowModal(false);

  };



  /* DELETE COURSE */

  const deleteCourse = (

    id: number

  ) => {

    const confirmDelete =
      confirm(

        "Delete this course?"

      );



    if (!confirmDelete)
      return;



    const updatedCourses =
      courses.filter(

        (course) =>
          course.id !== id

      );



    setCourses(updatedCourses);

  };



  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />



      <main className="flex-1 ml-72 p-6">

        <Navbar />



        <div className="space-y-8">

          {/* HEADER */}

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-5xl font-bold text-gray-900">

                Course Management

              </h1>



              <p className="text-gray-500 mt-3 text-lg">

                Manage academic courses and subjects

              </p>

            </div>



            <button

              onClick={() =>
                setShowModal(true)
              }

              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-2xl font-bold shadow-lg"
            >

              + Add Course

            </button>

          </div>



          {/* COURSE CARDS */}

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

            {courses.map((course) => (

              <div
                key={course.id}

                className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >

                {/* TOP */}

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">

                  <h2 className="text-5xl font-bold">

                    {course.name}

                  </h2>



                  <p className="mt-3 text-blue-100 text-lg">

                    {course.duration}

                  </p>

                </div>



                {/* BODY */}

                <div className="p-8 space-y-6">

                  {/* STATS */}

                  <div className="flex gap-4">

                    <div className="bg-blue-50 rounded-2xl flex-1 p-5 text-center">

                      <p className="text-gray-500">

                        Semesters

                      </p>



                      <h3 className="text-3xl font-bold text-blue-700 mt-2">

                        {course.semesters}

                      </h3>

                    </div>



                    <div className="bg-green-50 rounded-2xl flex-1 p-5 text-center">

                      <p className="text-gray-500">

                        Subjects

                      </p>



                      <h3 className="text-3xl font-bold text-green-700 mt-2">

                        {
                          course.subjects
                            .length
                        }

                      </h3>

                    </div>

                  </div>



                  {/* SUBJECT TAGS */}

                  <div>

                    <h3 className="font-bold text-gray-800 mb-4 text-lg">

                      Main Subjects

                    </h3>



                    <div className="flex flex-wrap gap-2">

                      {course.subjects
                        .length > 0 ? (

                        course.subjects.map(

                          (
                            subject,
                            index
                          ) => (

                            <span
                              key={index}

                              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium"
                            >

                              {
                                subject
                              }

                            </span>

                          )

                        )

                      ) : (

                        <p className="text-gray-400">

                          No subjects added

                        </p>

                      )}

                    </div>

                  </div>



                  {/* ACTIONS */}

                  <div className="flex gap-3 pt-4">

                    <Link
                      href={`/admin/subjects?course=${course.name}`}

                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-2xl font-semibold"
                    >

                      Manage Subjects

                    </Link>



                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 rounded-2xl font-semibold"
                    >

                      Edit

                    </button>



                    <button

                      onClick={() =>
                        deleteCourse(
                          course.id
                        )
                      }

                      className="bg-red-600 hover:bg-red-700 text-white px-5 rounded-2xl font-semibold"
                    >

                      Delete

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>



        {/* MODAL */}

        {showModal && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-8 w-full max-w-lg">

              <h2 className="text-3xl font-bold mb-8">

                Add Course

              </h2>



              <div className="space-y-5">

                <input
                  type="text"

                  placeholder="Course Name"

                  value={courseName}

                  onChange={(e) =>
                    setCourseName(
                      e.target.value
                    )
                  }

                  className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600"
                />



                <select

                  value={duration}

                  onChange={(e) =>
                    setDuration(
                      e.target.value
                    )
                  }

                  className="w-full border border-gray-200 p-4 rounded-2xl"
                >

                  <option>

                    1 Year

                  </option>



                  <option>

                    2 Years

                  </option>



                  <option>

                    3 Years

                  </option>



                  <option>

                    4 Years

                  </option>

                </select>



                <select

                  value={semesters}

                  onChange={(e) =>
                    setSemesters(
                      Number(
                        e.target.value
                      )
                    )
                  }

                  className="w-full border border-gray-200 p-4 rounded-2xl"
                >

                  <option value={2}>

                    2 Semesters

                  </option>



                  <option value={4}>

                    4 Semesters

                  </option>



                  <option value={6}>

                    6 Semesters

                  </option>



                  <option value={8}>

                    8 Semesters

                  </option>

                </select>

              </div>



              {/* BUTTONS */}

              <div className="flex gap-4 mt-8">

                <button

                  onClick={addCourse}

                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold"
                >

                  Save Course

                </button>



                <button

                  onClick={() =>
                    setShowModal(false)
                  }

                  className="flex-1 bg-gray-200 hover:bg-gray-300 py-4 rounded-2xl font-bold"
                >

                  Cancel

                </button>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>

  );

}