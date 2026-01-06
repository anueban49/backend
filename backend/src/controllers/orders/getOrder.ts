import type { RequestHandler } from "express";
import { OrderModel } from "../../database/schema/order.schema.js";

export const getOrders: RequestHandler = async (_req, res) => {
  const Orders = await OrderModel.find({});
  res.status(200).json(Orders);
};
