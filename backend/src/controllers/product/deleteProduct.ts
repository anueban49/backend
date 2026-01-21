import type { RequestHandler } from "express";
import { ProductModel } from "../../database/schema/product.schema.js";

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "item not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "item deleted",
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
