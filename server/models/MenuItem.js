import mongoose from "mongoose";
const { Schema } = mongoose;

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  featured: { type: Boolean, default: false, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

export default mongoose.model("MenuItem", MenuItemSchema);
