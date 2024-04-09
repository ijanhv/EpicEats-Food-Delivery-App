import Seat from "../models/Seat.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";


const TOTAL_SEATS = 60;

// Controller function to create a booking
export const createBooking = async (req, res) => {
  try {
    const { userId, seatNumbers, time } = req.body;

    // Check if requested number of seats exceeds total available seats
    if (seatNumbers.length > TOTAL_SEATS) {
      return res
        .status(400)
        .json({
          message: "Requested number of seats exceeds total available seats",
        });
    }

    // Find the seats to be booked
    const seats = await Seat.find({
      seatNumber: { $in: seatNumbers },
      status: "vacant",
    });
    if (!seats || seats.length !== seatNumbers.length) {
      return res
        .status(400)
        .json({
          message: "One or more seats are not available or already booked",
        });
    }

    // Mark the seats as booked
    seats.forEach(async (seat) => {
      seat.status = "booked";
      await seat.save();
    });

    // Create the booking
    const booking = new Booking({
      user: userId,
      seats: seats.map((seat) => seat._id),
      time,
      status: "booked",
    });
    await booking.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller function to cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Mark the associated seats as vacant
    const seats = await Seat.find({ _id: { $in: booking.seats } });
    seats.forEach(async (seat) => {
      seat.status = "vacant";
      await seat.save();
    });

    // Update booking status to cancelled
    booking.status = "cancelled";
    await booking.save();

    res
      .status(200)
      .json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("seats").exec();

    const user = await User.findById(bookings[0].user).exec();
    
    const formattedBookings = bookings.map((booking) => ({
      _id: booking._id,
      user: user,
      seats: booking.seats,
      time: booking.time,
      status: booking.status,
    }));
    

    res.status(200).json(formattedBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate("seats").exec();
    res.status(200).json(booking);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export const getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user: userId }).populate("seats").populate("userId").exec();
    res.status(200).json(bookings);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}