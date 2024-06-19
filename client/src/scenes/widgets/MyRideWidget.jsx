import {
    EventSeat,
    DirectionsCar,
    AccessTime,
    AddLocation,
    PersonPinCircle
} from "@mui/icons-material";
import { Box, Divider, Typography, InputBase, useTheme, Button ,  useMediaQuery, TextField } from "@mui/material";

import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRides } from "../../state";
import FlexBetween from "../../components/FlexBetween";
import { LocationOn } from "@mui/icons-material";
import { InsertInvitation } from "@mui/icons-material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { format } from "date-fns";

import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';


const MyRideWidget = ({picturePath}) => {
    const dispatch = useDispatch();
    const [openSnackbar, setOpenSnackbar] = useState(false);
   
    const [availableSeats, setAvailableSeats] = useState("");    
    const [ vehicleType, setVehicleType] = useState("");  
    const[departureTime, setDepartureTime] = useState("");
    const [startPoint, setStartPoint]= useState("");  
    const [endPoint, setEndPoint] = useState("");
    const[pickupPoint, setPickupPoint] = useState("");
    const[date, setDate] = useState("");
    const {palette} = useTheme();
    const {_id} = useSelector((state)=> state.user);
    const token = useSelector((state)=> state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
   

    const handleSnackbarOpen = () => {
      setOpenSnackbar(true);
    };
    
 

    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
    
      setOpenSnackbar(false);
    };
    
    const handleRide = async() =>{
      
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("availableSeats", availableSeats);
        formData.append("vehicleType", vehicleType);
        formData.append('date', format(date, 'iiii, MMMM dd, yyyy'));
        formData.append("departureTime", format(departureTime,'hh:mm a'));
        formData.append("startPoint", startPoint);
        formData.append("endPoint", endPoint);
        formData.append("pickupPoint", pickupPoint);
       
       
        const response = await fetch(`http://localhost:3001/rides`,{
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            body: formData
        });
        const rides = await response.json();
        dispatch(setRides({rides}));
        setAvailableSeats("");
        setVehicleType("");
        setDepartureTime("");
        setStartPoint("");
        setEndPoint("");
        setDate("");
        setPickupPoint("");
        handleSnackbarOpen();

    }
   
 
  
  return (
    <WidgetWrapper width={isNonMobileScreens? "50%" : "100%"}>
    <Box display={"flex"} justifyContent="center" alignItems="center" gap={5}  >
        <UserImage image={picturePath}></UserImage>
        <Typography  fontSize={"3rem"} color={"#834bff"}>Ride Form</Typography>
    </Box>
   
    <Box mt={2} display="flex" alignItems="center"  marginBottom="1rem" >
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
            <EventSeat  fontSize="large" />
    </Box>
      <InputBase
      multiline
        placeholder="write down Available seats"
        onChange={(e) => setAvailableSeats(e.target.value)}
        value={availableSeats}
        sx={{
          width: '100%',
          backgroundColor: palette.neutral.light,
          borderRadius: '2rem',
          padding: '1rem 2rem',
          marginLeft: '1rem', // Add margin to create space between the icon and the input

        }}
        
      />
    </Box>

    <Box mt={2} display="flex" alignItems="center"  marginBottom="1rem" >
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
            <DirectionsCar color="#834bff" fontSize="large" />
    </Box>

      <InputBase
      multiline
        placeholder="write down Vehicle Type"
        onChange={(e) => setVehicleType(e.target.value)}
        value={vehicleType}
        sx={{
          width: '100%',
          backgroundColor: palette.neutral.light,
          borderRadius: '2rem',
          padding: '1rem 2rem',
          marginLeft: '1rem', // Add margin to create space between the icon and the input

        }}
      />
    </Box>
    
    <Box mt={2} display="flex" alignItems="center" marginBottom="1rem">
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
        <InsertInvitation  fontSize="large" />
    </Box>
  <Box ml={4}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        type="date"
        value={date}
        onChange={(newDate) => setDate(newDate)}
        renderInput={(params) => (
          <InputBase
            {...params}
            placeholder="Select ride date"
            sx={{
              width: '100%',
              backgroundColor: palette.neutral.light,
              borderRadius: '2rem',
              padding: '1rem 2rem',
              marginLeft: '1rem',
            }}
          />
        )}
      />
    </LocalizationProvider>
  </Box>
</Box>

         

<Box display="flex" alignItems="center" marginBottom="1rem">
<LocalizationProvider dateAdapter={AdapterDateFns}>
<Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
      <AccessTime fontSize="large" />
    </Box>
      <MobileTimePicker
        label="Select Departure Time"
        value={departureTime}
        onChange={(newValue) => {
          setDepartureTime(newValue);
        }}
        sx={{ marginLeft: '2rem'}}
        renderInput={(params) => <TextField {...params} sx={{ marginLeft: '2rem' }} />}
      />
    </LocalizationProvider>   
</Box>
   
       
        <Box display="flex" alignItems="center" marginBottom="1rem">
        <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >       <AddLocation color="#834bff" fontSize="large" />

    </Box>
      <TextField
      multiline
      fullWidth
      label="Start Point"
        placeholder="write down Start Point"
        onChange={(e) => setStartPoint(e.target.value)}
        value={startPoint}
        sx={{ marginLeft: '1rem' }}


      />
    </Box>
    
    <Box display="flex" alignItems="center" marginBottom="1rem">
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
            <LocationOn color="#834bff" fontSize="large" />

    </Box>
      <TextField
      multiline
      fullWidth
      label="End Point"
        placeholder="write down End Point"
        onChange={(e) => setEndPoint(e.target.value)}
        value={endPoint}
        sx={{ marginLeft: '1rem' }}
      />
    </Box>
         
    <Box display="flex" alignItems="center" marginBottom="1rem">
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
        <PersonPinCircle color="#834bff" fontSize="large" />

    </Box>
  <TextField
    fullWidth
    multiline
    label="Pickup Point"
    value={pickupPoint}
    onChange={(e) => setPickupPoint(e.target.value)}
    sx={{ marginLeft: '1rem' }}
    variant="outlined"
    />
</Box>

   
  
                  

    <Divider sx={{margin: "1.25rem 0"}}></Divider>

    <FlexBetween>
        

       

       
        <Button
          
          onClick={handleRide}
          sx={{
            color: palette.background.alt,
            backgroundColor: "#834bff",
            borderRadius: "3rem",
          }}
        >
          POST RIDE
        </Button>
        
    </FlexBetween>
    <Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  onClose={handleSnackbarClose}
>
  <MuiAlert
    elevation={6}
    variant="filled"
    onClose={handleSnackbarClose}
    severity="success"
  >
    Ride created successfully go to home page
  </MuiAlert>
</Snackbar>

    </WidgetWrapper>
  )
}

export default MyRideWidget