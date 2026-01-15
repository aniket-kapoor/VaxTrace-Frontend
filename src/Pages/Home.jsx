import { useEffect, useState } from "react";
import PatientInfo from "../Components/patientInfo";
import { BASE_URL } from "../config/api";

const UserPlans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get/patients/a69e5222-e292-44b9-a5b9-f6b7b2f758d5/plan`);
        const data = await response.json();
        setPlans(data);
      } catch (err) {
        console.error("Error fetching Plans:", err);
      }
    };

    fetchPlans();
  }, []);

  return (
  <div style={{ padding: "20px" }}>
    <h1>User Vaccine Plans</h1>

    {plans && plans.length > 0 ? (
      plans.map((plan) => (
        <div
          key={plan.id} // ✅ use a unique id instead of index
          style={{
            marginBottom: "30px",
            paddingBottom: "20px",
            borderBottom: "2px solid #1f2937",
          }}
        >
          {/* Patient Info */}
          <PatientInfo plan={plan} />
        </div>
      ))
    ) : (
      <p>Loading plans...</p>
    )}
  </div>
);
}


export default UserPlans;


