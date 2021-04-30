import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: ["electronics", "books"] },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

ProductSchema.static(
  "addReviewIdToProduct",
  async function (ReviewID, ProductID) {
    await ProductModel.findByIdAndUpdate(
      ProductID,
      {
        $push: {
          reviews: ReviewID,
        },
      },
      { runValidators: true, new: true }
    );
  }
);

export default model("Product", ProductSchema);

/*
{
      "name": "app test 1",  //REQUIRED
      "description": "something longer", //REQUIRED
      "brand": "nokia", //REQUIRED
      "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80", //REQUIRED
      "price": 100, //REQUIRED
      "category": "smartphones"
      "createdAt": "2019-07-19T09:32:10.535Z", // Server Generated
      "updatedAt": "2019-07-19T09:32:10.535Z", // Server Generated
  }
{
    "comment": "A good book but definitely I don't like many parts of the plot", //REQUIRED
    "rate": 3, //REQUIRED, max 5
    "createdAt": "2019-08-01T12:46:45.895Z" // Server Generated
}*/
