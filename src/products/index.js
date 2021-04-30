import express from "express";
import ProductModel from "./product-Schema.js";
// import ReviewsSchema from "../reviews/review-Schema.js";
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
      error.statusCode = 400;
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
    res.send({reviews: products.reviews});
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
      { reviews: {
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
      error.statusCode = 404;
      next(error);
    }
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
productsRouter.delete(
  "/:ProductID/reviews/:reviewID",
  async (req, res, next) => {
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
  }
);
export default productsRouter;
