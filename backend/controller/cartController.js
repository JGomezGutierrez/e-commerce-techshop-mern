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


