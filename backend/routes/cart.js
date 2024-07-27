//Importaciones 
import Router from "express";
import { addToCart, countAddToCart } from "../controller/CartController.js";
import { authToken } from "../middleware/authToken.js";

const router = Router();

//Definir las rutas 
router.post('/addtocart', authToken, addToCart);
router.get('/cartcountitems', authToken, countAddToCart);


export default router;