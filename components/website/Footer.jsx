export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-bold mb-4">
            College ERP
          </h2>

          <p className="text-gray-300">
            Empowering students with quality education and modern learning.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-300">
            <li>Home</li>
            <li>About</li>
            <li>Courses</li>
            <li>Admissions</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <p className="text-gray-300">
            Punjab, India
          </p>

          <p className="text-gray-300 mt-2">
            info@college.com
          </p>
        </div>

      </div>

      <div className="text-center text-gray-400 mt-10">
        © 2026 College ERP. All rights reserved.
      </div>
    </footer>
  );
}