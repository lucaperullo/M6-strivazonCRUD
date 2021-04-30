import mongoose from "mongoose";
const { Schema, model } = mongoose;
export const UserSchema = new Schema(
  {
    name: String,
    img: String,
    cart: Array,
  },
  { timestamps: true }
);

export default model("User", UserSchema);
