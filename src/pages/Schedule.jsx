import { useLocation, useNavigate } from "react-router-dom";
import PatientInfo from "../components/PatientInfo"; 
import VaccineList from "../components/VaccineList";
;
// import VaccineList from "../Components/vaccinePlan"; (later)

function McpCard() {
  const location = useLocation();
  const navigate = useNavigate();

  const plan = location.state?.plan;

  // ❗ Safety check (if user refreshes page)
  if (!plan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7ed]">
        <p className="text-red-600 font-semibold mb-4">
          No patient data found.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#fff7ed] py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h1 className="text-3xl font-extrabold text-green-900 mb-6">
          MCP Card / Vaccine Schedule
        </h1>

        {/* Patient Info */}
        <PatientInfo plan={plan} />

        {/* Later */}
        <VaccineList plan={plan} />

      </div>
    </section>
  );
}

export default McpCard;
