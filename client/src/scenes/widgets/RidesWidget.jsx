import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRides } from "../../state";
import RideWidget from "./RideWidget";
import {Typography, Button} from "@mui/material";
import Search from "../../components/Search";
import Sort from "../../components/Sort";
import PickupPoint from "../../components/PickupPoint";
import {useMediaQuery} from "@mui/material";
import { Box } from "@mui/material";
import CustomPagination from "../../components/CustomPagination";


const RidesWidget = ({ userId, isProfile = false , isBookedRides=false }) => {
  const dispatch = useDispatch();
  const rides = useSelector((state) => state.rides);
  const token = useSelector((state) => state.token);
  const Role = useSelector((state)=> state.user.role);
  const firstName = useSelector((state)=> state.user.firstName);
  const [sort, setSort] = useState(JSON.parse(localStorage.getItem("rideSort")) || { sort: "departureTime", order: "desc" });
  const [filterPickupPoint, setFilterPickupPoint] = useState(JSON.parse(localStorage.getItem("rideFilterPickupPoint")) || []);
  const [filterAvailableSeats, setFilterAvailableSeats] = useState(JSON.parse(localStorage.getItem("rideFilterAvailableSeats")) || "");
  const [filterStartingPoint, setFilterStartingPoint] = useState(JSON.parse(localStorage.getItem("rideFilterStartingPoint")) || "")
  const [filterEndPoint, setFilterEndPoint] = useState(JSON.parse(localStorage.getItem("rideFilterEndPoint")) || "")
  const [filterDate, setFilterDate] = useState(JSON.parse(localStorage.getItem("")) || "")
  const [page, setPage] = useState(isProfile ? 1 : parseInt(localStorage.getItem("ridePage")) || 1);
  const [search, setSearch] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

 
  
  
  const clearFilters = () => {
    setFilterPickupPoint([]); // Clear filterTheme state
    setFilterAvailableSeats(""); // Optionally clear location filter as well
    setFilterStartingPoint(""); 
    setFilterEndPoint("");
    setFilterDate("");
    setPage(1); // Reset page to 1 when filters are cleared
    localStorage.removeItem("rideFilterPickupPoint"); // Remove stored filterTheme from localStorage
    localStorage.removeItem("rideFilterAvailableSeats"); // Optionally remove stored filterLocation as well
    localStorage.removeItem("rideFilterStartingPoint");
    localStorage.removeItem("rideFilterEndPoint");
    localStorage.removeItem("rideFilterDate");
   
  };

  useEffect(() => {
    const getRides = async () => {
      try {
        const filterPickupPointString = filterPickupPoint.join(",");
  
        const response = await fetch(
          `http://localhost:3001/rides?page=${page}&sort=${sort.sort},${sort.order}&pickupPoint=${filterPickupPointString}&search=${search}&availableSeats=${filterAvailableSeats}&startPoint=${filterStartingPoint}&endPoint=${filterEndPoint}&date=${filterDate}`, // Include location in the API request
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        const data = await response.json();
  
        dispatch(setRides({ rides: data }));
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    };
  
    const getUserRides = async () => {
      const filterPickupPointString = filterPickupPoint.join(",");
      const response = await fetch(
        `http://localhost:3001/rides/${userId}/rides?page=${page}&sort=${sort.sort},${sort.order}&pickupPoint=${filterPickupPointString}&search=${search}&availableSeats=${filterAvailableSeats}&startPoint=${filterStartingPoint}&endPoint=${filterEndPoint}&date=${filterDate}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setRides({ rides: data }));
    };

    const getBookedRides = async () => {
      const filterPickupPointString = filterPickupPoint.join(",");
      const response = await fetch(
        `http://localhost:3001/rides/${userId}/bookedrides?page=${page}&sort=${sort.sort},${sort.order}&pickupPoint=${filterPickupPointString}&search=${search}&availableSeats=${filterAvailableSeats}&startPoint=${filterStartingPoint}&endPoint=${filterEndPoint}&date=${filterDate}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setRides({ rides: data }));
    };
  
    if (isProfile) {
      getUserRides();
      
    } else if(isBookedRides){
      getBookedRides();
    }
     else {
      getRides();
    }
  }, [sort, filterPickupPoint, filterAvailableSeats, filterStartingPoint, filterEndPoint, filterDate, page, search, userId, isProfile, token]);
  

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1); // Reset page to 1 when sorting changes
    localStorage.setItem("rideSort", JSON.stringify(newSort));
  };

  const handleFilterPickupPointChange = (newFilterPickupPoint) => {
    setFilterPickupPoint(newFilterPickupPoint);
    setPage(1); // Reset page to 1 when filter changes
    localStorage.setItem("rideFilterPickupPoint", JSON.stringify(newFilterPickupPoint));
  };

  const handleFilterAvailableSeatsChange = (newAvailableSeats) => {
    setFilterAvailableSeats(newAvailableSeats);
    setPage(1); // Reset page to 1 when location filter changes
    localStorage.setItem("rideFilterAvailableSeats", JSON.stringify(newAvailableSeats));
  };

  const handleFilterStartingPointChange = (newStartingPoint)=>{
    setFilterStartingPoint(newStartingPoint);
    setPage(1);
    localStorage.setItem("rideFilterStartingPoint", JSON.stringify(newStartingPoint) );
  }

  const handleFilterEndPointChange = (newEndPoint)=>{
    setFilterEndPoint(newEndPoint);
    setPage(1);
    localStorage.setItem("rideFilterEndPoint", JSON.stringify(newEndPoint) );
  }

  const handleFilterDateChange = (newDate)=>{
    setFilterDate(newDate);
    setPage(1);
    localStorage.setItem("rideFilterDate", JSON.stringify(newDate) );
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
    localStorage.setItem("ridePage", newPage);
   
  };

  return (
    <Box>
      {/* Filters */}
      <Box mt={3}  >
        <Box display={"flex"} gap={ isNonMobile?  7 : 2}>
          <Box>
          <Sort sort={sort} setSort={handleSortChange} />
          </Box>
          <Box textAlign={"center"}>
            {Role == "visitor" ? (
              <>
               <Typography fontSize={isNonMobile? "2rem" : "1rem"} color={"primary"} > Welcome !  </Typography>
                 <Typography fontSize={isNonMobile? "3rem" : "2rem"} color={"primary"} fontWeight={"bold"} >{firstName} </Typography>
              </>
                
            ):(
              <>
              <Typography fontSize={isNonMobile? "2rem" : "1rem"} color={"#834bff"} > Welcome !  </Typography>
              <Typography fontSize={isNonMobile? "3rem" : "2rem"} color={"#834bff"} fontWeight={"bold"} >{firstName} </Typography>
            
              </>
              
            )}
           
          </Box>
        

        </Box>
        <Box mt={2}>
        <Search
          value={filterAvailableSeats}
          onChange={handleFilterAvailableSeatsChange}
          placeholder="Search by Available Seats"
        />
       <Search
          value={filterStartingPoint}
          onChange={handleFilterStartingPointChange}
          placeholder="Search by Starting Point"
        />
        <Search
          value={filterEndPoint}
          onChange={handleFilterEndPointChange}
          placeholder="Search by End Point"
        />
        <Search
          value={filterDate}
          onChange={handleFilterDateChange}
          placeholder="Search by Date"
        />
        </Box>
        
        <Box mt={2}>
        <PickupPoint
          filterPickupPoint={filterPickupPoint}
          pickupPoints={rides.pickupPoint ? rides.pickupPoint : []}
          setFilterPickupPoint={handleFilterPickupPointChange}
        />
        </Box>
        <Box mt={2}>
        { Role==="visitor" ? (
           <Button variant="outlined" onClick={clearFilters}>
           <Typography fontSize={"1rem"}>  Clear Filters</Typography>
         </Button>
        ):(
          <Button  variant="outlined"
          sx={{ 
            fontSize: '1.25rem', // Change font size here
            padding: '12px 24px',
            color:"#834bff",
            borderColor:"#834bff"  ,
            '&:hover': {
              color: '#fff', // Change text color on hover
              backgroundColor: '#834bff', // Change background color on hover
              borderColor: '#834bff', // Change border color on hover
            },       
          }} onClick={clearFilters}>
              <Typography fontSize={"1rem"}>  Clear Filters</Typography>
            </Button>
        )}
       

         
        </Box>
      { Role === "employee" ? (
          <Typography mt={"1rem"} fontSize={isNonMobile? "3rem" : "1rem"} color={"#834bff"} > Your Rides </Typography>
      ):(
        <Typography mt={"1rem"} fontSize={isNonMobile? "3rem" : "1rem"} color={"primary"} > Rides For You </Typography>
      )}

      </Box>
      {/* Ride Listings */}
      <Box>
        {Array.isArray(rides.rides) &&
          rides.rides.map(
            ({
              _id,
              userId,
              firstName,
              lastName,
              date,
              employeeId,
              email,
              vehicleType, 
              userPicturePath,
              availableSeats,
              departureTime,
              startPoint,
              endPoint,
              pickupPoint,
              bookings
            }) => (
              <RideWidget
                key={_id}
                rideId={_id}
                rideUserId={userId}
                employeename={`${firstName} ${lastName}`}
                date={date}
                email={email}
                pickupPoint={pickupPoint}
                employeeId={employeeId}
                availableSeats={availableSeats}
                vehicleType={vehicleType}
                userPicturePath={userPicturePath}
                departureTime={departureTime}
                startPoint={startPoint}
                endPoint={endPoint}
                bookings={bookings}
              />
            )
          )}
           <Box display={"flex" } justifyContent={"center"}>
      <CustomPagination
        page={page}
        limit={rides.limit ? rides.limit : 0}
        total={rides.total ? rides.total : 0}
        setPage={handlePageChange}
      />
    </Box>
        
      </Box>
    </Box>
  );
};

export default RidesWidget;