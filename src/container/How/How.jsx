import React from "react";
import { ImWhatsapp } from 'react-icons/im';
import { BiCamera } from 'react-icons/bi';

import { AppWrapp, MotionWrap } from '../../wrapper';
import './How.scss';

const How = () => {
  return (
    <>
      <h2 className="head-text">
          <span>Bagaimana</span> Cara <br /> memesan <span>sablonan</span>
      </h2>

      <div className="app__how-container">
          <div className="app__how-list">
            <div className="app__how-box">
              <h2>1. Klik tombol pada navigasi</h2>  
            </div> 
            <div className="app__how-box">
              <h2 className="main">2. Klik tombol <BiCamera/> untuk mengupload gambar anda </h2>
            </div>
            <div className="app__how-box">
              <h2>3. Isi form yang tersedia sesuai dengan keterangannya</h2>
            </div>
             <div className="app__how-box">
              <h2>4. Klik pesan</h2>
            </div>
            <div className="app__how-box">
              <h2>5. Tunggu konfirmasi yang dikirim ke <ImWhatsapp/> anda</h2>
            </div>           
          </div>
      </div>
    </>
  );
};

export default AppWrapp(
  MotionWrap(How, 'app__how'),
  'how',
  'app__primarybg',
);
