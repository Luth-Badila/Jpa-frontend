import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { supabase } from "../../../lib/supabaseClient";
import { About } from "../../../types";

export default function AboutSection() {
  const [sections, setSections] = useState<About[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    const { data, error } = await supabase.from("about").select("*").order("id", { ascending: true });

    if (error) console.error(error);
    else setSections(data);

    setLoading(false);
  };

  return (
    <>
      <motion.section initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="flex flex-col justify-center items-center gap-12 py-16  lg:py-24">
        {loading ? (
          <p className="text-gray-600 text-center">Loading...</p>
        ) : (
          sections.map((item, idx) => {
            const isEvenRow = idx % 2 === 0;

            return (
              <div
                key={item.id}
                className={`
                  grid grid-cols-1 md:grid-cols-2 items-center gap-10 
                  p-10 shadow-sm w-full
                  ${isEvenRow ? "bg-gray-300" : "bg-white"} 
                `}
              >
                {/* GAMBAR KIRI (untuk idx 0,2) */}
                <div className={`${isEvenRow ? "md:order-1" : "md:order-2"}`}>
                  <img src={item.image} alt={item.title} className="w-full rounded-lg shadow-md object-cover" />
                </div>

                {/* TEKS */}
                <div className={`${isEvenRow ? "md:order-2" : "md:order-1"} flex flex-col`}>
                  <h1 className="text-xl md:text-2xl uppercase font-semibold leading-relaxed">{item.title}</h1>
                  <p className="mt-3 text-gray-700">{item.description}</p>
                </div>
              </div>
            );
          })
        )}
      </motion.section>
    </>
  );
}
