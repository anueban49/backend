import type { RequestHandler } from "express";
import { OrderModel } from "../../database/schema/order.schema.js";

export const deleteOrderByUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("received order id:", id)
    const deletedOrder = await OrderModel.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
