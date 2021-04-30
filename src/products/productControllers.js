import ProductModel from "./product-Schema.js";
// import mongoose from "mongoose";
// import q2m from "query-to-mongo";

export const getProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find()
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.status(200).send(product);
    } else {
      const error = new Error();
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next("While reading products list a problem occurred!", error);
  }
};

export const postProduct = async (req, res, next) => {
  try {
    const newProduct = {
      ...req.body,
    };
    const savedProduct = await ProductModel.create(newProduct);
    const { _id } = savedProduct;

    res.send({ message: "Product Created with this ID =>", _id });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(204).send();
    } else {
      const error = new Error(`Product with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const editProduct = async (req, res, next) => {
  try {
    const newProduct = { ...req.body };
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      newProduct,
      {
        runValidators: true,
        new: true,
      }
    );
    if (product) {
      res.send(product);
    } else {
      const error = new Error(`Product with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
