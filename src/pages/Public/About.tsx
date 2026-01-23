import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import AboutSection from "../../components/layout/About/AboutSection";
import { usePageMeta } from "../../hooks/usePageMeta";

function About() {
  usePageMeta({
    title: "Jalan Pintas - About",
    description: "Produk sablon Jalan Pintas Art.",
  });
  return (
    <>
      <Navbar />
      <AboutSection />
      <Footer />
    </>
  );
}

export default About;
