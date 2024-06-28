import { connect } from "mongoose";

const connection = async () => {
    try {
     await connect ("mongodb://localhost:27017/bd_ecommerce");
     console.log("Conectado correctamente a la BD: bd_ecommerce");
    } catch (error) {
      console.log(error);
      throw new Error("¡No se ha podido a conectar a la base de datos!");
    }
}

export default connection;