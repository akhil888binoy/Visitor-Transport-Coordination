import express from "express";
import {
  getFeedRides,
  getUserRides,
  getRideDetails,
  deleteRide,
  updateRide,
} from "../controllers/rides.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/", getFeedRides);
router.get("/:userId/rides", getUserRides);
router.get("/:rideId/ride", getRideDetails);

/*UPDATE*/
router.patch("/:rideId/update", verifyToken, updateRide); // Define the update route

/* DELETE */
router.delete("/:userId/:rideId/delete", verifyToken, deleteRide);

export default router;
