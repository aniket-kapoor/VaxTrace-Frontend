import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import CreatePatient from "./pages/CreatePatient";
import McpCard from "./pages/Schedule";

import ProtectedRoute from "./components/ProtectedRoute";
import PendingApplications from "./pages/Applications";
import HomeParent from "./pages/HomeParent";
import SelfRegistration from "./pages/selfRegistration";
import ApplicationStatusPage from "./pages/ParentApplications";
import VaccineScheduleSectionParent from "./pages/PlansParents";
import ParentMcpCard from "./pages/ParentMcpCard";
import Signup from "./pages/Signup";
import AboutSection from "./components/AboutSection";
import MyAccount from "./pages/MyAccount";
import WorkerHome from "./pages/WorkerHome";



function App() {

  const location = useLocation();

  // Hide navbar on login page
  const hideNavbar = location.pathname === "/login";
  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/mcp-card" element={<McpCard />} />


        <Route path="/worker/home" element={
          <ProtectedRoute allowedRole="worker">
            <WorkerHome />
          </ProtectedRoute>} />
        


        <Route path="/worker/create/patient" element={
          <ProtectedRoute allowedRole="worker">
            <CreatePatient />
          </ProtectedRoute>} />

        <Route path="/worker/applications" element={
          <ProtectedRoute allowedRole="worker">
            <PendingApplications />
          </ProtectedRoute>} />

           <Route path="/worker/myaccount" element={
          <ProtectedRoute allowedRole="worker">
            <MyAccount />
          </ProtectedRoute>} />

        

          <Route path="/worker/patient/schedule" element={
          <ProtectedRoute allowedRole="worker">
            <VaccineScheduleSectionParent/>
          </ProtectedRoute>} />



        <Route path="/parent/home" element={
          <ProtectedRoute allowedRole="parent">
            <HomeParent />
          </ProtectedRoute>} />


        <Route path="/parent/sefRegistration" element={
          <ProtectedRoute allowedRole="parent">
            <SelfRegistration />
          </ProtectedRoute>} />


        <Route path="/parent/application/status" element={
          <ProtectedRoute allowedRole="parent">
            <ApplicationStatusPage />
          </ProtectedRoute>} />


        <Route path="/patient/schedule" element={
          <ProtectedRoute allowedRole="parent">
            <VaccineScheduleSectionParent />
          </ProtectedRoute>} />

        <Route
          path="/parent/mcp-card"
          element={
            <ProtectedRoute allowedRole="parent">
              <ParentMcpCard />
            </ProtectedRoute>
          }
        />

        <Route path="/parent/about" element={
          <ProtectedRoute allowedRole="parent">
            <AboutSection />
          </ProtectedRoute>} />

            <Route path="/parent/myaccount" element={
          <ProtectedRoute allowedRole="parent">
            <MyAccount />
          </ProtectedRoute>} />







      </Routes>
    </>
  );
}

export default App;
