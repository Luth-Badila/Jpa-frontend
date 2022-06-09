import React, { useState } from "react";

import { images } from '../../constants';
import { AppWrapp, MotionWrap } from '../../wrapper';
import { client } from '../../client';

import './Footer.scss';

const Footer = () => {

  const [formData, setFormData] = useState({ name: '', email: '', message: ''});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {name, email, message} = formData;

  const handleChangeInput = (e) => {
    const {name, value} = e.target;

    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    }

    client.create(contact)
      .then(() => {
        setLoading(false);
        setFormSubmitted(true);
      })
  }

  return (
    <>
      <h2 className="head-text">
        Sudahi galaumu mari pesan sablonan di tempatku
      </h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email"/>
          <a href="mailto:FrancescoLutfi10@gmail.com" className="p-text">emailku lur</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile"/>
          <a href="tel:+6285964168620" className="p-text">nomor teleponku lur</a>
        </div>
      </div>

    {!formSubmitted ? 
      <div className="app__footer-form app__flex">
        <div className="app__flex">
          <input className="p-text" type="text" placeholder="nama kamu" value={name} onChange={handleChangeInput} name="name"/>
        </div>
        <div className="app__flex">
          <input className="p-text" type="email" placeholder="email kamu" value={email} onChange={handleChangeInput} name="email"/>
        </div>
        <div>
          <textarea 
            className="p-text"
            placeholder="Pesan kamu"
            value={message}
            name="message"
            onChange={handleChangeInput}
          />
        </div>
        <button type="button" className="p-text" onClick={handleSubmit}>
          {loading ? "Mengirim" : "Kirim pesan kamu"}
        </button>
      </div>
    : <div>
        <h3 className="head-text">Terima kasih sudah menghubungi</h3>  
      </div>}
    </>
  );
};

export default AppWrapp(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
);
