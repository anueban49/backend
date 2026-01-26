import type { RequestHandler } from "express";
import { CategoryModel } from "../../database/schema/category.schema.js";

export const getCategories: RequestHandler = async (_req, res) => {
  const Categories = await CategoryModel.find({});
  res.status(200).json(Categories);
};

export const getCategorybyId: RequestHandler = async (req, res) => {
  try {
    const item = await CategoryModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "category not found",
      });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
  }
};
