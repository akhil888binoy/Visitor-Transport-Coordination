import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useMemo, lazy, Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import VisitorProfilePage from "./scenes/visitorprofilePage";
import EmployeeProfilePage from "./scenes/employeeprofilePage";
import AdminDashboard from "./scenes/admindashboardPage";
import MyRidesPage from "./scenes/myridesPage";
import OfferRidePage from "./scenes/offerridePage";
import RideBookingPage from "./scenes/rideBookingPage";
import Footer from "./scenes/footer";
import Navbar from "./scenes/navbar";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>}></Route>
          <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
          <Route
            path="/admin"
            element={isAuth ? <AdminDashboard></AdminDashboard> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/visitor/:userId"
            element={isAuth ? <VisitorProfilePage></VisitorProfilePage> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/employee/:userId"
            element={isAuth ? <EmployeeProfilePage></EmployeeProfilePage> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/employee/offerridePage"
            element={isAuth ? <OfferRidePage></OfferRidePage> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/myridesPage"
            element={isAuth ? <MyRidesPage></MyRidesPage> : <Navigate to="/" />}
          ></Route>
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
