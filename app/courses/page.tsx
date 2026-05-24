import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";

export default function CoursesPage() {
  const courses = [
    "BA",
    "BCA",
    "BCOM",
    "PGDCA",
  ];

  return (
    <>
      <Navbar />

      <section className="py-20 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">

          <h1 className="text-5xl font-bold text-blue-700 mb-12 text-center">
            Our Courses
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <h2 className="text-2xl font-bold text-blue-700 mb-4">
                  {course}
                </h2>

                <p className="text-gray-600">
                  Industry-oriented curriculum with experienced faculty
                  and practical learning approach.
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}