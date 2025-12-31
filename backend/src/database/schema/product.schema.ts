import { Schema, model, Document } from "mongoose";
// import { required } from "zod/v4-mini";

//The extends Document part means the IProduct interface is
// inheriting from the Document interface, which comes from Mongoose (the MongoDB ODM for Node.js).
// export interface FoodProduct extends Document {
//   name: string;
//   description: string;
//   price: number;
//   category?: string;
//   stock?: number;
//   images?: string[];
//   attrs?: Record<string, string>;
//   createdAt: Date;
//   updatedAt: Date;
// }
// const FoodSchema = new Schema<FoodProduct>(
//   {
//     name: { type: String, required: true, index: "text" },
//     description: { type: String, index: "text" },
//     price: { type: Number, required: true },
//     category: { type: String, index: true },
//     stock: { type: Number, default: 0 },
//     images: [String],
//     attrs: { type: Schema.Types.Mixed },
//   },
//   { timestamps: true }
// );
// FoodSchema.index({ name: "text", description: "text" });

// export const ProductModel = model<FoodProduct>('Food', FoodSchema);
const Productschema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, index: "text" },
    images: {
      url: String, // Cloudinary URL
      publicId: String, // For deletion/updates
    },
    ingredients: [String],
  },
  {
    timestamps: true,
  }
);
export const ProductModel = model("Products", Productschema);
