import React from "react";
import { Routes, Route , useLocation} from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import CreatePatient from "./pages/CreatePatient";
import McpCard from "./pages/Schedule";

import ProtectedRoute from "./components/ProtectedRoute";
import PendingApplications from "./pages/Applications";

// Pages (create these files later)



const Signup = () => <h1 className="p-10">Signup Page</h1>;

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


        <Route path="/worker/create/patient" element={
                                                 <ProtectedRoute allowedRole="worker">
                                                  <CreatePatient />
                                                  </ProtectedRoute>} />

        <Route path="/worker/applications" element={
                                                 <ProtectedRoute allowedRole="worker">
                                                  <PendingApplications />
                                                  </ProtectedRoute>} />

              




      </Routes>
    </>
  );
}

export default App;
