import express from "express";
import {
  getProducts,
  getProductById,
  postProduct,
  deleteProduct,
  editProduct,
} from "./productControllers.js";

const routerProducts = express.Router();

routerProducts.get("/", getProducts );

routerProducts.get("/:id", getProductById);

routerProducts.post("/", postProduct);

routerProducts.put("/:id", deleteProduct);

routerProducts.delete("/:id", editProduct);

export default routerProducts