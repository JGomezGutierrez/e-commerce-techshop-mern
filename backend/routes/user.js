//Importaciones 
import Router from "express";
import { listUsers, login, profile, register, testUser, updateUserRole } from "../controller/userController.js";
import { authToken } from "../middleware/authToken.js";

const router = Router();


//Definir las rutas 
router.get('/test-user', testUser);
router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id', authToken, profile);


//Rutas del Panel de administracion
router.get('/list/:page?', authToken, listUsers);
router.put('/updateRol', authToken, updateUserRole);
//Exportar el Router
export default router;