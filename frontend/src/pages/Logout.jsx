import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const Logout = () => {
  const { setAuth } = useAuth();
  
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.info('Cerrando sesión...');
    localStorage.clear(); // Limpia el localStorage
    setAuth({}); // Resetea el estado de autenticación

    setTimeout(() => {
      navigate('/'); // Redirige al home después de 1.5 segundos
    }, 1500);
  };

  return (
    <button onClick={handleLogout} className='logout-button'> 
      <span>Cerrar sesión</span>
    </button>
  );
};

export default Logout;
