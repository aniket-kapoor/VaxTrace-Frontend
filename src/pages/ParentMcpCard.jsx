import { useLocation, useNavigate } from "react-router-dom";
import PatientInfo from "../components/PatientInfo";
import ParentVaccineList from "../components/ParentVaccineList";

function ParentMcpCard() {
  const location = useLocation();
  const navigate = useNavigate();

  const plan = location.state?.plan;

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
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-8">
        <h1 className="text-3xl font-extrabold text-green-900">
          MCP Card / Vaccine Schedule
        </h1>

        {/* Big patient card */}
        <PatientInfo plan={plan} />

        {/* Parent-only vaccine list (no update button ✅) */}
        <ParentVaccineList plan={plan} />
      </div>
    </section>
  );
}

export default ParentMcpCard;
