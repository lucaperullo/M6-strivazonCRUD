import mongoose from "mongoose";

const { Schema, model } = mongoose;

export const ProductSchema = new Schema(
  {
    name: String,
    img: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
  },
  { timestamps: true }
);

export const ReviewSchema = new Schema(
  {
    comment: String,
    rate: Number,
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
