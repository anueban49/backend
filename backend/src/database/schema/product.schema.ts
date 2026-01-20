import { Schema, model, Document } from "mongoose";
const Productschema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
      type: String,
      required: true,
    },
    ingredients: [String],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const ProductModel = model("Product", Productschema);
