import mongoose, { Schema, model } from "mongoose";
import mongoosePagination from "mongoose-paginate-v2";


const userSchema = new Schema({
   name: {
    type: String,
    required: true
   },
   email: {
    type: String,
    unique: true,
    required: true
   },
   password: {
    type: String,
    required: true
   },
   profileAvatar: String,
   role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

//Añadir plugin de pagination
userSchema.plugin(mongoosePagination);

export default model("userModel", userSchema, "users");