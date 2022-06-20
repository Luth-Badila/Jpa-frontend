import React, { useState } from "react";
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiX } from 'react-icons/bi';
import { motion } from 'framer-motion';
import {IoMdAdd} from 'react-icons/io'; 

import { images } from '../../constants';
import { UploadImage } from '../../components';
import './Navbar.scss';


const Navbar = () => {

  const [ toggle, setToggle ] = useState(false);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo2} alt="logo" />
      </div>
      <ul className="app__navbar-links">
        {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <GiHamburgerMenu onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0]}}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <BiX onClick={() => setToggle(false)} />
              <ul>
                {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                  <li key={item}>
                    <a href={`#{item}`} onClick={() => setToggle(false)}>{item}</a>
                  </li>
                ))}
              </ul>
          </motion.div>
        )}
      </div>

      {/*Upload Image*/}
      <div className="app__navbar-link">
       
      </div>
    </nav>
  );
};

export default Navbar;
