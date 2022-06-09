import React from "react";
import { BsInstagram } from 'react-icons/bs';
import { RiWhatsappLine } from 'react-icons/ri';
import { BiShoppingBag } from 'react-icons/bi';

const SocialMedia = () => {
  return (
    <div className="app__social">
      <div>
        <BsInstagram />
      </div>
       <div>
        <RiWhatsappLine />
      </div>
       <div>
        <BiShoppingBag />
      </div>
    </div>
  );
};

export default SocialMedia;
