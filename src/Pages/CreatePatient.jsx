import { useState } from "react";
import { BASE_URL } from "../config/api";

function CreatePatient() {

    const [patientInfo, setPatientInfo] = useState({
        name: "",
        gender: "",
        dob: "",
        contact: "",
        patient_state: "",
        district: "",
        city_or_village: "",
        pincode: "",
        address: ""
    })


    const handleChange = (e) => {
        const { name, value } = e.target;

        setPatientInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("access_token");

            if (!token) {
                alert("Unauthorized. Please login again.");
                return;
            }

            const payload = {
                    name: patientInfo.name,
                    gender: patientInfo.gender,
                    dob: patientInfo.dob,
                    parent_contact: `+91${patientInfo.contact}`, // E.164 OK
                    state: patientInfo.patient_state,             // ✅ FIX
                    district: patientInfo.district,
                    city_or_village: patientInfo.city_or_village || null,
                    pincode: patientInfo.pincode || null,
                    Address: patientInfo.address                  // ✅ EXACT casing
                    };
            const response = await fetch(`${BASE_URL}/patients/createPatient`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Backend validation error:", data);
                alert("Validation error. Check console.");

                return;
            }

            alert("Patient created successfully ✅");

            // OPTION A (recommended): clear form
            setPatientInfo({
                name: "",
                gender: "",
                dob: "",
                contact: "",
                patient_state: "",
                district: "",
                city_or_village: "",
                pincode: "",
                address: ""
            });

            // OPTION B (recommended for real apps)
            // navigate(`/patients/${data.id}`)

        } catch (error) {
            console.error(error);
            alert("Server error");
        }
    };



    return (
        <div className="patient-container">
            <h2>Add Patients</h2>

            <form action="" onSubmit={handleSubmit}>

                <div className="form-group">
                    <input type="text"
                        name="name"
                        placeholder="Enter patient name"
                        value={patientInfo.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <select
                        name="gender"
                        value={patientInfo.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="transgender">Transgender</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <input
                        type="date"
                        name="dob"
                        value={patientInfo.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
                    <span
                        style={{
                            padding: "10px",
                            background: "#e5e7eb",
                            border: "1px solid #ccc",
                            borderRight: "none",
                            borderRadius: "5px 0 0 5px"
                        }}
                    >
                        +91
                    </span>

                    <input
                        type="tel"
                        name="contact"
                        placeholder="Enter 10-digit number"
                        value={patientInfo.contact}
                        onChange={handleChange}
                        maxLength={10}
                        pattern="[0-9]{10}"
                        required
                        style={{
                            borderRadius: "0 5px 5px 0",
                            border: "1px solid #ccc",
                            padding: "10px",
                            width: "100%"
                        }}
                    />
                </div>

                <div className="form-group">
                    <input type="text"
                        name="patient_state"
                        placeholder="Enter State"
                        value={patientInfo.patient_state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                        name="district"
                        placeholder="Enter district"
                        value={patientInfo.district}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                        name="city_or_village"
                        placeholder="Enter city or village"
                        value={patientInfo.city_or_village}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="pincode"
                        placeholder="Enter pincode"
                        value={patientInfo.pincode}
                        onChange={handleChange}
                        pattern="[0-9]{6}"
                        maxLength={6}
                        inputMode="numeric"
                        autoComplete="postal-code"
                        required
                        />
                </div>
                <div className="form-group">
                    <input type="text"
                        name="Address"
                        placeholder="Enter address"
                        value={patientInfo.Address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-btn">
                    <button type="submit">Create Patient Account</button>
                </div>
            </form>

        </div>


    )
}
export default CreatePatient