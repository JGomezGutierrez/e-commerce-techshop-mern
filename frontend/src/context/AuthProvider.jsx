import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Global } from "../helpers/Global";

// Crear un contexto de autenticación
const AuthContext = createContext();

// Definir el componente proveedor de contexto AuthProvider
export const AuthProvider = ({ children }) => {
  // Estado local para guardar la información del usuario y verificar si está autenticado
  const [auth, setAuth] = useState(() => {});

  // Estado para configurar la carga de los elementos del perfil y se actualizará al final cuando toda la carga esté lista
  const [loading, setLoading] = useState(true);

  // Estado para guardar los items del carrito
  const [cartCount, setCartCount] = useState(0);

  // Actualiza el conteo del carrito basado en el número de productos
  const updateCartCount = (newCount) => {
    setCartCount(newCount);
  };

  // Efecto para cargar la información del usuario al inicio
  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    // Obtener el token y los datos del usuario del localstorage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // Comprobar si hay token y usuario
    if (!token || !user) {
      setLoading(false);
      return;
    }

    // Transformar los datos a un objeto de JavaScript
    const userObj = JSON.parse(user);
    const userId = userObj.id;

    try {
      // Petición Ajax al backend para obtener los datos del usuario
      const response = await fetch(Global.url + "user/profile/" + userId, {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Petición Ajax al backend para contar los items del carrito
      const responseCountItems = await fetch(Global.url + "cart/cart-count-items", {
        method: "GET",
        headers: {
          "Authorization": token
        }
      });

      const dataCountItems = await responseCountItems.json();

      // Setear el estado de Auth
      setAuth({ token, user: data.user });

      // Setear el estado de los items del carrito
      setCartCount(dataCountItems.count);

      // Setear el estado de loading
      setLoading(false);
    } catch (error) {
      console.error("Error al autenticar el usuario:", error);
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
        cartCount,
        setCartCount,
        updateCartCount
      }}
    >
      {!loading && children} {/* Renderiza los componentes hijos envueltos por el proveedor */}
    </AuthContext.Provider>
  );
};

// Definir propTypes para el componente AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired // children debe ser un nodo React y es requerido
};

export default AuthContext;
