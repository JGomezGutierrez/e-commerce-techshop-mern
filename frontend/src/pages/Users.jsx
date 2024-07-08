import React, { useEffect, useState } from 'react';
import { Global } from "../helpers/Global";
import moment from 'moment';
import UserRole from '../components/UserRole';
import {toast} from 'react-toastify'

const Users = () => {
  
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState({
    email: "",
    name:"",
    role:""
  }
  );

  const [openModal, setOpenModal] = useState(false);
  

  useEffect(() => {
    getUSerAll();
  }, []);

  const getUSerAll = async () => {
    try {
      // Obtener el token 
      const token = localStorage.getItem('token');
      
      // Comprobar si hay token
      if (!token) {
        return false;
      }


      const response = await fetch(Global.url + "user/list", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Authorization": token
        }
      });

      const data = await response.json();

      if (data.status === "success") {
        setUsers(data.users);
      } else {
        throw new Error(data.message|| 'Error al listar los usuarios');
      }
    } catch (error) {
      console.error("Error al listar los usuarios:", error);
      toast.error(error.message);
    }
  };

  const roleMap = {
    user: "Usuario",
    admin: "Administrador"
  };



  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Creado</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>  
        {
            users.length === 0 ? (
              <tr>
                <td colSpan="6">Cargando usuarios...</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{roleMap[user.role]}</td>
                  <td>{moment(user.createdAt).format('ll')}</td>
                  <td>
                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                    onClick={()=>{
                      setSelectedUser(user)
                       setOpenModal(true)
                    }}
                      >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            )
          }

        </tbody>

      </table>
      {
        openModal && (
        <UserRole 
            onClose={()=>setOpenModal(false)}
            name  = {selectedUser.name}
            email = {selectedUser.email}
            role  = {selectedUser.role}
        />
        )
      }
      
    </div>
  );
};

export default Users;
