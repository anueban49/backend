//a function that operates on GET request
import type { RequestHandler } from "express";
import { ProductModel } from "../../database/schema/product.schema.js";

export const getProducts: RequestHandler = async (_req, res) => {
  try {
    const products = await ProductModel.find({});
    return res.status(200).json(products);
  } catch (error) {
    console.error("getProducts error:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch products", error: String(error) });
  }
};
