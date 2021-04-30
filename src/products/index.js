import express from "express";
import ProductModel from "./product-Schema.js";
import mongoose from "mongoose"
import UserSchema from "../users/user-Schema.js";
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

productsRouter.put("/:id", editProduct);

productsRouter.delete("/:id", deleteProduct);

//REVIEWS ROUTES***************

productsRouter.post("/:ProductID/reviews", async (req, res, next) => {
  try {
    const newReview = req.body;
    const updatedProducts = await ProductModel.findByIdAndUpdate(
      req.params.ProductID,
      {
        $push: {
          reviews: newReview,
        },
      },
      { runValidators: true, new: true, projection: { reviews: 1 } }
    );
    if (updatedProducts) {
      res.status(201).send({ message: "new review in this product" });
    } else {
      const error = new Error(`error in post new review`);
      error.httpStatusCode = 400;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

//GET ALL REVIEWS FOR A PRODUCT
productsRouter.get("/:ProductID/reviews", async (req, res, next) => {
  try {
    const ProductID = req.params.ProductID;
    const products = await ProductModel.findById(ProductID);
    res.send({ reviews: products.reviews });
  } catch (error) {
    next(error);
  }
});

//GET A SINGULAR REVIEW
productsRouter.get("/:ProductID/reviews/:reviewID", async (req, res, next) => {
  try {
    const { reviews } = await ProductModel.findOne(
      { _id: mongoose.Types.ObjectId(req.params.ProductID) },
      // Here^ I need to use mongoose.Types.ObjectId(req.params.id) from mongoose to parse this string in params to type object_id in mongoDB
      {
        reviews: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.reviewID) },
        },
      }
    );
    if (reviews && reviews.length > 0 ) {
      res.status(200).send(reviews[0])
    } else {
      const error = new Error(
        `review with id ${req.params.reviewID} not found`
      );
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

//MODIFY A REVIEW
productsRouter.put("/:ProductID/reviews/:reviewID", async (req, res, next) => {
  try {
      const modifiedReview = await ProductModel.findByIdAndUpdate(
        {
          _id: mongoose.Types.ObjectId(req.params.ProductID),
          "reviews._id": mongoose.Types.ObjectId(req.params.reviewID),
        },
        { $set: { "reviews.$": req.body } }, // $<-- THIS IS A PLACEHOLDER FOR INDEX IN ARRAYS; The concept of the $ is pretty similar as having something like const $ = array.findIndex(el => el._id === req.params.reviewID)
        {
          runValidators: true,
          new: true,
        }
      )
    if (modifiedReview) {
      console.log(modifiedReview)
      res.status(200).send(modifiedReview);
    } else {
      const error = new Error()
      error.httpStatusCode = 400
      next(error)
    }
  } catch (error) {
    console.log(error)
    next(error);
  }
});

//DELETE A REVIEW
productsRouter.delete(
  "/:ProductID/reviews/:reviewID",
  async (req, res, next) => {
    try {
      const modifiedProduct = await ProductModel.findByIdAndUpdate(
        req.params.ProductID,
        {
          $pull: {
            reviews: { _id: mongoose.Types.ObjectId(req.params.reviewID) },
          },
        },
        {
          new: true,
        }
      )
      res.status(204).send()
    } catch (error) {
      next(error);
    }
  }
);

export default productsRouter;
