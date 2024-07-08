import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../pages/Login';
import Home from '../pages/Home';
import ForgotPassword from '../pages/ForgotPassword';
import Register from '../pages/Register';
import { ToastContainer } from 'react-toastify';
import AdminPanel from '../pages/AdminPanel';
import { AuthProvider } from '../context/AuthProvider';
import Users from '../pages/Users';
import Products from '../pages/Products';

const Approuter = () => {
 
 
    return (
   
    <Router>
        <AuthProvider>
            {/*Menú de navegacion */}
            <Header/>
            {/*Configurar las rutas */}
            <section className='section-pages'>
                <Routes>
                    <Route path='/'                     element={<Home />} />
                    <Route path='/inicio'               element={<Home />} />
                    <Route path='/login'                element={<Login />} />
                    <Route path='/olvido-contraseña'    element={<ForgotPassword />} />
                    <Route path='/registro'             element={<Register />} />
                    {/* Ruta del panel administrativo */}
                    <Route path='/panel-administrativo/*' element={<AdminPanel />}>
                        <Route index            element={<Users />} />
                        <Route path="usuarios"  element={<Users />} />
                        <Route path="productos" element={<Products />} />
                    </Route>
                </Routes>
            </section>
            <Footer/>
            {/* Contenedor de Toast */}
            <ToastContainer/>
        </AuthProvider>        
    </Router>
   
  )
}

export default Approuter