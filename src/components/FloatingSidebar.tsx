import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { images } from "../constants";
import { SidebarItemProps } from "../types";

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label }) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center gap-1 cursor-pointer">
      <img src={icon} alt={label} className="w-6 h-6 object-contain" />
      <p className="text-xs">{label}</p>
    </motion.div>
  );
};

const FloatingSidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="fixed bottom-10 right-0 z-50">
      <motion.div
        animate={{ width: open ? 160 : 40 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="bg-gradient-to-b from-green-900 to-green-700 text-white 
                   rounded-l-3xl py-6 flex flex-col items-center 
                   shadow-xl relative overflow-hidden"
      >
        {/* BUTTON TOGGLE */}
        <motion.button
          onClick={() => setOpen(!open)}
          className="absolute -left-4 top-1/2 -translate-y-1/2 bg-green-900 
                     w-8 h-8 rounded-full flex items-center justify-center shadow-md"
          animate={{ rotate: open ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <img src={open ? images.rightArrow : images.leftArrow} alt="toggle" className="w-5 h-5" />
        </motion.button>

        {/* CONTENT WITH ANIMATION */}
        <AnimatePresence>
          {open && (
            <motion.div key="content" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} transition={{ duration: 0.3, ease: "easeOut" }} className="flex flex-col gap-6 mt-4">
              <SidebarItem icon={images.igLogo} label="Instagram" />
              <SidebarItem icon={images.whatsappLogo} label="WhatsApp" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default FloatingSidebar;
