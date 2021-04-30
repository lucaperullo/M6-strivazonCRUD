import express from "express";
import ProductModel from "./product-Schema.js";
import ReviewsSchema from "../reviews/review-Schema.js";
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
    const newReview = new ReviewsSchema(req.body);
    const { _id } = await newReview.save();
    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

//GET ALL REVIEWS FOR A PRODUCT
productsRouter.get("/:ProductID/reviews", async (req, res, next) => {
  try {
    const ProductID = req.params.ProductID;
    const reviews = await ProductModel.findById(ProductID);
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

//GET A SINGULAR REVIEW
productsRouter.get("/:ProductID/reviews/:reviewID", async (req, res, next) => {
  try {
    const ProductID = req.params.ProductID;
    const reviewID = req.params.ReviewID;
    const review = await ProductModel.find();
  } catch (error) {
    next(error);
  }
});

//POST A REVIEW
// productsRouter.post("/:ProductID/review/:userID", async (req, res, next) => {
//   try {
//     await UserSchema.addReviewIdToProduct(req.params.)
//   } catch (error) {
//     next(error);
//   }
// });

//MODIFY A REVIEW
productsRouter.put("/:ProductID/reviews/:reviewID", async (req, res, next) => {
  try {
    const modifiedReview = await ReviewModel.findByIdAndUpdate(
      req.params.reviewID,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (modifiedReview) {
      res.send(modifiedReview);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//DELETE A REVIEW
productsRouter.delete("/:ProductID/reviews/:reviewID", async (req, res, next) => {
  try {
    const review = await ReviewModel.findByIdAndDelete(req.params.reviewID);
    if (review) {
      res.send(review);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
export default productsRouter;
