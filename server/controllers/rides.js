import User from "../models/User.js";
import Ride from "../models/Ride.js";

/*CREATE*/
export const createRide = async (req, res) => {
  try {
    const {
      userId,
      availableSeats,
      vehicleType,
      departureTime,
      startPoint,
      endPoint,
      pickupPoint,
    } = req.body;
    const user = await User.findById(userId);

    const newRide = new Ride({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
      employeeId: user.employeeId,
      availableSeats,
      vehicleType,
      departureTime,
      startPoint,
      endPoint,
      pickupPoint,
    });
    await newRide.save();

    const ride = await Ride.find(); //grabs all the Rides and display it on frontend
    res.status(201).json(ride);
  } catch (err) {
    console.error(err.stack);
    res.status(409).json({ message: err.message });
  }
};

/*READ*/

export const getFeedRides = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) - 1 || 0;
    const limit = parseInt(req.query.limit, 10) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "departureTime";
    const availableSeats = req.query.availableSeats || "";
    const startPoint = req.query.startPoint || "";
    const endPoint = req.query.endPoint || "";
    const pickupPoint = req.query.pickupPoint || "";

    // Split and parse the sort parameter
    sort = sort.split(",");
    let sortBy = {};
    if (sort.length > 1) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    // Construct the filter object for MongoDB query
    let filter = {};

    if (availableSeats) {
      filter.availableSeats = { $gte: parseInt(availableSeats, 10) };
    }
    if (startPoint) {
      filter.startPoint = { $regex: startPoint, $options: "i" };
    }
    if (endPoint) {
      filter.endPoint = { $regex: endPoint, $options: "i" };
    }
    if (pickupPoint) {
      filter.pickupPoint = { $regex: pickupPoint, $options: "i" };
    }
    if (search) {
      filter.$or = [
        { startPoint: { $regex: search, $options: "i" } },
        { endPoint: { $regex: search, $options: "i" } },
        { pickupPoint: { $regex: search, $options: "i" } },
      ];
    }

    // Query rides with search, filter, sorting, and pagination
    const rides = await Ride.find(filter)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    // Count total matching documents for pagination
    const total = await Ride.countDocuments(filter);

    // Prepare response object
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      rides,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRideDetails = async (req, res) => {
  try {
    const { rideId } = req.params;
    const ride = await Ride.findOne({ _id: rideId }); // assuming rideId corresponds to MongoDB _id
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    res.status(200).json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserRides = async (req, res) => {
  try {
    const { userId } = req.params;

    const page = parseInt(req.query.page, 10) - 1 || 0;
    const limit = parseInt(req.query.limit, 10) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "departureTime";
    const availableSeats = req.query.availableSeats || "";
    const startPoint = req.query.startPoint || "";
    const endPoint = req.query.endPoint || "";
    const pickupPoint = req.query.pickupPoint || "";

    // Split and parse the sort parameter
    sort = sort.split(",");
    let sortBy = {};
    if (sort.length > 1) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    // Construct the filter object for MongoDB query
    let filter = { userId: userId };

    if (availableSeats) {
      filter.availableSeats = { $gte: parseInt(availableSeats, 10) };
    }
    if (startPoint) {
      filter.startPoint = { $regex: startPoint, $options: "i" };
    }
    if (endPoint) {
      filter.endPoint = { $regex: endPoint, $options: "i" };
    }
    if (pickupPoint) {
      filter.pickupPoint = { $regex: pickupPoint, $options: "i" };
    }
    if (search) {
      filter.$or = [
        { startPoint: { $regex: search, $options: "i" } },
        { endPoint: { $regex: search, $options: "i" } },
        { pickupPoint: { $regex: search, $options: "i" } },
      ];
    }

    // Query rides with search, filter, sorting, and pagination
    const rides = await Ride.find(filter)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    // Count total matching documents for pagination
    const total = await Ride.countDocuments(filter);

    // Prepare response object
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      rides,
    };

    // Send response
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*DELETE*/
export const deleteRide = async (req, res) => {
  try {
    const { rideId, userId } = req.params; // Assuming userId is passed as a parameter
    // Alternatively, you can use req.query or req.body depending on how userId is passed

    // Find the ride by ID
    const ride = await Ride.findById(rideId);

    // Check if the ride exists
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // Check if the user is the owner of the ride
    if (ride.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this Ride" });
    }

    // Delete the ride
    await Ride.findByIdAndDelete(rideId);

    res.status(200).json({ message: "Ride deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
export const updateRide = async (req, res) => {
  try {
    const { rideId } = req.params; // Extract ride ID from request parameters
    const updates = req.body; // Extract updated ride details from request body

    // Find the ride by ID
    const ride = await Ride.findById(rideId);

    // Check if the ride exists
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // Check if the logged-in user is the owner of the ride

    // Update ride details with the provided updates
    Object.assign(ride, updates);

    // Save the updated ride
    await ride.save();

    res
      .status(200)
      .json({ message: "Ride details updated successfully", ride });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
