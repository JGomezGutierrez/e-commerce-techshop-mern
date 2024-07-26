//Importar dependencias 
import jwt from 'jwt-simple';
import moment from 'moment';

//Establecer una clave secreta 
const secret = 'sECRET_kEYS_pROJECT_eCoMmErCe';

//Método para generar tokens
const createToken= (user) =>{
    const payload = {
      userId: user._id,
      email:  user.email,
      iat: moment().unix(),
      exp: moment().add(30, 'days').unix()
    };

    // Devolver el token creado
    return  jwt.encode(payload,secret);
};

export {
  secret,
  createToken
};