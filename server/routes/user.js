import express from 'express';
import {
  getTrips,
  updateWishlist,
  getProperties,
  getReservations
} from '../controller/user.js';

const router = express.Router();

/* GET TRIP LIST */
router.get("/:userId/trips", getTrips);

/* ADD LISTING TO WISHLIST */
router.patch("/:userId/:listingId", updateWishlist);

/* GET PROPERTY LIST */
router.get("/:userId/properties", getProperties);

/* GET RESERVATION LIST */
router.get("/:userId/reservations", getReservations);

export default router;
