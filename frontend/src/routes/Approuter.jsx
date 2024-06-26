import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../pages/Login';
import Home from '../pages/Home';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';

const Approuter = () => {
 
 
    return (
   
    <Router>
        {/*Menú de navegacion */}
        <Header/>
            {/*Configurar las rutas */}
            <section className='section-pages'>
                <Routes>
                    <Route path='/'                 element={<Home/>}></Route>
                    <Route path='inicio'            element={<Home/>}></Route>
                    <Route path='/login'            element={<Login/>}></Route>
                    <Route path='/forgot-password'  element={<ForgotPassword/>}></Route>
                    <Route path='/sing-up'          element={<SignUp/>}></Route>
                </Routes>
            </section>
        <Footer/>
    </Router>
   
  )
}

export default Approuter