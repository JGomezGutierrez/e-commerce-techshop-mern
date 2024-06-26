import React, { useState } from 'react';
import LoginIcons from '../assets/imagenavatar.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Login = () => {

  const [showPassword, setShowPassword] = useState(false)

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleOnChange = (e) =>{
    const {name , value} = e.target
 
    setData((preve) => {
      return {
        ...preve,
        [name] : value
      }
    })

  }

  const saveData = (e) => {
   e.preventDefault()
  }
  console.log("data login", data)
  
  return (
    <section id='login'>
      <div className='login-container'>
       
        <div className='login'>
            <div className='login-logo'>
              <img src={LoginIcons} alt="login icons" />
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={saveData}>
              <div className='grid'>
                  <label>Email:</label>
                  <div className='form-input'>
                    <input type="email" name='email' value= {data.email} onChange={handleOnChange} placeholder='Ingresa tu correo electronico' className='input' />
                  </div>
              </div>

              <div>
                  <label>Contraseña:</label>
                  <div className='form-input'>
                    <input type={showPassword ? "text": "password"}  value={data.password} name='password' onChange={handleOnChange} placeholder='Ingresa tu contraseña' className='input' />
                    <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve) => !preve)}>
                        <span>
                          {
                            showPassword ? (<FaEyeSlash/>):( <FaEye/>)
                          }
                        </span>
                    </div>
                  </div>
                <NavLink to={'/forgot-password'} className='link-forgot-password'>
                  ¿Olvidaste tu Contraseña?
                </NavLink>
              </div>

              <button className='login-button'>Ingresar</button>
            </form>

            <p className='my-5'> ¿Aún no tienes Cuenta? <NavLink to={'/sing-up'} className='link-signup'>¡Registrate!</NavLink></p>

        </div>
     
      </div>
    </section>
  )
}

export default Login