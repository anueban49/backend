import { Router } from "express";
import { CreateOrder } from "../controllers/orders/createOrder.js";
import { getOrders } from "../controllers/orders/getOrder.js";
import { getOrderByuserID } from "../controllers/orders/getOrderByuserID.js";
import { deleteOrderByUser } from "../controllers/orders/deleteOrderbyUser.js";
import {
  staffMiddleWare,
  authMiddleWare,
} from "../middleware/auth.middleware.js";
import { updateOrderStatus } from "../controllers/orders/updateOrderStatus.js";
const OrderRouter = Router();
OrderRouter.get("/all", getOrders)
  .post("/create/:id", authMiddleWare,CreateOrder)
  .get("/:id", authMiddleWare, getOrderByuserID)
  .patch("/:id", staffMiddleWare, updateOrderStatus)
  .delete("/:id", authMiddleWare, deleteOrderByUser)
export { OrderRouter };
