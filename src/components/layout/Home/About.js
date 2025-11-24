import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "motion/react";
function About() {
    return (_jsx(motion.div, { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.5
        }, className: "flex flex-col justify-center items-center py-5", children: _jsx("h1", { className: "text-2xl uppercase", children: "Kami melayani penyablonan dan pembordiran, satuan maupun grosir" }) }));
}
export default About;
