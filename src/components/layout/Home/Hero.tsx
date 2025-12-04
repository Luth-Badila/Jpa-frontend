import { motion, type Variants } from "framer-motion";
import { images } from "../../../constants";

const leftInfoVariants: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
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
  visible: { scale: 1, transition: { duration: 1, ease: "easeInOut" } },
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
      className="relative flex flex-col lg:flex-row w-full h-auto bg-cover bg-center px-4 sm:px-6 lg:px-12 py-18 lg:py-40"
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
        className="flex flex-col items-start justify-center z-10"
      >
        <div className="flex flex-col items-start lg:w-full w-[70%] space-y-8 sm:space-y-10 lg:space-y-12">
          {/* Badge */}
          <div className="flex lg:w-[300px] items-center bg-yellow-400 rounded-xl shadow-md px-4 
          sm:px-6 py-3 sm:py-4">
            <span className="lg:text-3xl sm:text-4xl">👋</span>
            <div className="ml-4 sm:ml-5">
              <p className="text-gray-800 lg:text-2xl">Hello, we are</p>
              <h1 className="text-black font-bold lg:text-3xl">
                Jalan Pintas Art
              </h1>
            </div>
          </div>

          {/* Tag */}
          <div className="flex flex-col bg-yellow-400 rounded-xl shadow-md px-4 sm:px-6 py-3 sm:py-4 uppercase text-left sm:text-right">
            <p className="text-black text-base">Sablon</p>
            <p className="text-black text-base">Berkualitas</p>
          </div>

          {/* Harga */}
          <div className="flex items-center gap-2 bg-yellow-400 rounded-xl shadow-md px-4 
          sm:px-6 py-3 sm:py-4">
            <p className="text-black font-semibold text-base">
              Harga
            </p>
            <p className="text-black font-semibold text-base">
              Merakyat 👍
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tengah - Gambar */}
      <motion.div
        variants={middleImageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex justify-center items-center relative z-10 my-20 lg:my-0"
      >
        <img
          src={images.bajuPutih}
          alt="baju"
          className="w-[300px] md:w-[450px] lg:w-[60%] object-contain z-10"
        />
        <motion.img
          variants={circleBgVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          src={images.yellowCircle}
          alt="circle"
          className="absolute w-[80%] h-[400px] lg:w-[500px] lg:h-full lg:left-27 lg:right-0 lg:bottom-0 z-0"
        />
      </motion.div>

      {/* Kanan - Circles */}
      <motion.div
        variants={scaleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-row lg:flex-col justify-center lg:justify-evenly items-center 
        lg:items-start flex-1 gap-4 sm:gap-6 lg:gap-8 z-10 lg:mr-25 mr-0 lg:mt-0 mt-5"
      >
        {/* Circle 1 */}
        <div className="w-[70px] sm:w-[90px] lg:w-[100px] h-[70px] sm:h-[90px] lg:h-[100px] rounded-full bg-white shadow-md flex justify-center items-center">
          <img src={images.bag} alt="circle" className="w-[60%] h-[60%]" />
        </div>

        {/* Circle 2 */}
        <div className="w-[110px] sm:w-[130px] lg:w-[150px] h-[110px] sm:h-[130px] lg:h-[150px] rounded-full bg-white shadow-md flex justify-center items-center">
          <img src={images.hoodie} alt="circle" className="w-[60%] h-[60%]" />
        </div>

        {/* Circle 3 */}
        <div className="w-[60px] sm:w-[70px] lg:w-[80px] h-[60px] sm:h-[70px] lg:h-[80px] rounded-full bg-white shadow-md flex justify-center items-center">
          <img src={images.kaos} alt="circle" className="w-[60%] h-[60%]" />
        </div>
      </motion.div>
    </div>
  );
}
