import { UploadProductPermission } from "../helpers/permission.js";
import productModel from "../models/productModels.js"


//Acciones de prueba
export const testProduct = (req, res) => {
    return res.status(200).send({
        status:"success",
        message:"Mensaje enviado desde el controlador: productController.js"
    });
}

//Metodo para cargar productos
export const UploadProducts = async (req, res) => {
    try {

    const sessionUserId = req.user.userId;

    if(!await UploadProductPermission(sessionUserId)){
      return res.status(403).send({
        status: "error",
        message: "El usuario no es administrador"
      });
    }
    // Recoger datos de la petición
    let params = req.body;

    // Crear una instancia del modelo Product con los datos validados
    let product_to_save = new productModel(params);

    // Guardar el producto en la base de datos
    await product_to_save.save();

    // Devolver respuesta exitosa y el producto registrado
    return res.status(201).json({
        status: "success",
        message: "Producto cargado con éxito",
        product: product_to_save
      });

    } catch (error) {
      console.log("Error al cargar los productos al sistema", error) 
      return res.status(500).send({
        status:"error",
        message:"Error al cargar el producto al sistema"
    }) 
       
    }
}

// Método para listar productos 
export const listProducts = async (req, res) => {
  
  try {

    const allProducts = await productModel.find().sort({ createdAt : -1});


    // Si no hay productos en la página solicitada 
    if (!allProducts) {
      return res.status(404).send({
        status: "error",
        message: "No hay productos disponibles"
      });
    }

    // Transformar los datos del producto antes de enviarlos al frontend
    const productList = allProducts.map(product => ({
      id: product._id,
      productName: product.productName,
      brandName: product.brandName,
      category: product.category,
      productImage: product.productImage,
      description: product.description,
      price: product.productprice,
      sellingPrice: product.sellingPrice,
      createdAt: product.created_at 
    }));

    
    // Devolver los productos  
    return res.status(200).json({
      status: "success",
      message: "Lista de productos obtenida correctamente",
      allProducts: productList,
    });
    
  } catch (error) {
    console.log("Error al listar los productos:", error);
    return res.status(500).send({
      status: "error",
      message: "Error al listar los productos"
    });
  }
}

// Método para actualizar productos 
export const updatedProduct = async (req, res) => {
  try {

    // Obtener el ID del producto desde los parámetros de la URL
    const productId = req.params.id;

    // Obtener la información del producto al actualizar desde el cuerpo de la solicitud
    let productToUpdate = req.body;

    // Validar que el usuario sea administrador
    if (!UploadProductPermission(req.userId)) {
      return res.status(403).send({
        status: "error",
        message: "El usuario no es administrador"
      });
    }

    // Buscar y actualizar el producto por su ID
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId, 
      productToUpdate,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({
        status: "error",
        message: "Producto no encontrado"
      });
    }

    // Devolver respuesta exitosa con el usuario actualizado
    return res.status(200).json({
      status: "success",
      message: "producto actualizado correctamente!",
      product: updatedProduct
    });
  } catch (error) {
    console.log("Error al actualizar el producto", error);
    return res.status(500).send({
      status: "error",
      message: "Error al actualizar el producto"
    });
  }
};

// Método para obtener las categorias de los productos 
export const categoryProducts = async (req, res) => {
  
  try {
    // Obtener todas las categorías distintas
    const productCategory = await productModel.distinct("category");


    // Si no hay categorías, devolver un error 404
    if (!productCategory.length) {
      return res.status(404).send({
        status: "error",
        message: "No hay categorias disponibles"
      });
    }

    // Array para almacenar un producto de cada categoria 
    const productByCategory = [];

     // Buscar un producto de cada categoría
    for (const category of productCategory){
      const product = await productModel.findOne({category});
      if(product){
        productByCategory.push(product);
      }
    }


    // Devolver las categorías y los productos
    return res.status(200).json({
      status: "success",
      message: "Categoría obtenida con éxito",
      productByCategory: productByCategory,
    });
    
  } catch (error) {
    console.log("Error al obtener las categorias:", error);
    return res.status(500).send({
      status: "error",
      message: "Error al obtener las categorias"
    });
  }
}

// Método para obtener todos los productos de una categoria especifica
export const categoryWiseProducts = async (req, res) => {
  
  try {
    // Recoger datos de la petición
    let params = req.body || req.query;

    // Desestructurar la categoría de los parámetros
    const { category } = params;

    // Verificar que la categoría esté presente
    if (!category) {
      return res.status(400).send({
        status: "error",
        message: "La categoría es requerida"
      });
    }

     // Buscar productos por categoría
    const product = await productModel.find({category});


    // Devolver los productos  
    return res.status(200).json({
      status: "success",
      message: "Productos por categoría obtenidos con éxito",
      product: product,
    });
    
  } catch (error) {
    console.log("Error al obtener las productos por categoria:", error);
    return res.status(500).send({
      status: "error",
      message: "Error al obtener los productos por categoria"
    });
  }
}

//Método para obtener la informacion de un producto
export const ProductDetails = async (req, res) => {
  
  try {

    // Obtener los parametros del cuerpo de la solicitud
    const {productId} = req.body;

    // Buscar el producto por su ID
    const product = await productModel.findById(productId);

    // Verificar si el producto existe
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado",
      });
    }

   // Devolver la información del producto
    return res.status(200).json({
      status: "success",
      product: product,
    });
    
  } catch (error) {
    console.log("Error al obtener la informacion del producto:", error);
    return res.status(500).send({
      status: "error",
      message: "Error al obtener la informacion del producto"
    });
  }
}