import cartModel from '../models/cartModel.js';


//Acciones de prueba
export const testCart = (req, res) => {
    return res.status(200).send({
        status:"success",
        message:"Mensaje enviado desde el controlador: cartController.js"
    });
}

//Método para agregar producto al carrito 
export const addToCart = async (req, res) => {
    try {

    // Recoger datos de la petición
    const { productId } = req.body;
    const userId = req.user.userId;

     // Verificar si el producto ya está en el carrito del usuario actual
    const productInCart = await cartModel.findOne({productId: productId, userId: userId});

    if (productInCart) {
        return res.status(404).json({
          status: "error",
          message: "Ya existe el producto en el carrito",
        });
      }

    const payload = {
        productId: productId, 
        quantity: 1,
        userId: userId,   
    }

    // Crear una instancia del modelo addToCartModel con los datos validados
    let addToCart_to_save = new cartModel(payload)

    // Guardar el producto en la base de datos
    await addToCart_to_save.save();

    // Devolver respuesta exitosa y el producto registrado
    return res.status(201).json({
        status: "success",
        message: "Producto agregado al carrito",
        addToCart: addToCart_to_save
      });

    } catch (error) {
      console.log("Error al agregar el producto", error) 
      return res.status(500).send({
        status:"error",
        message:"Error al agregar el producto"
    }) 
       
    }
}

//Metodo para contar productos 
export const countAddToCart = async (req, res) => {
  try {

  // Recoger datos de la petición
  const userId = req.user.userId;

  // Contar los productos en el carrito del usuario actual
  const count = await cartModel.countDocuments({userId: userId});

    // Verificar si hay productos en el carrito
  if (count === 0) {
      return res.status(200).json({
        status: "empty",
        message: "No hay productos en el carrito",
        count: count
      });
    }


  /// Devolver respuesta exitosa con la cantidad de productos
  return res.status(201).json({
      status: "success",
      message: "Productos contados correctamente",
      count: count
    });

  } catch (error) {
    console.log("Error al contar productos", error) 
    return res.status(500).send({
      status:"error",
      message:"Error al contar productos"
  }) 
     
  }
}

//Metodo para listar productos agregados al carrito 
export const cartlistItems = async (req, res) => {
  try {

  // Recoger datos de la petición
  const userId = req.user.userId;

  // Obtener todos los productos en el carrito del usuario actual
  const allProducts = await cartModel.find({userId: userId}).populate("productId");

  /// Devolver respuesta exitosa con la cantidad de productos
  return res.status(201).json({
      status: "success",
      message: "Productos obtenidos correctamente",
      products: allProducts
    });

  } catch (error) {
    console.log("Error al obtener productos del carrito", error) 
    return res.status(500).send({
      status:"error",
      message:"Error al obtener productos del carrito"
  }) 
     
  }
}

//Metodo para actualizar productos del carrito
export const updateQuantyItems = async (req, res) => {
  try {

  // Recoger datos de la petición
  const userId = req.user.userId;
  const {productId, quantity } = req.body; // Desestructurar productId desde req.body

  // Validar datos de la petición
  if (!productId || !quantity) {
    return res.status(400).json({
      status: "error",
      message: "Product ID y quantity son requeridos"
    });
  }

  // Actualizar el producto en el carrito del usuario actual
  const updateProduct = await cartModel.updateOne(
    { userId, productId }, 
    { $set: { quantity } }
  );

  // Comprobar si el producto fue actualizado
  if (updateProduct.nModified === 0) {
    return res.status(404).json({
      status: "error",
      message: "Producto no encontrado en el carrito o no se realizó ninguna modificación"
    });
  }

  /// Devolver respuesta exitosa con la cantidad de productos
  return res.status(201).json({
      status: "success",
      message: "Productos actualizado correctamente",
      product: updateProduct
    });

  } catch (error) {
    console.log("Error al actualizar productos del carrito", error) 
    return res.status(500).send({
      status:"error",
      message:"Error al actualizar productos del carrito"
  }) 
     
  }
}

//Metodo para eliminar productos del carrito
export const deleteQuantyItems = async (req, res) => {
  try {

  // Recoger datos de la petición
  const userId = req.user.userId; // Obtener el ID del usuario desde el middleware de autenticación
  const { productId } = req.body; // Obtener el ID del producto a eliminar desde el cuerpo de la petición

   // Validar datos de la petición
   if (!productId) {
    return res.status(400).json({
      status: "error",
      message: "Product ID es requerido"
    });
  }

  // Eliminar el producto del carrito del usuario actual
  const deleteProduct = await cartModel.deleteOne(
    { userId, productId } // Buscar el documento en la colección de carritos que coincida con el userId y productId
  );


   // Comprobar si el producto fue eliminado
   if (deleteProduct.deletedCount === 0) {
    return res.status(404).json({
      status: "error",
      message: "Producto no encontrado en el carrito o no se realizó ninguna eliminación"
    });
  }

  // Devolver respuesta exitosa
  return res.status(201).json({
      status: "success",
      message: "Producto eliminado del carrito",
    });

  } catch (error) {
    console.log("Error al eliminar productos del carrito", error) 
    return res.status(500).send({
      status:"error",
      message:"Error al eliminar productos del carrito"
  }) 
     
  }
}




