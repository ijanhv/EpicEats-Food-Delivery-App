import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  location : {
    type: String,

},

  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["received", "preparing", "completed", "done"],
    default: "received",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", OrderSchema);
