import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { type Item } from "../types";

import Hero from "../components/layout/Home/Hero";
import Card from "../components/layout/Home/Card";
import Navbar from "../components/Navbar";
// import HelpIcon from "../components/HelpIcon";
import FloatingSidebar from "../components/layout/Floating/FloatingSidebar";
import ContactSection from "../components/ContactSection";

function PublicHome() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getItems();
      setItems(data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      <main className="flex flex-col gap-[70px]">
        <section className="grid lg:grid-cols-3 grid-cols-1 gap-3 p-8">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="p-4 border rounded bg-white animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-[350px]"></div>
                  <div className="h-3 bg-gray-200 rounded w-[350px]"></div>
                  <div className="h-4 bg-gray-200 rounded w-[350px]"></div>
                  <div className="h-4 bg-gray-200 rounded w-[350px]"></div>
                </div>
              ))
            : items.map((item) => <Card key={item.id} id={item.id} title={item.title} created_at={new Date(item.created_at)} description={item.description} image={item.image} />)}
        </section>
      </main>

      <FloatingSidebar />
      <ContactSection/>
    </>
  );
}

export default PublicHome;
