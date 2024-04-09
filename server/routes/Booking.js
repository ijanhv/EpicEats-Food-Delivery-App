import { Router } from 'express';
import { cancelBooking, createBooking, getBookingById, getBookings, getBookingsByUserId } from "../controller/SeatBooking.js";

const router = Router();
// Route to create a booking
router.post("/", createBooking);
router.get("/", getBookings)
router.get("/:bookingId", getBookingById)
router.get("/:userId", getBookingsByUserId)

// Route to cancel a booking
router.delete("/:bookingId", cancelBooking);

export default router;
