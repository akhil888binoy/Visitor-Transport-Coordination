import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,   
  ShareOutlined,
} from "@mui/icons-material";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import EventIcon from '@mui/icons-material/Event';
import { NavLink } from "react-router-dom";
import PlaceIcon from '@mui/icons-material/Place';
import { useNavigate } from "react-router-dom";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import {CardMedia} from '@mui/material';
import {useMediaQuery} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { setRide } from "../../state";
import UserImage from "../../components/UserImage";
import Button from '@mui/material/Button'; // Updated import

const RideWidget =({
  rideId,
  rideUserId,
  employeename,
  date,
  email,
  pickupPoint,
  employeeId,
  availableSeats,
  vehicleType,
  userPicturePath,
  departureTime,
  startPoint,
  endPoint,
  bookings             
})=>{
    
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const {role} = useSelector((state)=> state.user);
    const bookingCount = Object.keys(bookings).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;


    const deleteRide = async () => {
        const response = await fetch(`http://localhost:3001/rides/${rideUserId}/${rideId}/delete`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        dispatch(setRide({ ride: result }));

       
    };

    
    return(
        <WidgetWrapper m="2rem 0" >
            <Box display="flex" flexDirection="row" alignItems="center">
                {userPicturePath && (
                    <UserImage
                      image={userPicturePath}
                    />
                )}
           

                <Box display={"block"} justifyContent="space-between" alignItems="center" width="100%" mt={"1rem"} gap={  1 }>
                {role === "employee" && bookingCount > 0 && (
                    
                    <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#834bff",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        border:"0.1rem solid  #1E1E1E",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }}>
                        <Typography color="white" variant="subtitle1">
                        {bookingCount} New bookings
                        </Typography>
                    </Box>
                    )}
                <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                        Pickup Point:{pickupPoint}
                    </Typography>
                </Box>
                <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                      Seats : {availableSeats}
                    </Typography>
                </Box>
                
                    <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                      Vehicle : {vehicleType}
                    </Typography>
                </Box>
                <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                      Date : {date}
                    </Typography>
                </Box>
                <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                       Start Point : {startPoint}
                    </Typography>
                </Box>
                <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                       Employee Id: {employeeId}
                    </Typography>
                </Box>
                <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                      Employee Name : {employeename}
                    </Typography>
                </Box>
                
                <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                      End Point : {endPoint}
                    </Typography>
                </Box>
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="1rem" gap={2}>
                
              
                <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                      Departure Time : {departureTime}
                    </Typography>
                </Box>
                { rideUserId === loggedInUserId && (
                    <>
                    <Button 
                    size="small"
                        variant="contained" 
                        success
                       color="error"
                        onClick={deleteRide}
                    > Delete Ride 
                    </Button>

                    <Button 
                    size="small"
                        variant="contained" 
                        success
                    color="success"
                        onClick={deleteRide}
                    > Ride Done 
                    </Button>
                    </>
                    
                )}
                
            </Box>
            <Box mt={3} >
                {role === "employee" ? (
                    <Button 
                    variant="contained" 
                    style={{
                        borderRadius: 6,
                        padding: "0.5rem 1rem",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        size:"small",
                        backgroundColor: "#834bff", // Change background color here
                        
                    }} 
                    onClick={() => navigate(`/rides/${rideId}/ride`)}
      
                >
                    <Typography color="white" fontSize={isNonMobileScreens ? "1rem" : "0.8rem"} >
                        Details
                    </Typography>
                </Button>
                ):(
                    <Button 
                
                    variant="contained" 
                    style={{
                        borderRadius: 6,
                        padding: "0.5rem 1rem",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        size:"small",
                    }} 
                    onClick={() => navigate(`/rides/${rideId}/ride`)}
                >
                    <Typography color="white" fontSize={isNonMobileScreens ? "1rem" : "0.8rem"} >
                        Details
                    </Typography>
                </Button>
            
                )}
            
           
            </Box>
            
        </WidgetWrapper>  
    );
}
export default RideWidget;