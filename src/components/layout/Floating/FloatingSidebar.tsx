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
          width: open ? 115 : 55,
          height: open ? 250 : 55,
          opacity: open ? 1 : 0.95,
          scale: open ? 1 : 0.50,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 22,
          mass: 0.6,
        }}
        className="
          bg-gradient-to-b from-green-400 to-green-600 
          text-white shadow-xl 

          rounded-tr-[32px] rounded-bl-[32px] rounded-tl-[10px] rounded-br-[10px]
          py-5 px-2

          md:rounded-tr-[38px] md:rounded-bl-[38px] md:py-6 md:w-[125px]
          lg:rounded-tr-[40px] lg:rounded-bl-[40px] lg:py-7 lg:w-[150px]
          
          flex flex-col items-center 
          origin-right relative
        "
      >

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={
            open
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.8, y: 20 }
          }
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 18,
            delay: open ? 0.1 : 0,
          }}
          className={`flex flex-col gap-5 mt-2 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
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
            type: "spring",
            stiffness: 160,
            damping: 20,
          }}
          className="
            flex items-center justify-center cursor-pointer
            bg-white/20 backdrop-blur-sm text-white 
            border border-white/30 shadow-md 
            w-9 h-9 rounded-full mt-4 md:w-10 md:h-10 lg:w-11 lg:h-11
          "
        >
          <motion.span
            key={open ? "open" : "closed"}
            animate={{ rotate: open ? 0 : 180 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="text-white text-2xl font-bold flex items-center justify-center"
          >
            {open ? <FiChevronRight /> : <FiChevronLeft />}
          </motion.span>
        </motion.button>

      </motion.div>
    </motion.div>
  );
};

export default FloatingSidebar;
