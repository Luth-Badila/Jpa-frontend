import Navbar from "../components/Navbar";
import InputOrder from "../components/InputOrder";
import Footer from "../components/Footer";

function MainInputOrder() {
  return (
    <div>
      <Navbar mode="order" />
      <InputOrder />
      <Footer/>
    </div>
  );
}

export default MainInputOrder;
