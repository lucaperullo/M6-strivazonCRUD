import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ReviewsSchema = new Schema(
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

export default model("Reviews", ReviewsSchema);
