import React from 'react'
import useAuth from '../hooks/useAuth';
import {  FaUserCircle } from "react-icons/fa";
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Users from './Users';
import Products from './Products';


const AdminPanel = () => {

const { auth } = useAuth();

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
            <div className='h-32 flex justify-center items-center flex-col'>
                <div className = 'text-5xl cursor-pointer relative flex justify-center'>
                    {
                    auth?.profileAvatar ? (
                    <img src={auth?.profileAvatar}  className='w-20 h-20 rounded-full' alt={auth.name}/>
                    ) : (
                        <FaUserCircle className='bg-yellow-600 text-white rounded-full' />
                    )
                    }
                </div>
                <p className='capitalize text-lg font-semibold'>{auth.name}</p>
                <p className='text-sm'>{auth.role}</p>
            </div>

            <div>
              <nav className='grid p4'>
                <Link to={"usuarios"} className='px-2 py-1 hover:bg-slate-100'> Usuarios</Link>
                <Link to={"productos"} className='px-2 py-1 hover:bg-slate-100'> Productos</Link> 
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