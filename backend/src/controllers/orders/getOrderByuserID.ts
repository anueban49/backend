import type { RequestHandler } from "express";
import { OrderModel } from "../../database/schema/order.schema.js";

export const getOrderByuserID: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const userId = req.body.userId
  if (!id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const orders = await OrderModel.findOne({ userId })
    .populate("items.foodId")
    .populate("userId")
    .populate("status");
  res.status(200).json({ orders });
};
