import React, { useState } from "react";
import { BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // ✅ For UI error/success handling
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // ✅ Clear messages when user types again
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const formBody = new URLSearchParams();
      formBody.append("username", loginData.email); // IMPORTANT
      formBody.append("password", loginData.password);

      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        // ✅ backend can send different messages
        const backendError = data?.detail || "Login failed";

        // You can customize these based on your backend detail messages
        if (
          backendError.toLowerCase().includes("incorrect") ||
          backendError.toLowerCase().includes("password")
        ) {
          setErrorMsg("❌ Wrong password. Please try again.");
        } else if (
          backendError.toLowerCase().includes("not found") ||
          backendError.toLowerCase().includes("email")
        ) {
          setErrorMsg("❌ Email does not exist. Please register first.");
        } else {
          setErrorMsg(`❌ ${backendError}`);
        }

        setLoading(false);
        return;
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("role", data.role);

      // ✅ Save token
      login(data.access_token, data.role);

      setSuccessMsg("✅ Login successful! Redirecting...");

      // ✅ Redirect after short delay (looks professional)
      setTimeout(() => {
        if (data.role === "worker") {
          navigate("/worker/home");
        } else if (data.role === "parent") {
          navigate("/parent/home");
        } else {
          navigate("/");
        }
      }, 1000);

      setLoading(false);
    } catch (error) {
      console.error("Login error:", error.message);
      setErrorMsg("❌ Server error. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#fff7ed] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white shadow-lg border border-green-100 rounded-3xl p-8">
        <h2 className="text-3xl font-extrabold text-green-900 text-center">
          Login
        </h2>

        <p className="text-green-800/70 text-center mt-2">
          Welcome back to <span className="font-semibold">VaxTrace</span>
        </p>

        {/* ✅ Error Message */}
        {errorMsg && (
          <div className="mt-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
            {errorMsg}
          </div>
        )}

        {/* ✅ Success Message */}
        {successMsg && (
          <div className="mt-5 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
            {successMsg}
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-green-900 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-green-900 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold shadow transition duration-200 ${
              loading
                ? "bg-green-400 cursor-not-allowed text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* First time user */}
          <p className="text-center text-sm text-green-800/70 mt-4">
            First time user?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-green-700 font-bold hover:text-green-900 underline underline-offset-4 transition"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
