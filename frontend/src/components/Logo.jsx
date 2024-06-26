import React from 'react'
import LogoApp from '../assets/logo2.png';

const Logo = ({w,h}) => {
  return (
    <div><img src={LogoApp} alt="logo" className='logo-img' /></div>
  )
}

export default Logo