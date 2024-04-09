import Seat from "../models/Seat.js";

// Controller function to get all seats
export const getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSeats = async (req, res) => {
    try {

        const seats = [];
        for (let i = 1; i <= 60; i++) {
        seats.push({ seatNumber: i, status: 'vacant' });
        }
    
        await Seat.insertMany(seats);
        res.status(201).json({ message: 'Seats created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }


// Controller function to book a seat
export const bookSeat = async (req, res) => {
  try {
    const { seatNumber } = req.body;

    // Check if the seat exists and is vacant
    const seat = await Seat.findOne({ seatNumber, status: 'vacant' });
    if (!seat) {
      return res.status(400).json({ message: 'Seat not available or already booked' });
    }

    // Update the seat status to booked
    seat.status = 'booked';
    await seat.save();

    res.status(200).json({ message: 'Seat booked successfully', seat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to mark a seat as vacant
export const markSeatVacant = async (req, res) => {
  try {
    const { seatNumber } = req.params;
    console.log(seatNumber);


    // Check if the seat exists and is booked
    const seat = await Seat.findOne({ seatNumber, status: 'booked' });
    console.log(seat);
    if (!seat) {
      return res.status(400).json({ message: 'Seat is not currently booked' });
    }

    // Update the seat status to vacant
    seat.status = 'vacant';
    await seat.save();

    res.status(200).json({ message: 'Seat marked as vacant successfully', seat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
