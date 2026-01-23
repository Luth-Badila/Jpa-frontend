import Navbar from "../../components/Navbar";
import { usePageMeta } from "../../hooks/usePageMeta";

function HowToOrder() {
  usePageMeta({
    title: "Jalan Pintas - How To Order",
    description: "Produk sablon Jalan Pintas Art.",
  });
  return (
    <section className="py-16 lg:py-24">
      <Navbar />
      <div className="flex justify-center items-center h-[100vh]">HowToOrder</div>;
    </section>
  );
}

export default HowToOrder;
