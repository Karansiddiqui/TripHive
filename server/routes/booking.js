import express from 'express';
import { createBooking } from '../controller/booking.js';

const router = express.Router();

/* CREATE BOOKING */
router.post("/create", createBooking);

export default router;
