import mongoose from "mongoose";
const { Schema, model } = mongoose;
export const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    img: String,
    cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export default model("User", UserSchema);
