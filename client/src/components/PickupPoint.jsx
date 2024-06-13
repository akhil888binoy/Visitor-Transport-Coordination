import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const PickupPoint = ({ filterPickupPoint, pickupPoints, setFilterPickupPoint }) => {
  const handlePickupPointChange = (ride) => {
    setFilterPickupPoint(ride.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth >
      <InputLabel id="pickupPoint-label">Filter by Pickup Points</InputLabel>
      <Select
        labelId="pickupPoint-label"
        id="pickupPoint-select"
        multiple
        
        value={filterPickupPoint}
        onChange={handlePickupPointChange}
        label="Filter by Pickup Points"
        renderValue={(selected) => selected.join(", ")}
      >
        {pickupPoints.map((pickupPoint) => (
          <MenuItem key={pickupPoint} value={pickupPoint}>
            {pickupPoint}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PickupPoint;