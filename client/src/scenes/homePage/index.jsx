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
  const {_id, picturePath} = useSelector((state)=> state.user);

  return (
    <Box>
      <Navbar></Navbar>
      <Box
      width={"100%"}
      padding={"2rem 6%"}
      display={isNonMobileScreens ? "flex": "block"}
      gap="0.5rem"
      justifyContent={"space-between"}

      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath}>
            </UserWidget>
        </Box>
          <Box 
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          
          >
             <Link to="/employee/offerridePage" >
      <Button 
      
        variant="outlined"
        color="primary"
        size="large"
        sx={{ fontSize: '1.25rem', padding: '12px 24px' }} // Adjust size here
      >
        Add your Ride
      </Button>
    </Link>
            <RidesWidget userId={_id} ></RidesWidget>
          </Box>
          {isNonMobileScreens &&(
            <Box flexBasis={"26%"}>


            </Box>
          )}
      </Box>
    </Box>
  )
}

export default HomePage