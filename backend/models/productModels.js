import mongoose, { Schema, model } from "mongoose";
import mongoosePagination from "mongoose-paginate-v2";


const productSchema = new Schema({
    productName: {
    type: String,
    required: true
   },
   brandName: {
    type: String,
    required: true
   },
   category: {
    type: String,
    required: true
   },
   productImage: [],
   description: {
    type: String,
    required: true
   },
   price: Number,
   sellingPrice: Number,
  created_at: {
    type: Date,
    default: Date.now
  }
});

//Añadir plugin de pagination
productSchema.plugin(mongoosePagination);

export default model("productModel", productSchema, "products");