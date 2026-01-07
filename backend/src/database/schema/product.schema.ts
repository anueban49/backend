import { Schema, model, Document } from "mongoose";

const Productschema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: {
      type: [
        {
          url: { type: String, required: true }, // Cloudinary URL
          publicId: { type: String }, // For deletion/updates
        },
      ],
      required: false,
    },
    ingredients: [String],
    categories: [
      { type: Schema.Types.ObjectId, ref: "Category", required: true },
    ],
  },
  {
    timestamps: true,
  }
);
export const ProductModel = model("Product", Productschema);
