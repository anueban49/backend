import type { RequestHandler } from "express";
import { OrderModel } from "../../database/schema/order.schema.js";

export const updateOrderStatus: RequestHandler = async (req, res) => {
  
  const orderId = req.body._id;
  const statustoUpdate = req.body.status;
  if (!orderId) {
    return res.status(404).json({ message: "order not found [backend]" });
  }
  try {
    const updated = await OrderModel.findByIdAndUpdate(
      orderId,
      { status: statustoUpdate },
      { new: true },
    );
    if (!updated) {
      return res
        .status(400)
        .json({ message: "failed to update status [backend]" });
    }
    return res.status(201).json({ status: updated.status });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error });
  }
};
