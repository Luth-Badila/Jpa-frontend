import React, { useState, useEffect, useRef } from "react";
import { TiTick } from 'react-icons/ti';

import { AppWrapp, MotionWrap } from '../../wrapper';
import { runFireworks } from '../../lib/utils';
import './Success.scss';

function Success() {

  useEffect(() =>{
    runFireworks();
  }, [])

  return (
    <>
      <div className="app__success-container">
        <div className="app__success-tick">
          <TiTick />
        </div>
        <div className="app__success-word">
          <h1 className="head-text">Terima kasih sudah memesan</h1>
          <p className="p-text">Silahkan klik untuk kembali ke menu home</p>
        </div>
      </div>
    </>
  );
};

export default AppWrapp(
  MotionWrap(Success, 'app__success'),
  'success',
  'app__primarybg',
);
