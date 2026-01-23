import React, { useState } from "react";
import { BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  // ✅ toggle: parent (default) OR worker
  const [signupType, setSignupType] = useState("parent"); // "parent" | "worker"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ show/hide password states
  const [showParentPassword, setShowParentPassword] = useState(false);
  const [showParentConfirm, setShowParentConfirm] = useState(false);

  const [showWorkerPassword, setShowWorkerPassword] = useState(false);
  const [showWorkerConfirm, setShowWorkerConfirm] = useState(false);

  // ✅ Parent signup state
  const [parentData, setParentData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "parent",
  });

  // ✅ Worker signup state
  const [workerData, setWorkerData] = useState({
    name: "",
    email: "",
    nin_id: "",
    institution_name: "",
    type_institution: "",
    password: "",
    confirm_password: "",
    role: "worker",
  });

  const handleParentChange = (e) => {
    setParentData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleWorkerChange = (e) => {
    setWorkerData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // ✅ Confirm Password Validation (before API call)
      if (signupType === "parent") {
        if (parentData.password !== parentData.confirm_password) {
          setError("Password and Confirm Password do not match ❌");
          setLoading(false);
          return;
        }
      } else {
        if (workerData.password !== workerData.confirm_password) {
          setError("Password and Confirm Password do not match ❌");
          setLoading(false);
          return;
        }
      }

      // ✅ choose endpoint + payload based on type
      let endpoint = "";
      let payload = {};

      if (signupType === "parent") {
        endpoint = `${BASE_URL}/register/parent`;
        payload = {
          name: parentData.name,
          email: parentData.email,
          password: parentData.password,
          role: "parent",
        };
      } else {
        endpoint = `${BASE_URL}/register/worker`;

        payload = {
          name: workerData.name,
          email: workerData.email,
          nin_id: workerData.nin_id,
          institution_name: workerData.institution_name,
          type_institution: workerData.type_institution,
          password: workerData.password,
          role: "worker", 
        };
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || "Signup failed");
      }

      alert("Account created successfully ✅ Please login now!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#fff7ed] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ✅ LEFT 1/4 INFO PANEL */}
        <div className="lg:col-span-1 bg-white rounded-3xl shadow-lg border border-green-100 p-6 space-y-4 h-fit">
          <h2 className="text-xl font-extrabold text-green-900">📌 Note</h2>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
            <p className="text-green-900 font-bold">🧪 Testing Phase</p>
            <p className="text-sm text-green-800/70 mt-2">
              This application is currently in testing. Some features are under
              development and will be improved in production.
            </p>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
            <p className="text-green-900 font-bold">🪪 NIN ID</p>
            <p className="text-sm text-green-800/70 mt-2">
              For now, you can enter a random 10-digit NIN ID.
            </p>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
            <p className="text-green-900 font-bold">🏥 Worker Verification</p>
            <p className="text-sm text-green-800/70 mt-2">
              In production, proper authentication and verification for
              healthcare workers will be added.
            </p>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
            <p className="text-green-900 font-bold">💉 Vaccination Safety</p>
            <p className="text-sm text-green-800/70 mt-2">
              VaxTrace helps parents track schedules and avoid missed vaccine due
              dates.
            </p>
          </div>
        </div>

        {/* ✅ RIGHT 3/4 SIGNUP FORM */}
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg border border-green-100 p-8">
          <h1 className="text-3xl font-extrabold text-green-900 text-center">
            Create Your Account
          </h1>

          <p className="text-green-800/70 text-center mt-2">
            Join <span className="font-semibold">VaxTrace</span> and track vaccine
            plans easily.
          </p>

          {/* ✅ Tabs */}
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => setSignupType("parent")}
              className={`px-5 py-2 rounded-xl font-bold shadow-sm border transition ${
                signupType === "parent"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-green-700 border-green-200 hover:bg-green-50"
              }`}
            >
              👨‍👩‍👧 Parent Signup
            </button>

            <button
              type="button"
              onClick={() => setSignupType("worker")}
              className={`px-5 py-2 rounded-xl font-bold shadow-sm border transition ${
                signupType === "worker"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-green-700 border-green-200 hover:bg-green-50"
              }`}
            >
              🧑‍⚕️ Healthcare Worker Signup
            </button>
          </div>

          {/* ✅ Error */}
          {error && (
            <p className="text-center text-sm text-red-600 font-semibold mt-6">
              {error}
            </p>
          )}

          {/* ✅ FORM */}
          <form onSubmit={handleSignup} className="mt-8 space-y-5">
            {/* ✅ Parent Form */}
            {signupType === "parent" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-green-900 font-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={parentData.name}
                    onChange={handleParentChange}
                    required
                    placeholder="Enter your name"
                    className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-green-900 font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={parentData.email}
                    onChange={handleParentChange}
                    required
                    placeholder="Enter your email"
                    className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                {/* ✅ Password */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-green-900 font-semibold">Password</label>

                  <div className="relative">
                    <input
                      type={showParentPassword ? "text" : "password"}
                      name="password"
                      value={parentData.password}
                      onChange={handleParentChange}
                      required
                      placeholder="Create a strong password"
                      className="w-full px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400 pr-12"
                    />

                    <button
                      type="button"
                      onClick={() => setShowParentPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-green-700 hover:text-green-900 transition"
                    >
                      {showParentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* ✅ Confirm Password */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-green-900 font-semibold">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      type={showParentConfirm ? "text" : "password"}
                      name="confirm_password"
                      value={parentData.confirm_password}
                      onChange={handleParentChange}
                      required
                      placeholder="Re-enter password"
                      className="w-full px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400 pr-12"
                    />

                    <button
                      type="button"
                      onClick={() => setShowParentConfirm((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-green-700 hover:text-green-900 transition"
                    >
                      {showParentConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ✅ Worker Form */}
            {signupType === "worker" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-green-900 font-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={workerData.name}
                    onChange={handleWorkerChange}
                    required
                    placeholder="Enter your name"
                    className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-green-900 font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={workerData.email}
                    onChange={handleWorkerChange}
                    required
                    placeholder="Enter your email"
                    className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-green-900 font-semibold">
                    NIN ID (10 digits)
                  </label>
                  <input
                    type="text"
                    name="nin_id"
                    value={workerData.nin_id}
                    onChange={handleWorkerChange}
                    required
                    placeholder="Enter 10-digit NIN ID"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    inputMode="numeric"
                    className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-green-900 font-semibold">
                    Institution Name
                  </label>
                  <input
                    type="text"
                    name="institution_name"
                    value={workerData.institution_name}
                    onChange={handleWorkerChange}
                    required
                    placeholder="Enter institution name"
                    className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-green-900 font-semibold">
                    Type of Institution
                  </label>
                  <input
                    type="text"
                    name="type_institution"
                    value={workerData.type_institution}
                    onChange={handleWorkerChange}
                    required
                    placeholder="Example: Government Hospital / Clinic"
                    className="px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                {/* ✅ Password */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-green-900 font-semibold">Password</label>

                  <div className="relative">
                    <input
                      type={showWorkerPassword ? "text" : "password"}
                      name="password"
                      value={workerData.password}
                      onChange={handleWorkerChange}
                      required
                      placeholder="Create a strong password"
                      className="w-full px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400 pr-12"
                    />

                    <button
                      type="button"
                      onClick={() => setShowWorkerPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-green-700 hover:text-green-900 transition"
                    >
                      {showWorkerPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* ✅ Confirm Password */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-green-900 font-semibold">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      type={showWorkerConfirm ? "text" : "password"}
                      name="confirm_password"
                      value={workerData.confirm_password}
                      onChange={handleWorkerChange}
                      required
                      placeholder="Re-enter password"
                      className="w-full px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400 pr-12"
                    />

                    <button
                      type="button"
                      onClick={() => setShowWorkerConfirm((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-green-700 hover:text-green-900 transition"
                    >
                      {showWorkerConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ✅ Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-green-600 text-white font-bold shadow hover:bg-green-700 transition duration-200 disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Signup"}
            </button>

            {/* ✅ Login link */}
            <p className="text-center text-sm text-green-800/70">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-green-700 font-bold hover:text-green-900 underline underline-offset-4 transition"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
