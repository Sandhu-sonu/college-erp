import Navbar from "@/components/website/Navbar";

import Footer from "@/components/website/Footer";

import Link from "next/link";



const courses = [

  {

    id: 1,

    name: "Bachelor of Computer Applications",

    short: "BCA",

    duration: "3 Years",

    eligibility: "10+2 with any stream",

    description:
      "Learn programming, software development, databases, networking and modern IT technologies.",

    subjects: [

      "Programming",

      "DBMS",

      "Web Development",

      "Networking",

    ],

  },

  {

    id: 2,

    name: "Bachelor of Commerce",

    short: "BCOM",

    duration: "3 Years",

    eligibility: "10+2 Commerce or equivalent",

    description:
      "Build strong knowledge in accounting, taxation, finance and business management.",

    subjects: [

      "Accounts",

      "Economics",

      "Business Law",

      "Taxation",

    ],

  },

  {

    id: 3,

    name: "Bachelor of Arts",

    short: "BA",

    duration: "3 Years",

    eligibility: "10+2 from recognized board",

    description:
      "Study humanities and social sciences with multiple elective options.",

    subjects: [

      "History",

      "Political Science",

      "Punjabi",

      "English",

    ],

  },

];



export default function CoursesPage() {

  return (

    <div className="bg-gray-50 min-h-screen">

      <Navbar />



      {/* HERO SECTION */}

      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold mb-6">

            Our Courses

          </h1>



          <p className="text-xl text-blue-100 max-w-3xl mx-auto">

            Explore industry-focused academic programs designed to build successful careers and future opportunities.

          </p>

        </div>

      </section>



      {/* COURSE SECTION */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">

          {courses.map((course) => (

            <div
              key={course.id}

              className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >

              {/* TOP */}

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">

                <h2 className="text-4xl font-bold">

                  {course.short}

                </h2>



                <p className="mt-2 text-blue-100">

                  {course.name}

                </p>

              </div>



              {/* BODY */}

              <div className="p-8 space-y-6">

                <div className="flex justify-between">

                  <div>

                    <p className="text-gray-500 text-sm">

                      Duration

                    </p>



                    <h3 className="font-bold text-gray-800">

                      {course.duration}

                    </h3>

                  </div>



                  <div>

                    <p className="text-gray-500 text-sm">

                      Eligibility

                    </p>



                    <h3 className="font-bold text-gray-800">

                      10+2

                    </h3>

                  </div>

                </div>



                <p className="text-gray-600 leading-7">

                  {course.description}

                </p>



                {/* SUBJECT TAGS */}

                <div>

                  <h4 className="font-bold text-gray-800 mb-3">

                    Key Subjects

                  </h4>



                  <div className="flex flex-wrap gap-2">

                    {course.subjects.map(

                      (subject, index) => (

                        <span
                          key={index}

                          className="bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-sm font-medium"
                        >

                          {subject}

                        </span>

                      )

                    )}

                  </div>

                </div>



                {/* BUTTONS */}

                <div className="flex gap-3 pt-4">

                  <Link
                    href="/admissions"

                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-2xl font-semibold"
                  >

                    Apply Now

                  </Link>



                  <button
                    className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 px-5 rounded-2xl font-semibold transition"
                  >

                    Details

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>



      {/* CTA */}

      <section className="bg-blue-700 text-white py-20">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold mb-6">

            Admissions Open 2026

          </h2>



          <p className="text-xl text-blue-100 mb-8">

            Start your academic journey with modern education, experienced faculty and career-focused programs.

          </p>



          <Link
            href="/admissions"

            className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold inline-block"
          >

            Apply For Admission

          </Link>

        </div>

      </section>



      <Footer />

    </div>

  );

}
