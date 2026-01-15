import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/SignUp";
import Login from "./Pages/Login";
import Plans from "./Pages/Plans";
import CreatePatient from "./Pages/CreatePatient";
import UpdateVaccineModal from "./Components/UpdateVaccineModal";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/plans" element={<Plans/>}></Route>
      <Route path="/create/patient" element={<CreatePatient/>}></Route>

      <Route path="/update" element={< UpdateVaccineModal/>}></Route>
    </Routes>
  );
}

export default App;

