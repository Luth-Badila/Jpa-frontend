import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { images } from "../constants";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="fixed top-0 left-0 w-full bg-[#FFD700] p-4 flex justify-between items-center shadow-md z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={images.logo} alt="logo" className="lg:w-10 w-5" />
        <h1 className="lg:text-xl text-xs font-bold">Jalan Pintas Art</h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 font-medium cursor-pointer lg:text-xl text-sm">
        <li className="hover:text-white transition">
          <a href="#home">Home</a>
        </li>
        <li className="hover:text-white transition">
          <a href="#about">About</a>
        </li>
        <li className="hover:text-white transition">
          <a href="#contact">Contact</a>
        </li>
        <Link to="/how-to-order" className="hover:text-white transition">
          <a href="#contact">How to order</a>
        </Link>
      </ul>

      {/* Desktop Order */}
      <Link to="/order" className="hidden md:block">
        <img src={images.arrowLogo} alt="arrow-logo" className="lg:w-20 w-10" />
      </Link>

      {/* Hamburger (Mobile) */}
      <button className="md:hidden flex flex-col gap-1 z-50 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span className={`block w-6 h-0.5 bg-black transition-transform ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
        <span className={`block w-6 h-0.5 bg-black transition-opacity ${isOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`block w-6 h-0.5 bg-black transition-transform ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-2/3 h-full bg-[#FFD700] shadow-lg flex flex-col items-center justify-center gap-6 z-40"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
              }}
              className="flex flex-col gap-6 font-medium text-lg"
            >
              {["Home", "About", "Contact"].map((menu) => (
                <motion.li key={menu} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  <a href={`#${menu.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                    {menu}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Link to="/order" onClick={() => setIsOpen(false)}>
                <img src={images.arrowLogo} alt="arrow-logo" className="w-16" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
