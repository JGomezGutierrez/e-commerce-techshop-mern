import moment from "moment";
import jwt from "jwt-simple";
import { secret } from "../services/jwt.js";


// Asegurar la autenticacion 
export const authToken = async (req, res, next) => {
    // Comprobar si llego la cabecera de autenticacion o la cookie
    if(!req.headers.authorization && !req.cookies?.token){
        return res.status(403).send({
         status: "error",
         message: "La peticion no tiene cabecera de autenticacion"
        });
    }

    //Limpiar el token y quitar las comillas si las hay
    const token = req.cookies?.token || req.headers.authorization.replace(/['"]+/g, '');


 //Decodificar el token y comprobar si ha expirado
 try {
    //Decodificar el token 
    let payload = jwt.decode(token, secret);

    // Comprobar si el token ha expirado
    if (payload.exp <= moment().unix()) {
        return res.status(401).send({
          status: "error",
          message:"El token ha expirado"
        });
    }

    // Agregar los datos del user al request
    req.user = payload;

 } catch (error) {
    return res.status(404).send({
        status:"error",
        message:"El token no es valido"
      });
 }

 // Pasar a la ejecucion del siguiente metodo
next();
}