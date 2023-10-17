import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  verified: { type: Boolean, default: false, required: true },
  verificationToken: { type: String, required: true },
  mobile: { type: String },
  role: { type: String, enum: ["admin", "student", "faculty"], default: "student" },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],

  createdAt: { type: Date, default: Date.now, required: true },
});

export default mongoose.model("User", UserSchema);
