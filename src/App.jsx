import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/SignUp";
import Login from "./Pages/Login";
import Plans from "./Pages/Plans";
import CreatePatient from "./Pages/CreatePatient";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { useLocation } from "react-router-dom";

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
      <Route path="/plans" element={<Plans/>}></Route>
      <Route path="/create/patient" element={<CreatePatient/>}></Route>
    
    </Routes>

  </>
  );
}

export default App;

