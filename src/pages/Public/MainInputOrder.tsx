import Navbar from "../../components/Navbar";
import InputOrder from "../../components/InputOrder";
import { usePageMeta } from "../../hooks/usePageMeta";

function MainInputOrder() {
  usePageMeta({
    title: "Jalan Pintas - Order",
    description: "Produk sablon Jalan Pintas Art.",
  });
  return (
    <>
      <Navbar mode="order" />
      <InputOrder />
    </>
  );
}

export default MainInputOrder;
