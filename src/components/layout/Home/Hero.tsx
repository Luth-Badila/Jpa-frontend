import { motion, type Variants } from "framer-motion";
import { images } from "../../../constants";

const leftInfoVariants: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const middleImageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delayChildren: 0.5 },
  },
};

const circleBgVariants: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const scaleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: { duration: 1, ease: "easeInOut" },
  },
};

export default function Hero() {
  return (
    <div
      id="home"
      className="relative flex flex-col lg:flex-row w-full h-full bg-cover bg-center px-4 lg:px-8 py-24 lg:py-16"
    >
      {/* Background Image */}
      <img
        src={images.bgImgGreen}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Kiri - Info */}
      <motion.div
        variants={leftInfoVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex-1 flex flex-col items-start justify-start z-10"
      >
        <div className="flex flex-col items-end lg:items-end w-full space-y-12">
          {/* Badge */}
          <div className="flex items-center bg-yellow-400 rounded-xl shadow-md px-6 py-4">
            <span className="text-4xl">👋</span>
            <div className="ml-5">
              <p className="text-gray-800 text-base">Hello, we are</p>
              <h1 className="text-black font-bold text-2xl">Jalan Pintas Art</h1>
            </div>
          </div>

          {/* Tag */}
          <div className="flex flex-col bg-yellow-400 rounded-xl shadow-md px-6 py-4 uppercase text-right">
            <p className="text-black">Sablon</p>
            <p className="text-black">Berkualitas</p>
          </div>

          {/* Harga */}
          <div className="flex items-center gap-1 bg-yellow-400 rounded-xl shadow-md px-6 py-4">
            <p className="text-black font-semibold">Harga</p>
            <p className="text-black font-semibold">Merakyat 👍</p>
          </div>
        </div>
      </motion.div>

      {/* Tengah - Gambar */}
      <motion.div
        variants={middleImageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex-1 flex justify-center items-center relative z-10"
      >
        <img
          src={images.bajuPutih}
          alt="baju"
          className="w-[80%] object-contain z-10"
        />
        <motion.img
          variants={circleBgVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          src={images.yellowCircle}
          alt="circle"
          className="absolute w-full h-full left-0 right-0 bottom-0 z-0"
        />
      </motion.div>

      {/* Kanan - Circles */}
      <motion.div
        variants={scaleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col justify-evenly items-start flex-1 ml-4 lg:ml-6 space-y-6 lg:space-y-8 z-10"
      >
        {/* Circle 1 */}
        <div className="w-[100px] h-[100px] rounded-full bg-white shadow-md flex justify-center items-center">
          <img src={images.bag} alt="circle" className="w-[60%] h-[60%]" />
        </div>

        {/* Circle 2 */}
        <div className="w-[150px] h-[150px] rounded-full bg-white shadow-md flex justify-center items-center">
          <img src={images.hoodie} alt="circle" className="w-[60%] h-[60%]" />
        </div>

        {/* Circle 3 */}
        <div className="w-[70px] h-[70px] rounded-full bg-white shadow-md flex justify-center items-center">
          <img src={images.kaos} alt="circle" className="w-[60%] h-[60%]" />
        </div>
      </motion.div>
    </div>
  );
};

