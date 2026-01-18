import { useState } from "react"
import PatientInfo from "../Components/patientInfo";
import { BASE_URL } from "../config/api";
import ParentVaccineList from "../Components/vaccinePlanParent";


function ParentPlans() {

    const [patientId, setPatientId] = useState("");
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");




    const fetchPlan = async () => {

        const token = localStorage.getItem("access_token");

        if (!patientId) {
            setError("Enter patient id")
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${BASE_URL}/get/patients/${patientId}/plan`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}` 
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Patient Not Found");
            }

            const data = await response.json();
            setPlan(data);

        }

        catch (err) {

            setError(err.message);
            setPlan(null);

        }

        finally {
             setLoading(false);

        }
    }


    return (
        <div>
            <h2>Get Patient Vaccine Plan</h2>

            <input type="text"
                value={patientId}
                placeholder="Enter patient id"
                onChange={(e) => setPatientId(e.target.value)}
            />
            <button onClick={fetchPlan}>Get MCP Card</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {plan && (
                <>
                 <PatientInfo plan={plan} />
                 <ParentVaccineList vaccines={plan.vaccines}  />
                </>
            )}

        </div>
    )
}

export default ParentPlans