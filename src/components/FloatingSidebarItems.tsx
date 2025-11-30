import { SidebarItemProps } from "../types";
import { motion } from "motion/react";

export const FloatingSidebarItem: React.FC<SidebarItemProps> = ({ icon, label }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center gap-1 cursor-pointer"
    >
      <img src={icon} alt={label} className="w-6 h-6 object-contain" />
      <p className="text-[10px]">{label}</p>
    </motion.div>
  );
};