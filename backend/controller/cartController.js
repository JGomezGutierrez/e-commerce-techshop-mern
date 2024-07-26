import addToCartModel from '../models/cartModel.js'

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
    const currentUser = req.userId;

     // Verificar si el producto ya está en el carrito del usuario actual
    const productInCart = await addToCartModel.findOne({productId: productId, userId: currentUser});

    if (productInCart) {
        return res.status(404).json({
          status: "error",
          message: "Ya existe el producto en el carrito",
        });
      }

    const payload = {
        productId: productId, 
        quantity: 1,
        userId: currentUser,   
    }

    // Crear una instancia del modelo addToCartModel con los datos validados
    let addToCart_to_save = new addToCartModel(payload)

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
