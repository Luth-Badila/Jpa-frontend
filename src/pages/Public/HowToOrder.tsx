import Navbar from "../../components/Navbar";
import { usePageMeta } from "../../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { images } from "../../constants";

function HowToOrder() {
  usePageMeta({
    title: "Jalan Pintas - How To Order",
    description: "Produk sablon Jalan Pintas Art.",
  });
  return (
    <section className="py-16 lg:py-24">
      <Navbar />
      <div className="flex justify-center items-center">
        <div className=" border-black border-2 border-solid m-3 w-5xl">
          <ol className="flex flex-col justify-center items-center gap-3">
            <li className="flex gap-2 items-center">
              <p>Click</p>
              <Link to="/order">
                <img src={images.arrowLogo} alt="arrow-logo" className="w-16" />
              </Link>
            </li>
            <li>Isi semua form jangan sampai ada yang kosong</li>
            <li>Tunggu sampai muncul tulisan</li>
          </ol>
        </div>
      </div>
      ;
    </section>
  );
}

export default HowToOrder;
