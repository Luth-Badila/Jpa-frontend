import { motion } from "motion/react"

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#FFD700] p-4 flex justify-between items-center shadow-md"
    >
      <h1 className="text-xl font-bold">Jalan Pintas Art</h1>
      <ul className="flex gap-6 font-medium cursor-pointer">
        <li className="hover:text-white transition">Home</li>
        <li className="hover:text-white transition">Menu</li>
        <li className="hover:text-white transition">Contact</li>
      </ul>
    </motion.nav>
  );
}
