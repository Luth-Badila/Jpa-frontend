import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { images } from "../../../constants";
import { FloatingSidebarItem } from "../../FloatingSidebarItems";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const FloatingSidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [size, setSize] = useState<"mobile" | "tablet" | "desktop">("desktop");

  // Detect window size
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) setSize("mobile");
      else if (window.innerWidth < 1024) setSize("tablet");
      else setSize("desktop");          
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Dynamic size per breakpoint
  const sidebarSize = {
    mobile: { w: 65, h: 180, scale: 0.85 },
    tablet: { w: 100, h: 210, scale: 0.9 },
    desktop: { w: 110, h: 250, scale: 1 },
  };

  const current = sidebarSize[size];

  return (
    <motion.div className={`fixed lg:bottom-10 bottom-1 z-50 ${open ? "lg:right-5 right-2" : "right-0"}`}>

      {/* SIDEBAR WRAPPER */}
      <motion.div
        animate={{
          width: open ? current.w : current.w * 0.45,
          height: open ? current.h : current.h * 0.25,
          opacity: open ? 1 : 0.95,
          scale: open ? current.scale : current.scale * 0.65,
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
          py-5 px-2 flex flex-col items-center origin-right relative
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
          style={{
            zoom:
              size === "mobile" ? 0.8 :
              size === "tablet" ? 0.9 :
              1,
          }}
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
            rounded-full mt-4
          "
          style={{
            width: size === "mobile" ? 34 : size === "tablet" ? 38 : 44,
            height: size === "mobile" ? 34 : size === "tablet" ? 38 : 44,
          }}
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
            style={{
              fontSize: size === "mobile" ? "18px" : size === "tablet" ? "20px" : "24px",
            }}
          >
            {open ? <FiChevronRight /> : <FiChevronLeft />}
          </motion.span>
        </motion.button>

      </motion.div>
    </motion.div>
  );
};

export default FloatingSidebar;
