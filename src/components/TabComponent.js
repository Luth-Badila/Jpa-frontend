import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function Tabs({ tabs, defaultIndex = 0 }) {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    return (_jsxs("div", { className: "w-full", children: [_jsx("div", { className: "flex border-b border-gray-300", children: tabs.map((tab, idx) => (_jsx("button", { onClick: () => setActiveIndex(idx), className: `px-4 py-2 -mb-px text-sm font-medium transition-colors duration-200 
                cursor-pointer
              ${activeIndex === idx ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500"}`, children: tab.label }, idx))) }), _jsx("div", { className: "p-4 min-h-[100px]", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 }, transition: { duration: 0.3 }, className: "w-full", children: tabs[activeIndex].content }, activeIndex) }) })] }));
}
