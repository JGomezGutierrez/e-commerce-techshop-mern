import mongoose, { Schema, model } from "mongoose";
import mongoosePagination from "mongoose-paginate-v2";


const addToCartSchema = new Schema({
   productId: String, 
   quantity: Number,
   userId: String,
},{
   timestamps: { createdAt: 'created_at' }
});

//Añadir plugin de pagination
addToCartSchema.plugin(mongoosePagination);

export default model("CartModel", addToCartSchema, "cart");