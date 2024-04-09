import { Router } from "express";
import { bookSeat, createSeats, getAllSeats, markSeatVacant } from "../controller/Seat.js";
const router = Router();
// Route to get all seats

router.post('/', createSeats);

router.get('/', getAllSeats);

// Route to book a seat
router.post('/book', bookSeat);

// Route to mark a seat as vacant
router.put('/:seatNumber/vacant', markSeatVacant);

export default router;