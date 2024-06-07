import mongoose from "mongoose";
// This schema includes details about bookings made by visitors.
const RideSchema = new mongoose.Schema(
  {
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
    picturePath: {
      type: String,
      default: " ",
    },
    visitorId: String,
    vehicleType: String,
    bookingTime: String,
    status: String,
    departureTime: String,
    startPoint: String,
    endPoint: String,
    pickupPoint: String,
  },
  { timestamps: true }
);

const Ride = mongoose.model("Ride", RideSchema);
export default Ride;
