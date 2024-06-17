import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import Navbar from '../navbar';
import UserWidget from '../widgets/UserWidget';
import RidedetailWidget from '../widgets/RidedetailWidget';
import { setRide } from '../../state'; // Ensure correct import path

const RideDetailPage = () => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { rideId } = useParams();
  const token = useSelector((state) => state.token);
  const rides = useSelector((state) => state.rides.rides);
  
  // Find the ride in the state using rideId
  const currentRide = rides.find((ride) => ride._id === rideId);

  const getRide = async () => {
    const response = await fetch(`http://localhost:3001/rides/${rideId}/ride`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setRide(data));
  };

  useEffect(() => {
    getRide();
  }, [rideId]); // Fetch ride data whenever rideId changes

  return (
    <Box>
      <Navbar />
      <Box>
        {currentRide && (
          <RidedetailWidget
            rideId={currentRide._id}
            rideUserId={currentRide.userId}
            date={currentRide.date}
            pickupPoint={currentRide.pickupPoint}
            employeeId={currentRide.employeeId}
            availableSeats={currentRide.availableSeats}
            vehicleType={currentRide.vehicleType}
            userPicturePath={currentRide.userPicturePath}
            departureTime={currentRide.departureTime}
            startPoint={currentRide.startPoint}
            endPoint={currentRide.endPoint}
            bookings={currentRide.bookings}
          />
        )}
      </Box>
    </Box>
  );
};

export default RideDetailPage;
