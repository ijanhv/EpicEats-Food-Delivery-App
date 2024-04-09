import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    seats: [{
      type: Schema.Types.ObjectId,
      ref: 'Seat',
      required: true
    }],
    time: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['booked', 'cancelled'],
      default: 'booked'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

export default mongoose.model("Booking", bookingSchema);
