import type { RequestHandler } from "express";
import { OrderModel } from "../../database/schema/order.schema.js";

export const CreateOrder: RequestHandler = async (req, res) => {
  try {
    const body = req.body;

    const Order = await OrderModel.create({
      userId: body.userId,
      items: body.items,
      totalPrice: body.totalPrice,
      status: "pending",
    });
    res.status(201).json({
      id: Order._id,
      timeStamp: Order.createdAt,
      userId: Order.userId,
      status: Order.status,
    });
  } catch (error: any) {
    res.status(501).json({ message: error.message });
  }
};
