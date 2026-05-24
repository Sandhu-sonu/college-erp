import Navbar from "../../components/website/Navbar";
import Footer from "../../components/website/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <section className="py-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4">

          <h1 className="text-5xl font-bold text-blue-700 mb-8">
            About Our College
          </h1>

          <p className="text-gray-700 leading-8 text-lg">
            Our college is committed to delivering quality education,
            skill development, and overall student growth through
            experienced faculty and modern teaching methods.
          </p>

        </div>
      </section>

      <Footer />
    </>
  );
}