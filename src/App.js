import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiX } from 'react-icons/bi';
import { motion } from 'framer-motion';
 
import { Header, About, Footer, Skills, Testimonial, Work, How, Upload } from './container';
import { images } from './constants';
import './App.scss';


const App = () => {

    const [ toggle, setToggle ] = useState(false);

    return (
        <>
            <Router>
                <div className="app__navbar">
                    <div className="app__navbar-logo">
                         <Link className="app__navbar-link" to="/"><img src={images.logo2} alt="logo"/></Link>
                    </div>
                    <nav className="app__navbar-links">
                        <Link className="app__navbar-link" to="/">Home</Link>
                        <Link className="app__navbar-link" to="about">About</Link>
                        <Link className="app__navbar-link" to="testimonial">Testimonial</Link>
                        <Link className="app__navbar-link" to="tool">Tool</Link>
                        <Link className="app__navbar-link" to="work">Work</Link>
                        <Link className="app__navbar-link" to="contact">Contact</Link>
                        <Link className="app__navbar-link" to="howToOrder">How To Order</Link>
                    </nav>
                    <div className="app__navbar-add">
                        <Link className="app__navbar-link" to="uploadimage"><IoMdAdd /></Link>
                    </div>
                

                    <div className="app__navbar-menu">
                        <GiHamburgerMenu onClick={() => setToggle(true)} />

                        {toggle && (
                          <motion.div
                            whileInView={{ x: [300, 0]}}
                            transition={{ duration: 0.85, ease: 'easeOut' }}
                          >
                            <BiX onClick={() => setToggle(false)} />
                              <nav className="app__navbar-links" onClick={() => setToggle(false)}>
                                    <Link className="app__navbar-link" to="/">Home</Link>
                                    <Link className="app__navbar-link" to="about">About</Link>
                                    <Link className="app__navbar-link" to="testimonial">Testimonial</Link>
                                    <Link className="app__navbar-link" to="tool">Tool</Link>
                                    <Link className="app__navbar-link" to="work">Work</Link>
                                    <Link className="app__navbar-link" to="contact">Contact</Link>
                                    <Link className="app__navbar-link" to="howToOrder">How To Order</Link>
                                    <Link className="app__navbar-link" to="uploadimage"><IoMdAdd /></Link>
                            </nav>
                          </motion.div>
                        )}
                      </div>
                </div>
                <Routes>
                    <Route path="/" element={<Header />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/testimonial" element={<Testimonial />} />
                    <Route path="/tool" element={<Skills />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/contact" element={<Footer />} />
                    <Route path="/howToOrder" element={<How />} />
                    <Route path="/uploadimage" element={<Upload />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;