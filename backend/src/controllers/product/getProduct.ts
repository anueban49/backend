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
export const getProductbyId: RequestHandler = async (req, res) => {
  try {
    const item = await ProductModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "item not found",
      });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
  }
};
export const getProductsByCategory: RequestHandler = async (req, res) => {
  try {
    const { category } = req.params;
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not Found" });
    }
    const products = await ProductModel.find({ category });
    res.status(200).json(products);
  } catch (error) {
    console.error("getProductsByCategory error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products by category",
      error: String(error),
    });
  }
};
