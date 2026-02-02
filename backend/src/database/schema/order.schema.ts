import { Schema, model } from "mongoose";

const Orderschema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        foodId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "paid", "delivering", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
export const OrderModel = model("Order", Orderschema);
