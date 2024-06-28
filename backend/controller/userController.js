import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";



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
      // const (email, password, name) = req.body
      let params = req.body;
  
      // Validaciones: verificamos que los datos obligatorios estén presentes
      if (!params.name ||!params.email || !params.password ){
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
        
        // $or: [
        //   { email: user_to_save.email.toLowerCase() }
        // ]
      });
  
      // Si encuentra un usuario, devuelve un mensaje indicando que ya existe
      if(existingUser) {
        return res.status(409).json({
          status: error,
          message: "El usuario ya existe"
        });
      }
  
      // Cifrar contraseña
      const salt = await bcrypt.genSalt(10);
      const hasedPassword = await bcrypt.hash(user_to_save.password, salt);
      user_to_save.password = hasedPassword;
  
      // Guardar el usuario en la base de datos
      await user_to_save.save();
  
      // Devolver respuesta exitosa y el usuario registrado
      return res.status(201).json({
        success: true,
        message: "Usuario registrado con éxito",
        user: user_to_save
      });
  
    } catch (error) {
      console.log("Error en registro de usuario:", error);
      return res.status(500).json({
        success: false,
        message: "Error en registro de usuarios"
      });
    }
  }

//Metodo para autenticar usuarios
export const login = async (req, res) => {
  try {

    //Recoger los parametros del body
    let params = req.body;

    //Validar si llegaron el email y password 
    if (!params.email || !params.password ){
      return res.status(400).send({
        status: "eror",
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

    //Devolver Token generado y los datos del usuario
    return res.status(200).json({
      status:"success",
      message:"Login exitoso ",
      token,
      user:{
        id: user._id,
        name: user.name,
        last_name: user.last_name,
        bio: user.bio,
        email: user.email,
        nick: user.nick,
        role: user.role,
        image: user.image,
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

