import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { images } from "../constants";
import { type NavbarProps } from "../types";

export default function Navbar({ mode = "home" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Menu untuk homepage
  const homeMenus = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Product", href: "/", isRoute: true },
    { label: "How to order", href: "/", isRoute: true },
  ];

  // Menu untuk halaman order (full route)
  const orderMenus = [
    { label: "Home", href: "/", isRoute: true },
    { label: "About", href: "/", isRoute: true },
    { label: "Contact", href: "/", isRoute: true },
    { label: "Product", href: "/", isRoute: true },
    { label: "How to order", href: "/", isRoute: true },
  ];

  const menus = mode === "home" ? homeMenus : orderMenus;

  return (
    <motion.nav initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="fixed top-0 left-0 w-full bg-[#FFD700] p-4 flex justify-between items-center shadow-md z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={images.logo} alt="logo" className="lg:w-10 w-5" />
        <h1 className="lg:text-xl text-xs font-bold">Jalan Pintas Art</h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 font-medium cursor-pointer lg:text-xl text-sm">
        {menus.map((menu) =>
          menu.isRoute ? (
            <Link key={menu.label} to={menu.href} className="hover:text-white transition">
              {menu.label}
            </Link>
          ) : (
            <a key={menu.label} href={menu.href} className="hover:text-white transition">
              {menu.label}
            </a>
          )
        )}
      </ul>

      {/* Desktop Order Icon */}
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
              {menus.map((menu) =>
                menu.isRoute ? (
                  <motion.li
                    key={menu.label}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link to={menu.href} onClick={() => setIsOpen(false)}>
                      {menu.label}
                    </Link>
                  </motion.li>
                ) : (
                  <motion.li
                    key={menu.label}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <a href={menu.href} onClick={() => setIsOpen(false)}>
                      {menu.label}
                    </a>
                  </motion.li>
                )
              )}
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
