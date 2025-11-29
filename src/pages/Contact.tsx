import { motion } from "motion/react";
// import { images } from "../constants";
import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <>
      <Navbar />

      <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-10">
          <div>
            <h1 className="text-4xl font-bold mb-4">Get in touch with us</h1>
            <p className="text-gray-600 text-lg">Biggest Blank Apparel And Custom T–shirt in Indonesia.</p>
          </div>

          {/* Image */}
          <motion.div className="relative w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.518726913619!2d112.5789235741143!3d-7.407694372945834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e3a6561026b3%3A0xae2c92cf5431a709!2sJalan%20Pintas%20sablon%20%26%20konveksi!5e0!3m2!1sen!2sid!4v1764125990950!5m2!1sen!2sid"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <a href="https://maps.app.goo.gl/PYdvqULpZkkTBpBL9" target="_blank" className="absolute inset-0 bg-transparent cursor-pointer" title="Klik untuk buka di Google Maps"></a>
          </motion.div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mt-20">
          {/* HQ */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Jalan Pintas</h2>
            <p className="font-semibold mb-2">Contact Info</p>
            <div className="border-t border-gray-300 my-3 w-1/2"></div>
            <p className="text-gray-700">0859 6416 8620</p>
          </div>

          {/* Address */}
          <div>
            <h2 className="font-semibold mb-2">Address</h2>
            <div className="border-t border-gray-300 my-3 w-1/2"></div>
            <p className="text-gray-700 leading-relaxed">
              Gresikan RT 08/ RW 02, Krian, Kemasan
              <br />
              Kecamatan Krian
              <br />
              Kabupaten Sidoarjo
              <br />
              Provinsi Jawa Timur
            </p>
          </div>

          {/* Socials */}
          <div>
            <h2 className="font-semibold mb-2">We are on Socials</h2>
            <div className="border-t border-gray-300 my-3 w-1/2"></div>

            <div className="flex items-center gap-6 text-gray-800 text-lg">
              <a href="#" className="flex items-center gap-2 hover:text-black transition">
                Tiktok
              </a>

              <a href="#" className="flex items-center gap-2 hover:text-black transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
