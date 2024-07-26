import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import {  FaUserCircle } from "react-icons/fa";
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Users from './Users';
import Products from './Products';


const AdminPanel = () => {

const { auth } = useAuth();
const navigate = useNavigate();

useEffect(() => {
  // Verificar si auth o auth.user están indefinidos antes de acceder a sus propiedades
  if (!auth || !auth.user || auth.user.role !== 'admin') {
    navigate('/'); // Redirigir a la página de inicio si no hay autenticación o el rol no es 'admin'
  }
}, [auth, navigate]);



  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
            <div className='h-40 flex justify-center items-center flex-col'>
                <div className = 'text-5xl cursor-pointer relative flex justify-center'>
                    {
                    auth?.user?.profileAvatar ? (
                    <img src={auth.user.profileAvatar}  className='w-20 h-20 rounded-full' alt={auth.user.name}/>
                    ) : (
                        <FaUserCircle className='bg-yellow-600 text-white rounded-full' />
                    )
                    }
                </div>
                <p className='capitalize text-lg font-semibold'>{auth?.user?.name}</p>
                <p className='text-sm'>{auth?.user?.role}</p>
            </div>

            <div>
              <nav className='grid p4'>
                <Link to={"usuarios"} className='px-2 py-1 hover:bg-slate-100 focus:text-blue-600'> Usuarios</Link>
                <Link to={"productos"} className='px-2 py-1 hover:bg-slate-100 focus:text-blue-600'> Productos</Link> 
              </nav>
            </div>     
        </aside>

        <main className='w-full h-full p-2'>
        <Routes>
          <Route path="/"           element={<Outlet />}>
            <Route index element={<Users />} />
            <Route path="usuarios"  element={<Users />} />
            <Route path="productos" element={<Products />} />
          </Route>
        </Routes>
        </main>
    </div>
  )
};

export default AdminPanel