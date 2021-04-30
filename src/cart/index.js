import express from "express";
import productSchema from "../products/product-Schema.js";
import UserSchema from "../users/user-Schema.js";

const cartRoute = express.Router();

cartRoute.get("/:userID", async (req, res, next) => {
  try {
    console.log("his");
    const cart = await UserSchema.findById(req.params.userID).populate("cart");
    console.log(cart, req.params.userID);
    res.send(cart);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

cartRoute.post("/", async (req, res, next) => {
  try {
    const user = await UserSchema.findOne({ user: req.body.user });
    if (user) {
      const product = await productSchema.findOne({ _id: req.body.productID });
      if (product) {
        if (req.body.delete) {
          let updatedCart = [...user.cart];
          const indexOfItem = updatedCart.findIndex(
            (item) => item.toString() === req.body.productID.toString()
          );

          updatedCart.splice(indexOfItem, 1);
          await UserSchema.updateOne(
            { user: req.body.user },
            { cart: updatedCart }
          );
          return res.send("item removed from the cart");
        }
        await UserSchema.updateOne(
          { user: req.body.user },
          { $push: { cart: req.body.productID } }
        );
        return res.send("added to cart");
      }
      return res.send("product not found").status(404);
    }
    return res.send("user not found").status(404);
  } catch (error) {
    next(error);
  }
});

export default cartRoute;
