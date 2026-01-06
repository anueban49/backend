import type { RequestHandler } from "express";
import { CategoryModel } from "../../database/schema/category.schema.js";

export const createCategory: RequestHandler = async (req, res) => {
  try {
    const body = req.body;

    const Category = await CategoryModel.create({
      name: body.name,
    });
    res.status(201).json(Category);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
