import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import {createToken} from "../services/jwt.js";



//Acciones de prueba
export const testUser = (req, res) => {
    return res.status(200).send({
        status:"success",
        message:"Mensaje enviado desde el controlador: user.js"
    });
}

// Método para registrar usuarios
export const register = async (req, res) => {
  try {
    // Recoger datos de la petición
    let params = req.body;

    // Validaciones: verificamos que los datos obligatorios estén presentes
    if (!params.name || !params.email || !params.password) {
      return res.status(400).json({
        success: false,
        message: "Faltan datos por enviar"
      });
    }

    // Crear una instancia del modelo User con los datos validados
    let user_to_save = new userModel({
      ...params,
      role: params.role || 'user' // Asignar el rol predeterminado si no se proporciona
    });

    // Buscar si ya existe un usuario con el mismo email 
    const existingUser = await userModel.findOne({ 
      email: user_to_save.email.toLowerCase() 
    });

    // Si encuentra un usuario, devuelve un mensaje indicando que ya existe
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "El usuario ya existe"
      });
    }

    // Cifrar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_to_save.password, salt);
    user_to_save.password = hashedPassword;

    // Guardar el usuario en la base de datos
    await user_to_save.save();

    // Devolver respuesta exitosa y el usuario registrado
    return res.status(201).json({
      success: true,
      message: "Usuario registrado con éxito",
      user: user_to_save
    });

  } catch (err) {
    console.error("Error en registro de usuario:", err);
    return res.status(500).json({
      success: false,
      message: "Error en registro de usuarios"
    });
  }
};

//Metodo para autenticar usuarios
export const login = async (req, res) => {
  try {

    //Recoger los parametros del body
    let params = req.body;

    //Validar si llegaron el email y password 
    if (!params.email || !params.password ){
      return res.status(400).send({
        status: "error",
        message:"Faltan datos por enviar",
       });
    }

    // Buscar en la BD si existe el email que nos envio el usuario 
    const user = await userModel.findOne({email: params.email.toLowerCase()});
    
    // Si no exite el user (usuario)
    if (!user){
      return res.status(404).json({
        status: "error",
        message:"Usuario no encontrado",
       });
    }
    
    //Comprobar si el password recibido es igual al almacenado en la BD
    const validPassword = await bcrypt.compare(params.password, user.password);

    // Si los passwords no coinciden vamos a enviar un mensaje de error
    if (!validPassword){
     return res.status(401).json({
      status: "error",
      message: "Contraseña incorrecta"
     });
    }

    //Generar Token 
    const token = createToken(user);
   

    const tokenOption = {
        httpOnly: true,
        secure: true
    }

    //Devolver Token generado y los datos del usuario
    return res.cookie("token", token,tokenOption ).status(200).json({
      status:"success",
      message:"Inicio de sesión exitoso",
      token,
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileAvatar: user.profileAvatar,
        created_at: user.created_at
      }
    });

  } catch (error) {
    console.log("Error en el login del usuario", error);
    return res.status(500).json({
     status: "error",
     message:"Error en el login del usuario",
    });
  }
}

// Método para mostrar el perfil del usuario
export const profile = async (req, res) => {
  try {
    // Obtener el ID del usuario desde los parámetros de la URL
    const userId = req.params.id;

    // Verificar si el ID recibido del usuario autenticado existe
    if (!req.user || !req.user.userId) {
      return res.status(404).send({
        status: "error",
        message: "Usuario no autenticado"
      });
    }

    // Buscar al usuario en la BD, excluimos la contraseña, rol, versión.
    const userProfile = await userModel.findById(userId).select('-password -__v');

    // Verificar si el usuario existe
    if (!userProfile) {
      return res.status(404).send({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    // Devolver la información del perfil del usuario
    return res.status(200).json({
      status: "success",
      user: userProfile,
    });

  } catch (error) {
    console.log("Error al obtener el perfil del usuario:", error);
    return res.status(500).send({
      status: "error",
      message: "Error al obtener el perfil del usuario"
    });
  }
}

// Método para listar usuarios 
export const listUsers = async (req, res) => {
  
  try {

    const users = await userModel.find();
    //console.log("Users:", users);

    // Si no hay usuario en la página solicitada 
    if (!users) {
      return res.status(404).send({
        status: "error",
        message: "No hay usuarios disponibles"
      });
    }

    // Transformar los datos de usuario antes de enviarlos al frontend
    const userList = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileAvatar: user.profileAvatar,
      createdAt: user.created_at 
    }));

    
    // Devolver los usuarios  
    return res.status(200).json({
      status: "success",
      message: "Lista de usuarios obtenida correctamente",
      users: userList,
    });
    
  } catch (error) {
    console.log("Error al listar los usuarios:", error);
    return res.status(500).send({
      status: "error",
      message: "Error al listar los usuarios"
    });
  }
}


// Método para actualizar el rol del usuario
export const updateUserRole = async (req, res) => {
  try {
    // Recoger información del usuario al actualizar
    let userToUpdate = req.body;

    // Validar que los campos necesarios estén presentes
    if (!userToUpdate.email) {
      return res.status(400).send({
        status: "error",
        message: "¡El campo email es requerido!"
      });
    }

    // Buscar y actualizar el usuario por el correo electrónico
    let userUpdated = await userModel.findOneAndUpdate(
      { email: userToUpdate.email.toLowerCase() },
      { role: userToUpdate.role },
      { new: true }
    );

    if (!userUpdated) {
      return res.status(400).send({
        status: "error",
        message: "Error al actualizar el usuario"
      });
    }

    // Devolver respuesta exitosa con el usuario actualizado
    return res.status(200).json({
      status: "success",
      message: "¡Usuario actualizado correctamente!",
      user: userUpdated
    });
  } catch (error) {
    console.log("Error al actualizar el rol del usuario", error);
    return res.status(500).send({
      status: "error",
      message: "Error al actualizar el rol del usuario"
    });
  }
};