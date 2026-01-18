import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { type Item } from "../types";

import Hero from "../components/layout/Home/Hero";
import Card from "../components/layout/Home/Card";
import Navbar from "../components/Navbar";
// import HelpIcon from "../components/HelpIcon";
import FloatingSidebar from "../components/layout/Floating/FloatingSidebar";
import Footer from "../components/Footer";
import { usePageMeta } from "../hooks/usePageMeta";

function PublicHome() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  usePageMeta({
    title: "Jalan Pintas",
    description: "Produk sablon Jalan Pintas Art.",
  });

  useEffect(() => {
    (async () => {
      const data = await getItems();
      setItems(data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {/* SEO INTRO TEXT (dibaca Google) */}
      <h1 className="sr-only">Jalan Pintas Art - Jasa Sablon Kaos Berkualitas di Sidoarjo</h1>

      <p className="sr-only">Jalan Pintas Art melayani sablon kaos, hoodie, dan apparel custom dengan kualitas terbaik dan harga merakyat di Sidoarjo.</p>
      <Navbar />
      <Hero aria-label="Hero Jalan Pintas Art - Jasa Sablon Kaos di Sidoarjo" />

      <main className="flex flex-col gap-[70px]">
        <section className="grid lg:grid-cols-3 grid-cols-1 gap-3 p-8">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => <Card key={idx} title="" image="" description="" />)
            : items.map((item) => <Card key={item.id} id={item.id} title={item.title} description={item.description} image={item.image} />)}
        </section>
      </main>

      <FloatingSidebar />
      <Footer />
    </>
  );
}

export default PublicHome;
