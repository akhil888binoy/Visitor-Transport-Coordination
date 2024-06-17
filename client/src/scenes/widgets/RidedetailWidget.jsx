import { Box, Typography, Divider, FormControl } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
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

const RidedetailWidget = ({rideId , rideUserId, date, email, pickupPoint, employeeId, availableSeats, vehicleType, userPicturePath, departureTime, startPoint, endPoint, bookings}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const token = useSelector((state)=> state.token);
  const role = useSelector((state)=> state.user.role);
  const loggedInUserId = useSelector((state) => state.user._id);
  // Function to handle edit button click
  const handleEditRide = () => {
    // Redirect to edit form with event ID as URL parameter
    navigate(`/rides/${rideId}/edit`);
  };
  
  return (
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
            <Typography> Bookings : {bookings}</Typography>
          </Box>
          <Button></Button>
        </WidgetWrapper>
              
  )
}

export default RidedetailWidget