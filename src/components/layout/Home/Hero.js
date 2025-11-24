import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { images } from "../../../constants";
const leftInfoVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};
const middleImageVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, delayChildren: 0.5 },
    },
};
const circleBgVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 1, ease: "easeInOut" } },
};
const scaleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: [0, 1],
        opacity: [0, 1],
        transition: { duration: 1, ease: "easeInOut" },
    },
};
export default function Hero() {
    return (_jsxs("div", { id: "home", className: "relative flex flex-col lg:flex-row w-full h-auto bg-cover bg-center px-4 sm:px-6 lg:px-12 py-18 lg:py-40", children: [_jsx("img", { src: images.bgImgGreen, alt: "background", className: "absolute inset-0 w-full h-full object-cover z-0" }), _jsx(motion.div, { variants: leftInfoVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "flex flex-col items-start justify-center z-10", children: _jsxs("div", { className: "flex flex-col items-start lg:w-full w-[70%] space-y-8 sm:space-y-10 lg:space-y-12", children: [_jsxs("div", { className: "flex lg:w-[300px] items-center bg-yellow-400 rounded-xl shadow-md px-4 \r\n          sm:px-6 py-3 sm:py-4", children: [_jsx("span", { className: "lg:text-3xl sm:text-4xl", children: "\uD83D\uDC4B" }), _jsxs("div", { className: "ml-4 sm:ml-5", children: [_jsx("p", { className: "text-gray-800 lg:text-2xl", children: "Hello, we are" }), _jsx("h1", { className: "text-black font-bold lg:text-3xl", children: "Jalan Pintas Art" })] })] }), _jsxs("div", { className: "flex flex-col bg-yellow-400 rounded-xl shadow-md px-4 sm:px-6 py-3 sm:py-4 uppercase text-left sm:text-right", children: [_jsx("p", { className: "text-black text-base", children: "Sablon" }), _jsx("p", { className: "text-black text-base", children: "Berkualitas" })] }), _jsxs("div", { className: "flex items-center gap-2 bg-yellow-400 rounded-xl shadow-md px-4 \r\n          sm:px-6 py-3 sm:py-4", children: [_jsx("p", { className: "text-black font-semibold text-base", children: "Harga" }), _jsx("p", { className: "text-black font-semibold text-base", children: "Merakyat \uD83D\uDC4D" })] })] }) }), _jsxs(motion.div, { variants: middleImageVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "flex justify-center items-center relative z-10 my-20 lg:my-0", children: [_jsx("img", { src: images.bajuPutih, alt: "baju", className: "w-[300px] md:w-[450px] lg:w-[60%] object-contain z-10" }), _jsx(motion.img, { variants: circleBgVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, src: images.yellowCircle, alt: "circle", className: "absolute w-[80%] h-[400px] lg:w-[500px] lg:h-full lg:left-27 lg:right-0 lg:bottom-0 z-0" })] }), _jsxs(motion.div, { variants: scaleVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "flex flex-row lg:flex-col justify-center lg:justify-evenly items-center \r\n        lg:items-start flex-1 gap-4 sm:gap-6 lg:gap-8 z-10 lg:ml-15 ml-0 lg:mt-0 mt-5", children: [_jsx("div", { className: "w-[70px] sm:w-[90px] lg:w-[100px] h-[70px] sm:h-[90px] lg:h-[100px] rounded-full bg-white shadow-md flex justify-center items-center", children: _jsx("img", { src: images.bag, alt: "circle", className: "w-[60%] h-[60%]" }) }), _jsx("div", { className: "w-[110px] sm:w-[130px] lg:w-[150px] h-[110px] sm:h-[130px] lg:h-[150px] rounded-full bg-white shadow-md flex justify-center items-center", children: _jsx("img", { src: images.hoodie, alt: "circle", className: "w-[60%] h-[60%]" }) }), _jsx("div", { className: "w-[60px] sm:w-[70px] lg:w-[80px] h-[60px] sm:h-[70px] lg:h-[80px] rounded-full bg-white shadow-md flex justify-center items-center", children: _jsx("img", { src: images.kaos, alt: "circle", className: "w-[60%] h-[60%]" }) })] })] }));
}
