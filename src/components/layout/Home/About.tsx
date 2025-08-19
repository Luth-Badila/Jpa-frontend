import { motion } from "motion/react";

function About() {
  return (
    <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5
  
     }} className="flex flex-col justify-center items-center py-5">
      <h1 className="text-2xl uppercase">Kami melayani penyablonan dan pembordiran, satuan maupun grosir</h1>
    </motion.div>
  );
}

export default About;
