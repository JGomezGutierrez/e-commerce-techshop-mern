import React, {  useEffect, useState } from 'react';
import LoginIcons from '../assets/imagenavatar.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { Global } from '../helpers/Global';
import { useForm } from '../hooks/useForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';



const Login = () => {

  const [showPassword, setShowPassword] = useState(false)

  // Estado para validar si el usuario se identificó correctamente
  const [ logged, setLogged ] = useState("not_logged");

  //constante de navegacion
  const navigate = useNavigate()
  
  // Estado para usar useAuth y setear los valores del usuario autenticado en el Provider automáticamente
  const {setAuth} = useAuth();

  const { form, handleOnchange } = useForm({
    email: "",
    password: ""
  });

  
  // Efecto para redirigir al usuario si está logueado
  useEffect(() => {
    if (logged === "logged") {
      navigate('/inicio');
    }
  }, [logged, navigate]);


  // Guardar un usuario en la BD
  const loginUser = async(e) => {
     // prevenir que se actualice la pantalla
    e.preventDefault();
  
    // Datos del formulario
    let userToLogin = form;

    try{
      // Petición al backend
      const request = await fetch(Global.url + "user/login", {
        method: "POST",
        body: JSON.stringify(userToLogin),
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        }
      });
 
      // Obtener la información retornada por la request
      const data = await request.json();

      // Manejo de respuestas según el código de estado
      if (request.ok && data.status === "success") {
  
        toast.success(data.message);
        // Persistir los datos en el navegador guardando en el localstorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));  // Guardar datos del usuario en localStorage
        
        setAuth({ token: data.token, user: data.user }); // Setear los datos del usuario en el Auth
        setLogged("logged");
      } else {
        setLogged("error");
        toast.warn(data.message);
      }
    } catch(error) {
      toast.error("Error en el inicio de sesión");
    }
  }
  
  return (
    <section>
      <div className='login-container'>

       
        <div className='login'>
            <div className='login-logo'>
               <img src={LoginIcons} alt="login icons" />
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={loginUser}>
              <div className='grid'>
                  <label>Email:</label>
                  <div className='form-input'>
                    <input type="email" name='email' value= {form.email} onChange={handleOnchange} placeholder='Ingresa tu correo electronico' className='input' />
                  </div>
              </div>

              <div>
                  <label>Contraseña:</label>
                  <div className='form-input'>
                    <input type={showPassword ? "text": "password"}  value={form.password} name='password' onChange={handleOnchange} placeholder='Ingresa tu contraseña' className='input' />
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


            <p className='my-5'> ¿Aún no tienes Cuenta? <NavLink to={'/registro'} className='link-signup'>¡Registrate!</NavLink></p>
        
        </div>
     
      </div>
    </section>
  )
}

export default Login;
