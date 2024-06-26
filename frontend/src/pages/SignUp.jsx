import React, { useState } from 'react'
import LoginIcons from '../assets/imagenavatar.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Imagetobase64 from '../assets/helpers/Imagetobase64';

const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profileAvatar: ""
  });

  const handleOnChange = (e) => {
    const {name , value} = e.target
 
    setData((preve) => {
      return {
        ...preve,
        [name] : value
      }
    })

  }

  const handleUploadAvatar = async(e) => {
   const file = e.target.files[0]

   const imageAvatar = await Imagetobase64(file)
   console.log("imageAvatar", imageAvatar)
    setData((preve) =>{
      return {
        ...preve,
        profileAvatar : imageAvatar
      }
    })
    console.log("file", file)

  }

  const saveData = (e) => {
   e.preventDefault()
  }
  console.log("data singUp", data)

  return (
    <section id='singUp'>
      <div className='login-container'>
       
        <div className='login'>
            <div className='login-logo'> 
                <div>
                    <img src={data.profileAvatar || LoginIcons} alt="login icons" />
                </div>
                <form>
                  <label>
                    <div className='upload-photo'>
                      Cargar foto
                    </div>
                    <input type="file" className='hidden' onChange={handleUploadAvatar}/>
                  </label>
                </form>
            </div>
              

            <form className='pt-6 flex flex-col gap-2' onSubmit={saveData}>
              <div className='grid'>
                  <label>Nombre:</label>
                  <div className='form-input'>
                    <input type="text" name='name' value= {data.name} onChange={handleOnChange} placeholder='Ingresa tu nombre' className='input' />
                  </div>
              </div>

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
              </div>

              <div>
                  <label>Confirmar Contraseña:</label>
                  <div className='form-input'>
                    <input type={showConfirmPassword ? "text": "password"}  value={data.confirmPassword} name='confirmPassword' onChange={handleOnChange} placeholder='Confirma tu contraseña' className='input' />
                    <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve) => !preve)}>
                        <span>
                          {
                            showConfirmPassword ? (<FaEyeSlash/>):( <FaEye/>)
                          }
                        </span>
                    </div>
                  </div>
              </div>

              <button className='login-button'>Registrarme</button>
            </form>

            <p className='my-5'> ¿Ya tienes cuenta? <NavLink to={'/Login'} className='link-signup'>Inicia Sesion</NavLink></p>

        </div>
     
      </div>
    </section>
  )
}

export default SignUp