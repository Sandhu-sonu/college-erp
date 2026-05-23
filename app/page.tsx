import Navbar from "../components/website/Navbar";
import Hero from "../components/website/Hero";
import Courses from "../components/website/Courses";
import About from "../components/website/About";
import Stats from "../components/website/Stats";
import Footer from "../components/website/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Courses />
      <About />
      <Stats />
      <Footer />
    </>
  );
}