import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { Global } from '../helpers/Global';
import { toast } from 'react-toastify';
// import rol from '../helpers/roles';


  const UserRole = ({
      name,
      email,
      role,
      onClose,
      onUpdate 
    }) => {

  const rol = {
  user: "usuario",
  admin: "administrador"
  }

  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  }


  const updatedUserRole = async () => {
    try {
      const response = await fetch(Global.url + "user/updateRol", {
        method: "PUT",
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          role: userRole
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      });

      const data = await response.json();

      if (data.status === "success") {
        toast.success(data.message);
        onUpdate(email, userRole);
        onClose();
      } else {
        throw new Error(data.message || 'Error al actualizar el rol del usuario');
      }
    } catch (error) {
      console.error("Error al actualizar el rol del usuario:", error);
      toast.error(error.message);
    }
  };


    return (
        <div className='modal-bg'>
            <div className='modal-content'>
                <div className='flex items-center justify-between pb-4'>
                  <h1 className='text-lg font-medium'>ROL DE USUARIO</h1>
                  <button className='block  ml-auto' onClick={onClose} >
                      <IoMdCloseCircle size={24}  />
                  </button>
                </div>
                <p>Nombre: {name} </p>
                <p>Email: {email}</p>
                <div className='flex items-center justify-between my-4'>
                    <p>Rol</p>
                    <select className='border px-4' value={userRole} onChange={handleOnChangeSelect}>
                        {Object.keys(rol).map(key => (
                            <option value={key} key={key}>{rol[key]}</option>
                        ))}
                    </select>
                </div>
                <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-500 text-white hover:bg-red-700' onClick={updatedUserRole}>Cambiar Rol</button>
            </div>
        </div>
    );
}

export default UserRole;
