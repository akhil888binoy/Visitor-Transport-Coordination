import mongoose from "mongoose";
// This schema includes details about the rides offered by employees.
const RideSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    userPicturePath: {
      type: String,
      default: " ",
    },
    employeeId: String,
    availableSeats: Number,
    vehicleType: String,
    departureTime: String,
    date: String,
    startPoint: String,
    endPoint: String,
    pickupPoint: String,
  },
  { timestamps: true }
);

const Ride = mongoose.model("Ride", RideSchema);
export default Ride;
