//Importaciones
import connection from './database/conection.js';
import express, { json, urlencoded } from 'express';
import cors from "cors";
import UserRoutes from "./routes/user.js"

//Mensaje de bienvenida
console.log("API NODE arriba");


// Conexion a la base de datos 
connection();

// Crear Servidor de Node
const app = express();
const puerto = 3900 || process.env.PORT ; // Cambia el puerto si es necesario

// Configurar cors: permite que las peticiones se hagan directamente
app.use(cors());

// Conversion de datos (body a objetos JS)
app.use(json());
app.use(urlencoded({extended: true}));

// Configurar rutas
app.use('/api/user', UserRoutes);

//Configurar el servidor para escuchar las peticiones HTTP 
app.listen(puerto, () => {
  console.log("Servidor de NODE esta corriendo en el el puerto", puerto)
});