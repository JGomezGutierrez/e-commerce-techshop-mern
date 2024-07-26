//Importaciones
import connection from './database/conection.js';
import express, { json, urlencoded } from 'express';
import cors from "cors";
import UserRoutes from "./routes/user.js";
import ProductRoutes from "./routes/product.js"
import CartRoutes from "./routes/cart.js"
import cookieParser from "cookie-parser";

//Mensaje de bienvenida
console.log("API NODE arriba");


// Conexion a la base de datos 
connection();

// Crear Servidor de Node
const app = express();
const puerto = process.env.PORT || 3900; // Cambia el puerto si es necesario

// Configurar cors: permite que las peticiones se hagan directamente
app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true
}));
app.use(cookieParser())

// Conversion de datos (body a objetos JS)
app.use(json()); // Para parsear JSON en las solicitudes
app.use(urlencoded({extended: true})); // Para parsear datos URL-encoded

// Configurar rutas
app.use('/api/user', UserRoutes);
app.use('/api/product', ProductRoutes);
app.use('/api/cart', CartRoutes);

//Configurar el servidor para escuchar las peticiones HTTP 
app.listen(puerto, () => {
  console.log("Servidor de NODE esta corriendo en el el puerto", puerto)
});