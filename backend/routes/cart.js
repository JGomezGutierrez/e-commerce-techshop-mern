//Importaciones 
import Router from "express";
import { addToCart, cartlistItems, countAddToCart, deleteQuantyItems, updateQuantyItems } from "../controller/cartController.js";
import { authToken } from "../middleware/authToken.js";

const router = Router();

//Definir las rutas 
router.post('/addtocart', authToken, addToCart);
router.get('/cart-count-items', authToken, countAddToCart);
router.get('/cart-list-items', authToken, cartlistItems);
router.put('/update-cart-items', authToken, updateQuantyItems );
router.delete('/delete-cart-items', authToken, deleteQuantyItems );

export default router;