import type { RequestHandler } from "express";
import { CategoryModel } from "../../database/schema/category.schema.js";

export const deleteCategory: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await CategoryModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "category n0t found",
      });
    }
    res.status(200).json({
      success: true,
      message: "category deleted",
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
