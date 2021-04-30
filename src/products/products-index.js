import express from "express";
import {
  getProducts,
  getProductById,
  postProduct,
  deleteProduct,
  editProduct,
} from "./productControllers.js";

const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:id", getProductById);

productsRouter.post("/", postProduct);

productsRouter.put("/:id", deleteProduct);

productsRouter.delete("/:id", editProduct);

export default productsRouter;
