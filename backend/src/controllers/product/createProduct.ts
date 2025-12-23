//a function that is called on POST request
import type { RequestHandler } from "express";
import { ProductModel } from "../../database/schema/product.schema.js";
export const createProduct: RequestHandler = async (req, res) => {
  const body = req.body;
  const Product = await ProductModel.create({
    name: body.name,
    price: body.price,
  });
  res.status(201).json(Product);
};
