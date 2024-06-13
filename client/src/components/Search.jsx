import React from "react";
import { TextField } from "@mui/material";
const Search = ({ value, onChange, placeholder }) => {
  const handleInputChange = (ride) => {
    onChange(ride.target.value);
  };

  return (
    <TextField
      label={placeholder}
      variant="outlined"
      value={value}
      onChange={handleInputChange}
      
    />
  );
};

export default Search;