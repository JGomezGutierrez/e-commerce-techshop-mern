//Importaciones 
import Router from "express";
import { addToCart } from "../controller/CartController.js";
import { authToken } from "../middleware/authToken.js";

const router = Router();

//Definir las rutas 
router.post('/addtocart', authToken, addToCart);


export default router;