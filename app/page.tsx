import Navbar from "@/components/website/Navbar";

import Footer from "@/components/website/Footer";

import Link from "next/link";



const courses = [

  {

    name: "BCA",

    description:
      "Computer Applications & Software Development",

  },

  {

    name: "BCOM",

    description:
      "Commerce, Finance & Accounting",

  },

  {

    name: "BA",

    description:
      "Humanities & Social Sciences",

  },

];



const features = [

  "Smart Classrooms",

  "Experienced Faculty",

  "Digital Library",

  "Placement Assistance",

  "Modern Computer Labs",

  "Sports & Cultural Activities",

];



export default function HomePage() {

  return (

    <div className="bg-gray-50 min-h-screen">

      <Navbar />



      {/* HERO SECTION */}

      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-28">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}

          <div>

            <p className="bg-white/20 inline-block px-5 py-2 rounded-full mb-6">

              Admissions Open 2026

            </p>



            <h1 className="text-6xl font-bold leading-tight">

              Empowering Future Leaders Through Education

            </h1>



            <p className="text-xl text-blue-100 mt-8 leading-8">

              Join our institution for quality education, modern infrastructure and career-focused academic programs.

            </p>



            <div className="flex gap-4 mt-10">

              <Link
                href="/admissions"

                className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold"
              >

                Apply Now

              </Link>



              <Link
                href="/courses"

                className="border border-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-2xl font-bold transition"
              >

                Explore Courses

              </Link>

            </div>

          </div>



          {/* RIGHT */}

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20">

            <div className="grid grid-cols-2 gap-6">

              <div className="bg-white rounded-2xl p-6 text-center">

                <h2 className="text-4xl font-bold text-blue-700">

                  5000+

                </h2>



                <p className="text-gray-600 mt-2">

                  Students

                </p>

              </div>



              <div className="bg-white rounded-2xl p-6 text-center">

                <h2 className="text-4xl font-bold text-blue-700">

                  50+

                </h2>



                <p className="text-gray-600 mt-2">

                  Faculty

                </p>

              </div>



              <div className="bg-white rounded-2xl p-6 text-center">

                <h2 className="text-4xl font-bold text-blue-700">

                  100%

                </h2>



                <p className="text-gray-600 mt-2">

                  Placement Support

                </p>

              </div>



              <div className="bg-white rounded-2xl p-6 text-center">

                <h2 className="text-4xl font-bold text-blue-700">

                  NAAC

                </h2>



                <p className="text-gray-600 mt-2">

                  Accredited

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-gray-900">

            Why Choose Us

          </h2>



          <p className="text-gray-500 mt-5 text-xl">

            We provide modern education with excellent campus facilities.

          </p>

        </div>



        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}

              className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition p-10 text-center border border-gray-100"
            >

              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">

                <span className="text-3xl">

                  🎓

                </span>

              </div>



              <h3 className="text-2xl font-bold text-gray-800">

                {feature}

              </h3>

            </div>

          ))}

        </div>

      </section>



      {/* COURSES */}

      <section className="bg-white py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-between items-center mb-16">

            <div>

              <h2 className="text-5xl font-bold text-gray-900">

                Popular Courses

              </h2>



              <p className="text-gray-500 mt-4 text-xl">

                Industry-oriented programs for bright careers

              </p>

            </div>



            <Link
              href="/courses"

              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold"
            >

              View All Courses

            </Link>

          </div>



          <div className="grid md:grid-cols-3 gap-8">

            {courses.map((course, index) => (

              <div
                key={index}

                className="border border-gray-100 rounded-3xl p-10 hover:shadow-xl transition"
              >

                <h3 className="text-4xl font-bold text-blue-700">

                  {course.name}

                </h3>



                <p className="text-gray-600 mt-6 leading-8">

                  {course.description}

                </p>



                <Link
                  href="/courses"

                  className="inline-block mt-8 text-blue-700 font-bold"
                >

                  Learn More →

                </Link>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* CTA */}

      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-24">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold mb-8">

            Begin Your Academic Journey Today

          </h2>



          <p className="text-xl text-blue-100 leading-8 mb-10">

            Admissions are now open for the upcoming academic session. Apply now and secure your future with quality education.

          </p>



          <Link
            href="/admissions"

            className="bg-white text-blue-700 hover:bg-gray-100 px-10 py-5 rounded-2xl font-bold text-lg"
          >

            Apply For Admission

          </Link>

        </div>

      </section>



      <Footer />

    </div>

  );

}