import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/SignUp";
import Login from "./Pages/Login";
import Plans from "./Pages/Plans";
import CreatePatient from "./Pages/CreatePatient";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";


import { useLocation } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";


function App() {

   const location = useLocation();

    const hideNavbar =
     location.pathname === "/login" ||
    location.pathname === "/signup";


  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/about" element={<About/>}> </Route>
      

      {/* Parent's Routes */}
      <Route path="/parent/plans" element={ <ProtectedRoute allowedRole="parent">
                                          <Plans/>
                                          </ProtectedRoute>
                                          }></Route>

      
      {/* Worker's Routes */}

      <Route path="/worker/plans" element={ <ProtectedRoute allowedRole="worker">
                                    <Plans/>
                                </ProtectedRoute>
                                } > </Route>

      <Route path="/worker/plans" element={ <ProtectedRoute allowedRole="worker">
                                    <CreatePatient/>
                                </ProtectedRoute>
                                } > </Route>

      
    </Routes>

  </>
  );
}

export default App;

