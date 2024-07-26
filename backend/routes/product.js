//Importaciones 
import Router from "express";
import { categoryProducts,  categoryWiseProducts,  listProducts, ProductDetails, testProduct, updatedProduct, UploadProducts } from "../controller/ProductsController.js";
import { authToken } from "../middleware/authToken.js";

const router = Router();

//Definir las rutas 
router.get('/test-product',  testProduct);
router.post('/upload-product', authToken, UploadProducts);
router.get('/list-products', authToken, listProducts);
router.put('/update-product/:id', authToken, updatedProduct);
router.get('/get-categoryProduct', categoryProducts);
router.post('/category-product', categoryWiseProducts);
router.post('/product-details', ProductDetails);


export default router;