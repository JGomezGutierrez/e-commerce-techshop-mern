import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Logout from '../pages/Logout';
import { BsCart3 } from "react-icons/bs";



// FaSignOutAlt

const Header = () => {

  // Estado para usar el contexto
  const { auth, cartCount  } = useAuth();
  const [menuDisplay, setMenuDisplay] = useState(false);

   // Useeffect para forzar la actualización del componente Header cuando cartCount cambia
   useEffect(() => {}, [auth]);


  return (
    <header className='header'>
      <div className='header-container'>
        <div className='header-logo'>
          <Link to={"/"}>
            <Logo/>
          </Link>
        </div>

        <div className='header-search'>
            <input type="text" placeholder='¿Que estás buscando?' className='search-input' />
            <div className='search-icon' >
              <GrSearch/>  
            </div>
        </div>
          
        <div className='header-user-menu'>
            <div className='relative group flex justify-center'>
              
              {
                auth?.user?._id && (
                  <div className = 'profile-icon' onClick={()=>setMenuDisplay((preve) => !preve)}>
                    {
                       auth?.user?.profileAvatar ? (
                        <img src={auth.user.profileAvatar}  className='w-10 h-10 rounded-full' alt={auth.name}/>
                        ) : (
                          <FaUserCircle className='bg-yellow-600 text-white rounded-full' />
                        )
                      }
                  </div>
                )
              }

              {
                menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 rounded shadow-lg'>
                  <ul>
                    {
                      auth?.user?.role === 'admin' && (
                        <Link to= {"/panel-administrativo"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay((preve) => !preve)}>Panel Administrativo</Link>
                      )
                    }
                      
                  </ul>
                </div>
                )
              }
              
          </div>

              {
                 auth?.user?._id && (
                  <Link to= {"/carrito-de-compra"} className='cart-icon'>
                    <span><BsCart3 className=''/></span>
                    <div className='cart-count'>
                      <p className='text-sm'>{cartCount}</p>
                    </div>
                  </Link>
                 )

              }

          <div>
            {
              auth?.user?._id ?(
                <Logout/>
              ) : (
                <NavLink to={"/login"} className='logout-button'>Iniciar Sesión</NavLink>
              )
            }
           
          </div>
          
        </div>

      </div>
    </header>
  )
}

export default Header