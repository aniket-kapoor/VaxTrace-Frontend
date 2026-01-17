import { useState } from "react";
import { BASE_URL } from "../config/api";
import {useAuth}  from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

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
                throw new Error(data.detail || "Login failed");
            }

            // Save token 
            login(data.access_token,data.role);  //data for useAuth

            console.log("Login successful");

             if (data.role === "worker") {
                    navigate("/worker/plans");
                    } else if (data.role === "parent") {
                    navigate("/parent/plans");
                    }



        } catch (error) {
            console.error("Login error:", error.message);
        }
    };


    return (
        <form action="" onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div>
                <label htmlFor="">Email</label>
                <input type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                />
            </div>


            <div>
                <label htmlFor="">Password</label>
                <input type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">Login</button>
        </form>

    )

}

export default Login;