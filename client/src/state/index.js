import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  token: null,
  rides: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    setRides: (state, action) => {
      state.rides = action.payload.rides;
    },

    setRide: (state, action) => {
      const updatedRides = state.rides.rides.map((ride) => {
        if (ride._id === action.payload.ride._id) return action.payload.ride;
        return ride;
      });

      state.rides.rides = updatedRides;
      console.log(updatedRides);
    },
    deleteRide: (state, action) => {
      state.rides = state.rides.filter(
        (ride) => ride._id !== action.payload.rideId
      );
    },
  },
});
export const { setMode, setLogin, setLogout, setRide, setRides, deleteRide } =
  authSlice.actions;
export default authSlice.reducer;
