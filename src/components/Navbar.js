import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { images } from "../constants";
export default function Navbar({ mode = "home" }) {
    const [isOpen, setIsOpen] = useState(false);
    // Menu untuk homepage
    const homeMenus = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
        { label: "Product", href: "/product", isRoute: true },
        { label: "How to order", href: "/how-to-order", isRoute: true },
    ];
    // Menu untuk halaman order (full route)
    const orderMenus = [
        { label: "Home", href: "/", isRoute: true },
        { label: "About", href: "/about", isRoute: true },
        { label: "Contact", href: "/contact", isRoute: true },
        { label: "Product", href: "/product", isRoute: true },
        { label: "How to order", href: "/how-to-order", isRoute: true },
    ];
    const menus = mode === "home" ? homeMenus : orderMenus;
    return (_jsxs(motion.nav, { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.5 }, className: "fixed top-0 left-0 w-full bg-[#FFD700] p-4 flex justify-between items-center shadow-md z-50", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: images.logo, alt: "logo", className: "lg:w-10 w-5" }), _jsx("h1", { className: "lg:text-xl text-xs font-bold", children: "Jalan Pintas Art" })] }), _jsx("ul", { className: "hidden md:flex gap-6 font-medium cursor-pointer lg:text-xl text-sm", children: menus.map((menu) => menu.isRoute ? (_jsx(Link, { to: menu.href, className: "hover:text-white transition", children: menu.label }, menu.label)) : (_jsx("a", { href: menu.href, className: "hover:text-white transition", children: menu.label }, menu.label))) }), _jsx(Link, { to: "/order", className: "hidden md:block", children: _jsx("img", { src: images.arrowLogo, alt: "arrow-logo", className: "lg:w-20 w-10" }) }), _jsxs("button", { className: "md:hidden flex flex-col gap-1 z-50 cursor-pointer", onClick: () => setIsOpen(!isOpen), children: [_jsx("span", { className: `block w-6 h-0.5 bg-black transition-transform ${isOpen ? "rotate-45 translate-y-1.5" : ""}` }), _jsx("span", { className: `block w-6 h-0.5 bg-black transition-opacity ${isOpen ? "opacity-0" : "opacity-100"}` }), _jsx("span", { className: `block w-6 h-0.5 bg-black transition-transform ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}` })] }), _jsx(AnimatePresence, { children: isOpen && (_jsxs(motion.div, { initial: { x: "100%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "100%", opacity: 0 }, transition: { duration: 0.4, ease: "easeInOut" }, className: "fixed top-0 right-0 w-2/3 h-full bg-[#FFD700] shadow-lg flex flex-col items-center justify-center gap-6 z-40", children: [_jsx(motion.ul, { initial: "hidden", animate: "visible", variants: {
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                                },
                            }, className: "flex flex-col gap-6 font-medium text-lg", children: menus.map((menu) => menu.isRoute ? (_jsx(motion.li, { variants: {
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }, children: _jsx(Link, { to: menu.href, onClick: () => setIsOpen(false), children: menu.label }) }, menu.label)) : (_jsx(motion.li, { variants: {
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }, children: _jsx("a", { href: menu.href, onClick: () => setIsOpen(false), children: menu.label }) }, menu.label))) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, children: _jsx(Link, { to: "/order", onClick: () => setIsOpen(false), children: _jsx("img", { src: images.arrowLogo, alt: "arrow-logo", className: "w-16" }) }) })] }, "menu")) })] }));
}
