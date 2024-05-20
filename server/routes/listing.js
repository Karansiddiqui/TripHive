import express from 'express';
import multer from 'multer';
import {
  createListing,
  getListingsByCategory,
  searchListings,
  getListingDetails
} from '../controller/listing.js';

const router = express.Router();

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* CREATE LISTING */
router.post("/create", upload.array("listingPhotos"), createListing);

/* GET LISTINGS BY CATEGORY */
router.get("/", getListingsByCategory);

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", searchListings);

/* LISTING DETAILS */
router.get("/:listingId", getListingDetails);

export default router;
