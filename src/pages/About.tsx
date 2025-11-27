import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import { supabase } from "../api/supabaseClient";

interface AboutSection {
  id: number;
  title: string;
  image: string;
  description: string;
}

export default function About() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    const { data, error } = await supabase.from("about_section").select("*").order("id", { ascending: true });

    if (error) console.error(error);
    else setSections(data);

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <motion.section 
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="flex flex-col justify-center items-center gap-12 py-24">
        {loading ? (
          <p className="text-gray-600 mx-auto [h-100vh]">Loading...</p>
        ) : (
          sections.map((item, idx) => (
            <div
              key={item.id}
              className={`
                grid grid-cols-1 md:grid-cols-2 items-center gap-6 
                p-10 rounded-xl shadow-sm
                transition hover:shadow-lg
                ${idx === 0 || idx === 2 ? "bg-gray-300" : "bg-white"}
              `}
            >
              {/* TEKS */}
              <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl uppercase font-semibold leading-relaxed">{item.title}</h1>
              <p>{item.description}</p>
              </div>

              {/* GAMBAR */}
              <img src={item.image} alt={item.title} className="w-full rounded-lg shadow-md object-cover" />
            </div>
          ))
        )}
      </motion.section>
    </>
  );
}
