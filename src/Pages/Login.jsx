import { useState } from "react";
import { BASE_URL } from "../config/api";

function Login() {

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
            localStorage.setItem("access_token", data.access_token);

            console.log("Login successful");
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