import SearchProduct from "./SearchProduct";
import Navbar from "../../Navbar";

function Product() {
  return (
    <>
      <Navbar mode="home" />
      <div className="py-18 lg:py-25">
        <SearchProduct />
      </div>
    </>
  );
}

export default Product;
