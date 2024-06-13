import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../navbar'
import { Box , useMediaQuery} from '@mui/material'
import {Typography} from '@mui/material'
import MyRideWidget from '../widgets/MyRideWidget'

const EventForm = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const {_id, picturePath} = useSelector((state)=> state.user);

  return (
    <Box>
        <Navbar></Navbar>
        <Box  
      width={"100%"}
      padding={"2rem 6%"}
      display={isNonMobileScreens ? "flex": "block"}
      gap="1rem"
      justifyContent={"space-between"}
      
      >
        <MyRideWidget picturePath={picturePath}></MyRideWidget>
      </Box>
    </Box>
  )
}

export default EventForm