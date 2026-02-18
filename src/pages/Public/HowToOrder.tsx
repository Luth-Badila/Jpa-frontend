// import Navbar from "../../components/Navbar";
// import { usePageMeta } from "../../hooks/usePageMeta";
// import { Link } from "react-router-dom";
// import { images } from "../../constants";

// function HowToOrder() {
//   usePageMeta({
//     title: "Jalan Pintas - How To Order",
//     description: "Produk sablon Jalan Pintas Art.",
//   });
//   return (
//     <section className="py-16 lg:py-24">
//       <Navbar />
//       <div className="flex justify-center items-center">
//         <div className=" border-black border-2 border-solid m-3 w-5xl">
//           <ol className="flex flex-col justify-center items-center gap-3">
//             <li className="flex gap-2 items-center">
//               <p>Click</p>
//               <Link to="/order">
//                 <img src={images.arrowLogo} alt="arrow-logo" className="w-16" />
//               </Link>
//             </li>
//             <li>Isi semua form jangan sampai ada yang kosong</li>
//             <li>Tunggu sampai muncul tulisan</li>
//           </ol>
//         </div>
//       </div>
//       ;
//     </section>
//   );
// }

// export default HowToOrder;

import Navbar from "../../components/Navbar";
import { usePageMeta } from "../../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { images } from "../../constants";

function HowToOrder() {
  usePageMeta({
    title: "Jalan Pintas - How To Order",
    description: "Cara order produk sablon Jalan Pintas Art.",
  });

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 mt-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Cara Pemesanan
        </h1>

        <div className="space-y-6">
          {/* STEP 1 */}
          <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full font-bold">
              1
            </div>
            <div>
              <h2 className="font-semibold text-lg">Klik Tombol Order</h2>
              <p className="text-gray-600 text-sm mt-1">
                Tekan tombol order untuk mulai melakukan pemesanan produk.
              </p>
              <Link to="/order" className="inline-block mt-3">
                <img
                  src={images.arrowLogo}
                  alt="order-button"
                  className="w-14 hover:scale-110 transition"
                />
              </Link>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full font-bold">
              2
            </div>
            <div>
              <h2 className="font-semibold text-lg">Isi Form Dengan Lengkap</h2>
              <p className="text-gray-600 text-sm mt-1">
                Masukkan data seperti nama, desain, ukuran, jumlah, dan detail
                lainnya. Pastikan tidak ada yang kosong.
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full font-bold">
              3
            </div>
            <div>
              <h2 className="font-semibold text-lg">
                Konfirmasi & Tunggu Proses
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Setelah submit, tunggu konfirmasi dari tim kami melalui WhatsApp
                atau email.
              </p>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full font-bold">
              4
            </div>
            <div>
              <h2 className="font-semibold text-lg">
                Pembayaran & Produksi
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Lakukan pembayaran sesuai invoice. Pesanan akan langsung masuk
                ke tahap produksi.
              </p>
            </div>
          </div>

          {/* STEP 5 */}
          <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full font-bold">
              5
            </div>
            <div>
              <h2 className="font-semibold text-lg">
                Pesanan Dikirim
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Produk akan dikirim sesuai alamat yang telah kamu isi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowToOrder;

