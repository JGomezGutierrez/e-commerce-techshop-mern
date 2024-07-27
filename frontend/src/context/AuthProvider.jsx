import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Global } from "../helpers/Global";


// Crear un contexto de autenticación
const AuthContext = createContext();

// Definir el componente proveedor de contexto AuthProvider
export const AuthProvider = ({ children }) => {
  // Estado local para guardar la información del usuario y verificar si está autenticado
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // Efecto para cargar la información del usuario al inicio
  useEffect(() => {
    const authUser = async () => {
      try {

        // Obtener el token  y los datos del usuario del localstorage
        const token= localStorage.getItem('token');
        const user = localStorage.getItem('user');

        // Comprobar si hay token y usuario
        if (!token || !user) {
          setLoading(false);
          return false;
        }

        // Transformar los datos a un objeto de JavaScript
        const userObj = JSON.parse(user);
        const userId = userObj.id;

        // Petición Ajax al backend para obtener los datos del usuario
        const response = await fetch(Global.url + "user/profile/" + userId, {
          method: "GET",
          credentials: 'include',
          headers: {
            "Authorization": token
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success") {
          setAuth(data.user);
          await fetchCartCount(token); // Llamar a la función para contar los productos en el carrito
        } else {
          setAuth(null);
        }
      } catch (error) {
        console.error("No se pudo obtener el perfil del usuario:", error);
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };

    authUser();
  }, []);


  const fetchCartCount = async (token) => {
    try {
      setLoading(true);
      const response = await fetch(Global.url + "cart/cartcountitems", {
        method: "GET",
        headers: {
          "Authorization": token
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        setCartCount(data.count);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("No se pudo obtener el recuento del carrito:", error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        // Valores que se comparten a través del contexto
        auth,
        setAuth,
        loading,
        setLoading,
        cartCount,
        setCartCount
      }}
    >
      {children} {/* Renderiza los componentes hijos envueltos por el proveedor */}
    </AuthContext.Provider>
  );
};

// Definir propTypes para el componente AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired // children debe ser un nodo React y es requerido
};

export default AuthContext;