import express from "express";
import ProductSchema from "./schema.js";
import ReviewSchema from "./schema.js";
const router = express.Router();

//GET ALL REVIEWS FOR A PRODUCT
router.get("/:ProductID/reviews", async (req, res, next) => {
  try {
    const ProductID = req.params.ProductID;
    const reviews = await ProductSchema.findById(ProductID);
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

//GET A SINGULAR REVIEW
router.get("/:ProductID/reviews/:reviewID", async (req, res, next) => {
  try {
    const ProductID = req.params.ProductID;
    const reviewID = req.params.ReviewID;
    const review = await ProductSchema.find;
  } catch (error) {}
});

//POST A REVIEW
router.post("/:ProductID/reviews", async (req, res, next) => {
  try {
    const newReview = new ReviewModel(req.body);
    await newReview.save();
    res.status(201).send(newReview);
  } catch (error) {
    next(error);
  }
});

//MODIFY A REVIEW
router.put("/:ProductID/reviews/:reviewID", async (req, res, next) => {
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
router.delete("/:ProductID/reviews/:reviewID", async (req, res, next) => {
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
export default router;
