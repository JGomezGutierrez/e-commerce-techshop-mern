import userModel from "../models/userModel.js";

export const UploadProductPermission = async (userId) => {
    try {
      const user = await userModel.findById(userId);
  
      if (!user) {
        console.error('Usuario no encontrado por ID :', userId);
        return false;
      }
  
      console.log('rol usuario :', user.role);
      return user.role === 'admin';
    } catch (error) {
      console.error(`Error al recuperar el usuario con ID: ${userId}`, error);
      return false;
    }
  }