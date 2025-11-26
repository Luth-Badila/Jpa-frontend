function Footer() {
  return (
    <footer className="bg-black py-10 flex justify-center items-center">
      <div className="w-full max-w-7xl px-4 flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <h1 className="text-center text-orange-400 text-4xl font-bold mb-4">Our Location</h1>

          <div className="relative w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.518726913619!2d112.5789235741143!3d-7.407694372945834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e3a6561026b3%3A0xae2c92cf5431a709!2sJalan%20Pintas%20sablon%20%26%20konveksi!5e0!3m2!1sen!2sid!4v1764125990950!5m2!1sen!2sid"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <a href="https://maps.app.goo.gl/PYdvqULpZkkTBpBL9" target="_blank" className="absolute inset-0 bg-transparent cursor-pointer" title="Klik untuk buka di Google Maps"></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
