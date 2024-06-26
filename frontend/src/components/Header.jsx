import React from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
// import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <div className='header-container'>
        <div className='header-logo'>
          <NavLink to={"/"}>
            <Logo/>
          </NavLink>
        </div>

        <div className='header-search'>
            <input type="text" placeholder='¿Que estás buscando?' className='search-input' />
            <div className='search-icon' >
              <GrSearch/>  
            </div>
        </div>
          
        <div className='header-user-menu'>
          <div className = 'profile-icon'>
          <FaUserCircle className='bg-yellow-600 text-white rounded-full' />
          </div>

          <div className='cart-icon'>
            <span><FaShoppingCart className=''/></span>
            <div className='cart-count'>
            <p className='text-sm'>0</p>
            </div>
          </div>

          <div>
            <NavLink to={"/login"} className='logout-button'>Iniciar Sesión</NavLink>
          </div>
          
        </div>

      </div>
    </header>
  )
}

export default Header