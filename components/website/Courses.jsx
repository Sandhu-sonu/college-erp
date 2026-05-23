export default function Courses() {
  const courses = [
    "BA",
    "BCA",
    "BCOM",
    "PGDCA",
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-12">
          Our Courses
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-semibold text-blue-700">
                {course}
              </h3>

              <p className="mt-4 text-gray-600">
                Professional degree program with modern curriculum.
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}