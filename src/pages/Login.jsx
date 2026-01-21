import React, { useState } from "react";
import { BASE_URL } from "../config/api";
import {useAuth}  from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

     const navigate = useNavigate();

     const { login } = useAuth();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
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
                throw new Error(data.detail || "Login failed");
            }

            // Save token 
            login(data.access_token,data.role);  //data for useAuth

            console.log("Login successful");

             if (data.role === "worker") {
                    navigate("/");
                    } else if (data.role === "parent") {
                    navigate("/parent/plans");
                    }
          }catch (error) {
            console.error("Login error:", error.message);
        }

    // Here you will call your backend API later
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

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-green-900 font-semibold">
              Email
            </label>
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
            <label className="text-green-900 font-semibold">
              Password
            </label>
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
            className="w-full py-3 rounded-xl bg-green-600 text-white font-bold shadow hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
        </form>

      </div>
    </section>
  );
};

export default Login;
