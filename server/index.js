import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import listingRoutes from "./routes/listing.js";
import bookingRoutes from "./routes/booking.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = 3000;

app.use("/api/auth", authRoutes);
app.use("/api/properties", listingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes)

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Trip_Hive",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`{err} did not connect`);
  });
