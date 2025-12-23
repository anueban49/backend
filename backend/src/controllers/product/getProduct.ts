//a function that operates on GET request
import type { RequestHandler } from "express";
import { ProductModel } from "../../database/schema/product.schema.js";

export const getProducts: RequestHandler = async (_req, res) => {
  const products = await ProductModel.find({
    //optional filtering -> for .find()
  });
  res.status(200).json(products);
};
