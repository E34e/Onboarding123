import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import OnboardingMainPage from "./jvd_new onBoarding/JVD_Application/PreRegistration/OnboardingMainPage";
import StudentDetails from "./jvd_new onBoarding/JVD_Application/StudentDetails";
import StudentEDucationDetails from "./jvd_new onBoarding/JVD_Application/StudentEDucationDetails";
import PreRegistration from "./jvd_new onBoarding/JVD_Application/PreRegistration/PreRegistration"
import PreregReducer from "./jvd_new onBoarding/Reducers/PreRegistrationReducer";

import Dashboard from "./ScholarshipRenewal/Components/Dashboard/Dashboard"

import RenewalStatistics from "./ScholarshipRenewal/Components/Dashboard/RenewalStastics";
import LoginPage from "./ScholarshipRenewal/Components/Login/LoginPage";
import JvdApplication from "./jvd_new onBoarding/JVD_Application/jvdApplication";

let store = configureStore({
  reducer:{
    cetReducer: PreregReducer
  }
})

const RoutesComponent = () => (
  <Provider store={store}>
  <Router>
    <Routes>
      <Route
        path="/dashboard"
        exact={true}
        element={<Dashboard></Dashboard>}
      />
       <Route
        path="/renewal"
        exact={true}
        element={<RenewalStatistics></RenewalStatistics>}
      />
     
      

     
      
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route path="/stuedudtls" element={<StudentEDucationDetails></StudentEDucationDetails>}></Route>
     
      <Route path="/stuedu" element={<StudentDetails></StudentDetails>}></Route>
      {/* <Route path="/" element={<PreRegistartion></PreRegistartion>}></Route> */}
      <Route path="/cetregistration" element={<PreRegistration></PreRegistration>}></Route>
      <Route path="/jvd" element={<OnboardingMainPage></OnboardingMainPage>}></Route>
      <Route path="/jvdapplication" element={<JvdApplication></JvdApplication>}></Route>

      
</Routes>
</Router>
</Provider>


    
 
);
export default RoutesComponent;
