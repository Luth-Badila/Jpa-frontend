import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { type Item } from "../types";

import Hero from "../components/layout/Home/Hero";
import Card from "../components/layout/Home/Card";
// import About from "../components/layout/Home/About";
import Navbar from "../components/Navbar";
import Tabs from "../components/TabComponent";
import HelpIcon from "../components/HelpIcon";

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
      <Navbar mode="home" />
      <Hero />

      <section className="flex justify-center items-center flex-wrap gap-3 py-5">
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="p-4 border rounded bg-white animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-[350px]"></div>
                <div className="h-3 bg-gray-200 rounded w-[350px]"></div>
                <div className="h-4 bg-gray-200 rounded w-[350px]"></div>
                <div className="h-4 bg-gray-200 rounded w-[350px]"></div>
              </div>
            ))
          : items.map((item) => <Card key={item.id} id={item.id} title={item.title} created_at={new Date(item.created_at)} description={item.description} />)}
      </section>

      {/* <About /> */}

      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Reusable Tabs with Animation</h1>
        <Tabs
          tabs={[
            {
              label: "Kaos",
              content: <p>✨ Selamat datang di halaman Home!</p>,
            },
            {
              label: "Tas",
              content: <p>👤 Ini adalah halaman Profile kamu.</p>,
            },
            {
              label: "Polo",
              content: <p>⚙️ Atur preferensi kamu di halaman Settings.</p>,
            },
            {
              label: "Semua",
              content: <p>Semua</p>,
            },
          ]}
        />
      </div>

      <HelpIcon />
    </>
  );
}

export default PublicHome;
