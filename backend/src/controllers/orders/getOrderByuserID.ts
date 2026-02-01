import type { RequestHandler } from "express";
import { OrderModel } from "../../database/schema/order.schema.js";

export const getOrderByuserID: RequestHandler = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const orders = await OrderModel.find({ userId })
    .populate("items.foodId")
    .populate("userId")
    .populate("status");
  res.status(200).json({ orders });
};
