import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import { verifyToken } from "./middleware/auth.js";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { createRide } from "./controllers/rides.js";
import authRoutes from "./routes/auth.js";
import rideRoutes from "./routes/rides.js";
// import bookingRoutes from "./routes/bookings.js";
import userRoutes from "./routes/users.js";
import User from "./models/User.js";
import Ride from "./models/Ride.js";
import { users, rides } from "./data/index.js";
import { verify } from "crypto";

/*CONFIGURATION*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/*FILE STORAGE*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/rides", verifyToken, upload.single("picture"), createRide); //Ride created by employee

/*ROUTES*/

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/rides", rideRoutes);
// app.use("/bookings", bookingRoutes);

/* MONGOOSE SETUP*/
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server Port : ${PORT} running successfully`)
    );
    /* ADD DATA ONE TIME*/
    // User.insertMany(users);
    // Ride.insertMany(rides);
  })
  .catch((error) => console.log(`${error} did not connect`));
