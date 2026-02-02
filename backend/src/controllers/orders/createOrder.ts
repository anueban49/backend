import type { RequestHandler } from "express";
import { OrderModel } from "../../database/schema/order.schema.js";

export const CreateOrder: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({message: "Unathourized"})
    }
    const Order = await OrderModel.create({
      ...body,
      userId
    });
    res.status(201).json({
      id: Order._id,
      userId: Order.userId,
      timeStamp: Order.createdAt,
      
      status: Order.status,
    });
  } catch (error: any) {
    res.status(501).json({ message: error.message });
  }
};
