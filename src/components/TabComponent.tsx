import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type TabsProps } from "../types";

export default function TabComponent({ tabs, defaultIndex = 0 }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`px-4 py-2 -mb-px text-sm font-medium transition-colors duration-200 
                cursor-pointer
              ${activeIndex === idx ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content with Animation */}
      <div className="p-4 min-h-[100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex} // penting biar animasi jalan saat ganti tab
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {tabs[activeIndex].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
