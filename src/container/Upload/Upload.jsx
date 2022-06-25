import React, {useState} from "react";
import { BiCamera } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { AppWrapp, MotionWrap } from '../../wrapper';
import { images } from '../../constants';
import { client } from "../../client";
import './Upload.scss';

const Upload = () => {

    const [ wrongImageType, setWrongImageType ] = useState(false);
    const [ imageAsset, setImageAsset ] = useState(null);
    const [ title ,setTitle ] = useState('');
    const [ about ,setAbout ] = useState('');
    const [ number, setNumber ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ fields ,setFields ] = useState(false);

    const navigate = useNavigate();

    // const handleUploadChange = (e) => {
    //   let uploaded = e.target.files[0];
    //   setImage(URL.createObjectURL(uploaded))
    // }

    const uploadImage =  (e) => {
    const { type, name } = e.target.files[0];

    if(type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff') {
      setWrongImageType(false);

      client.assets
        .upload('image', e.target.files[0], { contentType: type, filename: name })
        .then((document) => {
          setImageAsset(document); 
        })
        .catch((error) => {
          console.log('Image upload error', error);
        })
    } else {
      setWrongImageType(true);
    }
  }

   const savePin = () => {
    if(title && about && number && imageAsset?._id) {
      const doc = {
        _type: 'pin',
        title,
        about,
        number,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id
          }
        },
      }
      client.create(doc)
      .then(() => {
        navigate('/success')
      })
    } else {
      setFields(true);

      setTimeout(() => setFields(false), 2000)
    }
  }

  return (
   <>
     <h2 className="head-text">
          <span>Sudahi</span> galaumu <br /> mari <span>nyablon</span> ditempatku
      </h2>

          <div className="app__upload-container">
            
            <div className="app__upload-content">
              
              <div className="image-Asset">
                  <img 
                    src={imageAsset?.url}
                    className="image-thumbnail"
                    alt=""
                  />
              </div>

              <div className="app__upload-form">
                
               <div className="app__form-label">
                  <label htmlFor="formFile" className="form-label">
                    <BiCamera />
                  </label>
                  <input 
                    type="file"
                    className="form-control"
                    id="formFile"
                    onChange={uploadImage}
                    accept="image/*"
                  />
                </div>

              </div>

              <div className="title-about">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nama lengkap anda"
                    className="title-label"
                   />
                   <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Berapa jumlah pesanan anda ?"
                    className="title-label"
                  />
                   <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Nomor whatsapp anda"
                    className="title-label"
                  />
                   <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Alamat lengkap anda"
                    className="title-label"
                  />
              </div>


              <div className="btn-container">
                <button 
                  type="button"
                  className="button-17" 
                  onClick={savePin}
                >
                Kirim
                </button>
              </div>



            </div>

          </div>
    </>
  );
};

export default AppWrapp(
  MotionWrap(Upload, 'app__upload'),
  'upload',
  'app__greenbg',
);