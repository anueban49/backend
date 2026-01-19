import { Schema, model, Document } from "mongoose";
const Productschema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
      type: [
        {
          url: { type: String, required: true }, // Cloudinary URL
          publicId: { type: String }, // For deletion/updates
        },
      ],
      required: true,
    },
    ingredients: [String],
    categories: {
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
