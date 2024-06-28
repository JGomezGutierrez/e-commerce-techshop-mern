//Importaciones 
import Router from "express";
import { register, testUser } from "../controller/userController.js";

const router = Router();


//Definir las rutas 
router.get('/test-user', testUser);
router.post('/register', register);

//Exportar el Router
export default router;