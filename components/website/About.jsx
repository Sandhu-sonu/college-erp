export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-4xl font-bold text-blue-700 mb-6">
            About Our College
          </h2>

          <p className="text-gray-600 leading-8">
            Our college is committed to providing quality education
            with modern teaching methods, experienced faculty,
            and career-oriented programs. We focus on academic
            excellence and overall student development.
          </p>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585"
            alt="College"
            className="rounded-2xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}