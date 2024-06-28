import React, { useState } from 'react'
import LoginIcons from '../assets/imagenavatar.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { Global } from '../helpers/Global';
import { useForm, useImageUpload } from '../hooks/useForm';
import { toast } from 'react-toastify';

const Register = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  //constante de navegacion
  const navigate = useNavigate()
  
  //Usamos el hook personalizado useForm para cargar los datos del formulario
  const { form, setForm, changed } = useForm({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profileAvatar: "",
  });

  // Usamos el hook personalizado useImageUpload para manejar la subida de imágenes y le pasamos el setForm del hook useForm
  const { handleUploadAvatar } = useImageUpload(setForm);

  // Guardar un usuario en la BD
  const saveUser = async (e) => {
    e.preventDefault();
    let newUser = form;
  
    if (form.password === form.confirmPassword) {
      try {
        const request = await fetch(Global.url + "user/register", {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await request.json();

         // Manejo de respuestas según el código de estado
        if (request.status === 201) {
          toast.success(data.message);
        } else if (request.status === 400) {
          toast.warn(data.message);
        } else if (request.status === 409) {
          toast.error(data.message);
        } else {
          toast.error(data.message);
        }
    
        } catch (error) {
          toast.error("Error en la solicitud"); // Muestra un mensaje de error genérico
          console.error("Error:", error);
        }
      
      }else {
      toast.warn("Por favor confirma tu contraseña"); // Mostrar mensaje si las contraseñas no coinciden
      console.log("Por favor confirma tu contraseña");
    }
  };
  
 

  return (
    <section id='register'>
      <div className='login-container'>
       
        <div className='login'>
            <div className='login-logo'> 
                <div>
                    <img src={form.profileAvatar || LoginIcons} alt="login icons" />
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
              

            <form className='pt-6 flex flex-col gap-2' onSubmit={saveUser}>
              <div className='grid'>
                  <label>Nombre:</label>
                  <div className='form-input'>
                    <input type="text" name='name' value= {form.name} onChange={changed} placeholder='Ingresa tu nombre' className='input' />
                  </div>
              </div>

              <div className='grid'>
                  <label>Email:</label>
                  <div className='form-input'>
                    <input type="email" name='email' value= {form.email} onChange={changed} placeholder='Ingresa tu correo electronico' className='input' />
                  </div>
              </div>

              <div>
                  <label>Contraseña:</label>
                  <div className='form-input'>
                    <input type={showPassword ? "text": "password"}  value={form.password} name='password' onChange={changed} placeholder='Ingresa tu contraseña' className='input' />
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
                    <input type={showConfirmPassword ? "text": "password"}  value={form.confirmPassword} name='confirmPassword' onChange={changed} placeholder='Confirma tu contraseña' className='input' />
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

export default Register