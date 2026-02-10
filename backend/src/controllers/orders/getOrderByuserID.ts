import type { RequestHandler } from "express";
import { OrderModel } from "../../database/schema/order.schema.js";

export const getOrderByuserID: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({ message: "Failed to authorize user." });
  }
  try {
    const orders = await OrderModel.find({ userId: id })
      .populate("items.foodId")
      .populate("userId")
      .populate("status");
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "failed to fetch orders for the user",
        error: String(error),
      });
  }
};
