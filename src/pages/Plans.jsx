import { useState } from "react";
import PatientInfo from "../components/PatientInfo";
import VaccineList from "../components/VaccineList";
import { BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";




function VaccineScheduleSection() {

 const navigate = useNavigate();



  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [name, setName] = useState("");

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ control progressive fields
  const [needDob, setNeedDob] = useState(false);
  const [needName, setNeedName] = useState(false);

  const fetchPlan = async () => {
    const token = localStorage.getItem("access_token");

    if (!contact) {
      setError("Please enter parent contact number.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ✅ Build query params based on what is required
      const params = new URLSearchParams();
      params.append("parent_contact", `+91${contact}`);

      if (needDob && dob) params.append("dob", dob);
      if (needName && name) params.append("name", name);

      const response = await fetch(`${BASE_URL}/patients/plan?${params}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // ✅ example error messages from backend (customize as per your API)
        const msg = data?.detail || "Something went wrong";

        // ✅ if multiple patients found -> ask DOB
        if (msg.toLowerCase().includes(" dob to identify patient.")) {
          setNeedDob(true);
          setNeedName(false);
          setPlan(null);
          setError("Multiple patients found. Please enter DOB to continue.");
          return;
        }

        // ✅ if still multiple after dob -> ask name
        if (msg.toLowerCase().includes(" please provide name also.")) {
          setNeedName(true);
          setPlan(null);
          setError("DOB matched multiple records. Please enter name.");
          return;
        }

        throw new Error(msg);
      }

      // ✅ success
      navigate("/mcp-card", {
            state: { plan: data },
            });

      setNeedDob(false);
      setNeedName(false);
      setError("");
    } catch (err) {
      setError(err.message);
      setPlan(null);
    } finally {
      setLoading(false);
    }
  };

  const instructions = [
    {
      title: "Step 1: Enter Parent Contact",
      desc: "Use the registered mobile number to fetch patient vaccine schedule.",
    },
    {
      title: "Step 2: Verify DOB (If Needed)",
      desc: "If multiple patients exist on same contact, enter DOB to identify the patient.",
    },
    {
      title: "Step 3: Confirm Name (If Needed)",
      desc: "If still multiple matches, enter the child's name exactly as registered.",
    },
  ];

  return (
    <section id="schedule" className="w-full bg-[#fff7ed] py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Heading */}
        <div className="mb-10">
          <p className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold border border-green-200 shadow-sm">
            Vaccine Schedule
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mt-4">
            Search Patient MCP / Vaccine Plan
          </h2>

          <p className="text-green-800/70 mt-2 max-w-3xl">
            Enter parent contact number to fetch the patient’s vaccination plan.
            If multiple patients exist, we will ask for additional verification.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT 1/3 Instructions */}
          <div className="lg:col-span-1 space-y-4">
            {instructions.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 shadow-md border border-green-100 hover:shadow-lg transition duration-200"
              >
                <h3 className="text-lg font-bold text-green-900">
                  {card.title}
                </h3>
                <p className="text-sm text-green-800/70 mt-2">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT 2/3 Search + Output */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 md:p-8">
              <h3 className="text-2xl font-extrabold text-green-900">
                Find Vaccine Plan
              </h3>

              <p className="text-green-800/70 mt-1">
                Start with parent contact number.
              </p>

              {/* Inputs */}
              <div className="mt-6 space-y-5">
                {/* Contact */}
                <div className="flex flex-col gap-2">
                  <label className="text-green-900 font-semibold">
                    Parent Contact
                  </label>

                  <div className="flex items-center">
                    <span className="px-4 py-3 rounded-l-xl bg-green-100 text-green-700 border border-green-200 font-semibold">
                      +91
                    </span>

                    <input
                      type="tel"
                      value={contact}
                      placeholder="Enter 10-digit mobile number"
                      onChange={(e) => setContact(e.target.value)}
                      maxLength={10}
                      pattern="[0-9]{10}"
                      required
                      className="w-full px-4 py-3 rounded-r-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                </div>

                {/* DOB (appears only if needed) */}
                {needDob && (
                  <div className="flex flex-col gap-2">
                    <label className="text-green-900 font-semibold">
                      Date of Birth (DOB)
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                )}

                {/* Name (appears only if needed) */}
                {needName && (
                  <div className="flex flex-col gap-2">
                    <label className="text-green-900 font-semibold">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      placeholder="Enter patient name"
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                )}

                {/* Button */}
                <button
                  onClick={fetchPlan}
                  disabled={loading}
                  className="w-full py-3 rounded-2xl bg-green-600 text-white font-bold shadow hover:bg-green-700 transition duration-200 disabled:opacity-60"
                >
                  {loading ? "Fetching..." : "Get MCP Card"}
                </button>

                {/* Error */}
                {error && (
                  <p className="text-sm text-red-600 font-semibold">
                    {error}
                  </p>
                )}
              </div>

              {/* Output */}
              {plan && (
                <div className="mt-8">
                  <PatientInfo plan={plan} />
                  <VaccineList vaccines={plan.vaccines}/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VaccineScheduleSection;
