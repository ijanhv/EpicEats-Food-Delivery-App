import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the Seat schema
const seatSchema = new Schema({
  seatNumber: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['vacant', 'booked'],
    default: 'vacant'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Seat model
export default mongoose.model("Seat", seatSchema);
