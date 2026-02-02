import { Schema, model } from "mongoose";
//if user redeemd gift card, this has to take care of the balance - its just a mock thingy for testing the order proceedings
const TransactionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    transaction: {
      payment: { type: Number, required: true },
      orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    },
    paymentMethod: { type: String, enum: ["giftcard", "credit", "debit"] },
  },
  {
    timestamps: true,
  },
);
export const TransactionModel = model("Category", TransactionSchema);
