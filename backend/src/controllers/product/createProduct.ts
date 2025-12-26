//a function that is called on POST request
import type { RequestHandler } from "express";
import { ProductModel } from "../../database/schema/product.schema.js";
import cloudinary from "../../database/cloudinary.js";

const imageBase = await cloudinary.uploader.upload(filePath, {
  folder: "cateringImages",
  use_filename: true,
  unique_filename: false,
});

export const createProduct: RequestHandler = async (req, res) => {
  const body = req.body;
  const Product = await ProductModel.create({
    name: body.name,
    price: body.price,
    image: body.image, //it expects url.
    ingredients: body.ingredients,
  });
  res.status(201).json(Product);
};
