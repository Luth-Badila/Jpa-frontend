import React, { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { type Item } from "../types";
import Navbar from "../components/layout/Home/Navbar"
import Hero from "../components/layout/Home/Hero";

const PublicHome: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getItems();
      setItems(data);
    })();
  }, []);

  return (
    <>
    <Navbar/>
    <Hero/>
    <div className="">
      
      <div className="space-y-4">
        {items.map(it => (
          <article key={it.id} className="p-4 border rounded bg-white">
            <h2 className="text-xl font-semibold">{it.title}</h2>
            <p className="text-sm text-slate-500 mb-2">{new Date(it.created_at).toLocaleString()}</p>
            <div dangerouslySetInnerHTML={{ __html: it.description ?? "" }} />
          </article>
        ))}
      </div>
    </div>
    </>
  );
};

export default PublicHome;
