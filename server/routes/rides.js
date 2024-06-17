import express from "express";
import {
  getFeedRides,
  getUserRides,
  getRideDetails,
  deleteRide,
  updateRide,
  BookRide,
} from "../controllers/rides.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/", getFeedRides);
router.get("/:userId/rides", getUserRides);
router.get("/:rideId/ride", getRideDetails);

/*UPDATE*/
router.patch("/:rideId/update", verifyToken, updateRide); // Define the update route
router.patch("/:id/booking", verifyToken, BookRide);

/* DELETE */
router.delete("/:userId/:rideId/delete", verifyToken, deleteRide);

export default router;
