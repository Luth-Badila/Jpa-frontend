import Footer from "../components/Footer";
import SearchProduct from "../components/layout/Product/SearchProduct";
import Navbar from "../components/Navbar";
import { usePageMeta } from "../hooks/usePageMeta";

function Product() {
  usePageMeta({
    title: "Jalan Pintas - Product",
    description: "Produk sablon Jalan Pintas Art.",
  });
  return (
    <>
      <Navbar mode="home" />
      <div className="py-18 lg:py-25">
        <SearchProduct />
      </div>
      <Footer />
    </>
  );
}

export default Product;
