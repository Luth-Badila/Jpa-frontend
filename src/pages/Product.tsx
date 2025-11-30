import ContactSection from "../components/ContactSection";
import SearchProduct from "../components/layout/Product/SearchProduct";
import Navbar from "../components/Navbar";

function Product() {
  return (
    <>
      <Navbar mode="home" />
      <div className="py-18 lg:py-25">
        <SearchProduct />
      </div>
      <ContactSection />
    </>
  );
}

export default Product;
