import { useState } from "react";
import { motion } from "motion/react";
import { images } from "../../../constants";
import { FloatingSidebarItem } from "../../FloatingSidebarItems";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const FloatingSidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <motion.div className={`fixed bottom-10 z-50 ${open ? "right-5" : "right-0"}`}>
      {/* SIDEBAR WRAPPER */}
      <motion.div
        animate={{
          width: open ? 100 : 50,
          scale: open ? 1 : 0.55,
          opacity: open ? 1 : 0.95,
        }}
        transition={{
          duration: 0.45,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="
          bg-gradient-to-b from-green-400 to-green-600 
          text-white shadow-xl 
          rounded-tr-[40px] rounded-bl-[40px] rounded-tl-[10px] rounded-br-[10px]
          py-6 px-2 flex flex-col items-center 
          origin-right relative
        "
      >
        {/* CONTENT (Hilang saat mengecil) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={open ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
            delay: open ? 0.1 : 0,
          }}
          className={`flex flex-col gap-6 mt-2 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <FloatingSidebarItem icon={images.igLogo} label="Instagram" />
          <FloatingSidebarItem icon={images.whatsappLogo} label="WhatsApp" />
        </motion.div>

        {/* TOGGLE BUTTON */}
        <motion.button
          onClick={() => setOpen(!open)}
          animate={{
            position: open ? "relative" : "absolute",
            bottom: open ? 0 : "50%",
            left: open ? 0 : "50%",
            x: open ? 0 : "-50%",
            y: open ? 0 : "50%",
          }}
          transition={{
            duration: 0.45,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className={`w-10 h-10 
            bg-white/20 backdrop-blur-sm text-white 
            rounded-full border border-white/30 
            shadow-md flex items-center justify-center cursor-pointer 
            ${open ? "mt-[24px]" : "mt-0"}`}
        >
          <motion.span key={open ? "open" : "closed"} transition={{ duration: 0.35 }} className="text-white text-2xl font-bold flex items-center justify-center">
            {open ? <FiChevronRight color="white" /> : <FiChevronLeft color="white" />}
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default FloatingSidebar;
