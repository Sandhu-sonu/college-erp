import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <section className="py-20 bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto px-4">

          <h1 className="text-5xl font-bold text-blue-700 mb-10 text-center">
            Contact Us
          </h1>

          <div className="bg-white p-10 rounded-2xl shadow-md grid md:grid-cols-2 gap-10">

            <div>
              <h2 className="text-2xl font-bold mb-6">
                College Information
              </h2>

              <p className="text-gray-600 mb-4">
                Punjab, India
              </p>

              <p className="text-gray-600 mb-4">
                +91 9876543210
              </p>

              <p className="text-gray-600">
                info@college.com
              </p>
            </div>

            <form className="space-y-6">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 border rounded-lg"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 border rounded-lg"
              />

              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full p-4 border rounded-lg"
              />

              <button
                className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}