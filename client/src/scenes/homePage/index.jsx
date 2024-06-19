import React from 'react'
import Navbar from '../navbar'
import { Box , useMediaQuery,useTheme} from '@mui/material'
import { useSelector } from 'react-redux'
import UserWidget from '../widgets/UserWidget'
import RidesWidget from '../widgets/RidesWidget'
import { Link } from 'react-router-dom'
import {Button} from '@mui/material'
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const {_id, picturePath, role} = useSelector((state)=> state.user);
  
  return (
    <Box>
      <Navbar></Navbar>
      <Box
      width={"100%"}
      padding={"2rem 6%"}
      display={isNonMobileScreens ? "flex": "block"}
      gap={"5rem"}

      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath}>
            </UserWidget>
        </Box>
        {role=='employee' && (
            <Box 
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
            >
          <Link to="/employee/offerridePage" >
        <Button 
         variant="outlined"
         size="large"
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
         }}
         // Adjust size here
        >
          Add your Ride
        </Button>
      </Link>
              <RidesWidget userId={_id} isProfile={true}></RidesWidget>
            </Box>  
          )}
          {role=='visitor' && (
            <Box 
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
            >
            <RidesWidget userId={_id} ></RidesWidget>
            </Box>
          )}
      </Box>
    </Box>
  )
}

export default HomePage