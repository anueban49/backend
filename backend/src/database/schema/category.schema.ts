import { Schema, model } from "mongoose";

const Categoryschema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export const CategoryModel = model("Category", Categoryschema);
