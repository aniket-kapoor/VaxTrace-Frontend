import { useState } from "react";
import "./Signup.css";
import { BASE_URL } from "../config/api";



function Signup() {

    const [formData , setFormData]=useState({
                                            name: "",
                                            email: "",
                                            password: "",
                                            });

    const handleChange = (e)=> {
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
        });

    };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role, // or "user"
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.detail || "Registration failed");
      return;
    }

    alert("User registered successfully 🎉");
    console.log("User:", data);

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};

                                            
            


    return (

        <div className="signup-container">
         <h2 className="signup-title">Signup</h2>

        <form action="" onSubmit={handleSubmit} className="signup-form">
            

            <div className="form-group">
                <label htmlFor="">Name</label>
                <input type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div  className="form-group">
                <label htmlFor="">Email</label>
                <input type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div  className="form-group">
                <label htmlFor="">Password</label>
                <input type="password"
                    name="password"
                    value={formData.password }
                    onChange={handleChange }
                    required
                />
            </div>


            <div className="form-group">
            <label>Register As</label>
      
      <div className="radio-wrapper">
            <div className="form-group-radio">
              <input
                type="radio"
                name="role"
                value="parent"
                checked={formData.role === "parent"}
                onChange={handleChange}
                required
              />
              <label>Parent</label>
            </div>

            <div className="form-group-radio">
              <input
                type="radio"
                name="role"
                value="worker"
                checked={formData.role === "worker"}
                onChange={handleChange}
              />
              <label>Worker</label>
            </div>
          </div>
        </div>

          <div className="form-btn">
            <button type="submit">Create Account</button>
          </div>


        </form>
      </div>



    )
}

export default Signup;