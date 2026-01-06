import type { RequestHandler } from "express";
import { CategoryModel } from "../../database/schema/category.schema.js";

export const getCategories: RequestHandler = async (_req, res) => {
  const Categories = await CategoryModel.find({});
  res.status(200).json(Categories);
};
