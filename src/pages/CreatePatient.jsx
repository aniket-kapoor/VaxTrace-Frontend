import { useState } from "react";
import { BASE_URL } from "../config/api";

function CreatePatient() {
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    gender: "",
    dob: "",
    contact: "",
    father:"",
    patient_state: "",
    district: "",
    city_or_village: "",
    pincode: "",
    address: "",
  });

  const [dobDocument, setDobDocument] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPatientInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setDobDocument(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("Unauthorized. Please login again.");
        return;
      }

      if (!dobDocument) {
        alert("Please upload DOB document (PDF/JPG/PNG).");
        return;
      }

      // ✅ FormData for file upload
      const formData = new FormData();

      // ✅ these keys must match backend (PatientIn.as_form)
      formData.append("name", patientInfo.name);
      formData.append("gender", patientInfo.gender);
      formData.append("dob", patientInfo.dob);
      formData.append("parent_contact", `+91${patientInfo.contact}`);
      formData.append("father_name", patientInfo.father);
      formData.append("state", patientInfo.patient_state);
      formData.append("district", patientInfo.district);
      formData.append("city_or_village", patientInfo.city_or_village);
      formData.append("pincode", patientInfo.pincode);
      formData.append("Address", patientInfo.address); // ✅ exact casing
      formData.append("dob_document", dobDocument); // ✅ file field

      const response = await fetch(`${BASE_URL}/patients/createPatient`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Don't set Content-Type manually
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Backend validation error:", data);
        alert("Validation error. Check console.");
        return;
      }

      alert("Patient created successfully ✅");

      // clear form
      setPatientInfo({
        name: "",
        gender: "",
        dob: "",
        contact: "",
        patient_state: "",
        father:"",
        district: "",
        city_or_village: "",
        pincode: "",
        address: "",
      });
      setDobDocument(null);

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const infoCards = [
    {
      title: "Step 1: Add Patient Details",
      desc: "Enter basic patient details like name, gender, and DOB.",
    },
    {
      title: "Step 2: Upload DOB Proof",
      desc: "Upload DOB document (PDF/JPG/PNG) for verification.",
    },
    {
      title: "Step 3: Parent Contact",
      desc: "Enter valid phone number to send vaccine due-date alerts.",
    },
    {
      title: "Step 4: Address & Location",
      desc: "State, district, and pincode ensure accurate record mapping.",
    },
    {
      title: "Step 5: Patient Profile Created",
      desc: "Patient is registered securely and vaccine plan can be tracked.",
    },
  ];

  return (
    <section className="min-h-screen w-full bg-[#fff7ed] py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Heading */}
        <div className="mb-10">
          <p className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold border border-green-200 shadow-sm">
            Worker Panel
          </p>

          <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 mt-4">
            Create Patient Account
          </h1>

          <p className="text-green-800/80 mt-2 max-w-3xl">
            Register a patient in the VaxTrace system to track vaccination records
            and send reminders to parents automatically.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT: Info cards */}
          <div className="lg:col-span-1 space-y-4">
            {infoCards.map((card, index) => (
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

          {/* RIGHT: Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 md:p-8">
              <h2 className="text-2xl font-extrabold text-green-900">
                Patient Registration Form
              </h2>
              <p className="text-green-800/70 mt-1">
                Fill all required fields carefully.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-green-900 font-semibold">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter patient name"
                      value={patientInfo.name}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col gap-2">
                    <label className="text-green-900 font-semibold">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={patientInfo.gender}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400 bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="transgender">Transgender</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* DOB */}
                  <div className="flex flex-col gap-2">
                    <label className="text-green-900 font-semibold">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={patientInfo.dob}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  {/* DOB document upload */}
                  <div className="flex flex-col gap-2">
                    <label className="text-green-900 font-semibold">
                      DOB Document
                    </label>

                    <input
                      type="file"
                      name="dob_document"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      required
                      className="px-4 py-3 rounded-xl border border-green-200 bg-white outline-none focus:ring-2 focus:ring-green-400"
                    />

                    {dobDocument && (
                      <p className="text-xs text-green-700 font-semibold">
                        Selected: {dobDocument.name}
                      </p>
                    )}
                  </div>

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
                        name="contact"
                        placeholder="Enter 10-digit number"
                        value={patientInfo.contact}
                        onChange={handleChange}
                        maxLength={10}
                        pattern="[0-9]{10}"
                        required
                        className="w-full px-4 py-3 rounded-r-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-green-900 font-semibold">
                      Father Name
                    </label>
                    <input
                      type="text"
                      name="father"
                      placeholder="Enter Father name"
                      value={patientInfo.father}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  {/* State */}
                  <div className="flex flex-col gap-2">
                    <label className="text-green-900 font-semibold">
                      State
                    </label>
                    <input
                      type="text"
                      name="patient_state"
                      placeholder="Enter state"
                      value={patientInfo.patient_state}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  {/* District */}
                  <div className="flex flex-col gap-2">
                    <label className="text-green-900 font-semibold">
                      District
                    </label>
                    <input
                      type="text"
                      name="district"
                      placeholder="Enter district"
                      value={patientInfo.district}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  {/* City/Village */}
                  <div className="flex flex-col gap-2">
                    <label className="text-green-900 font-semibold">
                      City / Village
                    </label>
                    <input
                      type="text"
                      name="city_or_village"
                      placeholder="Enter city or village"
                      value={patientInfo.city_or_village}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  {/* Pincode */}
                  <div className="flex flex-col gap-2">
                    <label className="text-green-900 font-semibold">
                      Pincode
                    </label>
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
                      className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-2">
                  <label className="text-green-900 font-semibold">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter full address"
                    value={patientInfo.address}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-green-600 text-white font-bold shadow hover:bg-green-700 transition duration-200"
                >
                  Create Patient Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreatePatient;
