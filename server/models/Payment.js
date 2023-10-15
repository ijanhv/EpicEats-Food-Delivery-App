const mongoose = require("mongoose");
import { Schema } from "mongoose";

const PaymentSchema = new Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  paymentMethod: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", PaymentSchema);
