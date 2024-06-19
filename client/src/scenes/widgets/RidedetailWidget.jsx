import { Box, Typography, Divider, FormControl } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector , useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from '@mui/material';
import {Link} from "@mui/material";
import UserWidget from "./UserWidget";
import {InputBase} from "@mui/material";
import Event from "@mui/icons-material/Event";
import UserImage from "../../components/UserImage";
import {useMediaQuery} from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Category, Language, LocalActivity, LocationOn, Star } from "@mui/icons-material";
import { setRide } from "../../state";
import BookedUserWidget from "./BookedUserWidget";
const RidedetailWidget = ({rideId , rideUserId, date, pickupPoint, employeeId, availableSeats, vehicleType, userPicturePath, departureTime, startPoint, endPoint, bookings}) => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const token = useSelector((state)=> state.token);
  const role = useSelector((state)=> state.user.role);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isBooked = Boolean(bookings[loggedInUserId]);
  const bookingCount = Object.keys(bookings).length;
  const userIds = Object.keys(bookings);

  // Function to handle edit button click
  const handleEditRide = () => {
    // Redirect to edit form with event ID as URL parameter
    navigate(`/rides/${rideId}/edit`);
  };
  const patchRide = async () => {
    const response = await fetch(`http://localhost:3001/rides/${rideId}/booking`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    if (response.status === 400) {
      // Backend returned a "No available seats" message
      const data = await response.json();
      alert(data.message);
      return;
    }
    const updatedRide = await response.json();
    dispatch(setRide({ ride: updatedRide }));
    
  };
  
  return (
    <>
    <WidgetWrapper mt={"2rem"} width={"60%"}>
          <UserImage image={userPicturePath}>
          </UserImage>
          <Box >
            <Typography> Departure date : {date}</Typography>
            <Typography> PickupPoint : {pickupPoint}</Typography>
            <Typography> Employee ID :{employeeId}</Typography>
            <Typography>Vehicle Type :{vehicleType}</Typography>
            <Typography>Departure Time :{departureTime}</Typography>
            <Typography>StartPoint : {startPoint}</Typography>
            <Typography>End Point : {endPoint}</Typography>
            <Typography> Available Seats : {availableSeats}</Typography>
          </Box> 
          {role === "visitor" && (
            <>
              <FlexBetween gap="0.3rem" mt={"1rem"}>
              <Button  onClick={patchRide} variant={isBooked? "contained": "outlined"} color={isBooked? "error": "primary"}>
          {isBooked ? "Cancel Ride": "Book Ride"}
        </Button>
              </FlexBetween>
            </>  
          )}
          <Typography mt={"1rem"}> Bookings for this ride : {bookingCount}</Typography>

         


        </WidgetWrapper>
          {role === "employee" && (
            <>
            <Typography mt={"1rem"} fontSize={isNonMobile? "2rem" : "1rem"} color={"#834bff"} > Visitors Booked this Ride : </Typography>
            {userIds.map((userId) => (
              <Box key={userId} mt={"1rem"}>
               <BookedUserWidget key={userId} userId={userId} ></BookedUserWidget>
              </Box> 
            ))}
            </>
          )}
          
    </>
        
              
  )
}

export default RidedetailWidget