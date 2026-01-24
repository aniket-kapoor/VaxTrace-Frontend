import  { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";


import { useAuth } from "../context/AuthContext";


const Navbar = () => {

const { role , logout } = useAuth();
  const navigate = useNavigate(); 

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Toggle dropdown on click
  const handleDropdownClick = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };


  const handleLogout = () => {
        logout();              // clears context + localStorage
        setOpenDropdown(null); // close dropdown
        navigate("/login");    // redirect to login
      };










  return (
    <nav className="w-full bg-[#fff7ed] shadow-md sticky top-0 z-50">
     
     {!role && (
      <div className="max-w-7xl mx-auto px-10 py-4 flex items-center">
  
  {/* Left: Healthcare Logo */}
  <h2 className="text-2xl font-bold text-green-700">
    Healthcare
  </h2>

  {/* Middle: Links (shift left by controlling margin) */}

  <div className="flex-1 flex justify-center">
  <ul className="flex items-center gap-8 font-medium text-green-700 ml-12">
    <li>
      <a
        href="/"
        className="hover:text-green-900 transition duration-200"
      >
        Home
      </a>
    </li>

    <li>
     <a
        href="#about"
        className="hover:text-green-900 transition duration-200"
      >
        About
      </a>
    </li>

    <li>
      <Link
        to="/login"
        className="px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition duration-200"
      >
        Login
      </Link>
    </li>

    <li>
      <Link
        to="/signup"
        className="px-4 py-2 rounded-lg border border-green-600 text-green-700 shadow-sm hover:bg-green-600 hover:text-white transition duration-200"
      >
        Signup
      </Link>
    </li>
  </ul>
  </div>

  {/* Right: Government Software Badge (always right-most) */}
  <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 border border-green-300 shadow-sm">
    <span className="w-3 h-3 rounded-full bg-green-600"></span>
    <p className="text-sm font-semibold text-green-700">
      Government Software
    </p>
  </div>

  </div>

  )}






   {role === "worker" &&(
      <div className="max-w-7xl mx-auto px-10 py-4 flex items-center">
  
  {/* Left: Healthcare Logo */}
  <h2 className="text-2xl font-bold text-green-700">
    Healthcare
  </h2>

  {/* Middle: Links (shift left by controlling margin) */}

  <div className="flex-1 flex justify-center">
  <ul className="flex items-center gap-8 font-medium text-green-700 ml-12">
    <li>
      <a
        href="/worker/home"
        className="hover:text-green-900 transition duration-200"
      >
        Home
      </a>
    </li>

      <li className="relative">
                  <button
                    onClick={() => handleDropdownClick("patients")}
                    className="hover:text-green-900 transition duration-200 flex items-center gap-2"
                  >
                    Patients <span className="text-sm">▼</span>
                  </button>

                  {openDropdown === "patients" && (
                    <div className="absolute left-0 mt-3 w-64 bg-white border border-green-100 rounded-2xl shadow-lg overflow-hidden">
                      <Link
                        to="/worker/create/patient"
                        onClick={() => setOpenDropdown(null)}
                        className="block px-5 py-3 text-green-800 hover:bg-green-50 transition"
                      >
                        Create Patient Account
                      </Link>

                      <Link
                        to="/search/profile/patient"
                        onClick={() => setOpenDropdown(null)}
                        className="block px-5 py-3 text-green-800 hover:bg-green-50 transition"
                      >
                        Search Patient Profile
                      </Link>

                      <Link
                        to="/deactivate/patient"
                        onClick={() => setOpenDropdown(null)}
                        className="block px-5 py-3 text-green-800 hover:bg-green-50 transition"
                      >
                        Deactivate Patient Account (Soon)
                      </Link>
                    </div>
                  )}
                </li>

   <li>
                  <a
                    href="#schedule"
                    className="hover:text-green-900 transition duration-200"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Vaccine Schedule
                  </a>

                </li>
<li className="relative">
                  <button
                    onClick={() => handleDropdownClick("profile")}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition duration-200 flex items-center gap-2"
                  >
                    Profile <span className="text-sm">▼</span>
                  </button>

                  {openDropdown === "profile" && (
                    <div className="absolute right-0 mt-3 w-48 bg-white border border-green-100 rounded-2xl shadow-lg overflow-hidden">
                      <Link
                        to="/worker/myaccount"
                        onClick={() => setOpenDropdown(null)}
                        className="block px-5 py-3 text-green-800 hover:bg-green-50 transition"
                      >
                        My Account
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </li>

  </ul>
  </div>

  {/* Right: Government Software Badge (always right-most) */}
  <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 border border-green-300 shadow-sm">
    <span className="w-3 h-3 rounded-full bg-green-600"></span>
    <p className="text-sm font-semibold text-green-700">
      Government Software
    </p>
  </div>

  </div>

  )}







   {role === "parent" &&(
      <div className="max-w-7xl mx-auto px-10 py-4 flex items-center">
  
  {/* Left: Healthcare Logo */}
  <h2 className="text-2xl font-bold text-green-700">
    Healthcare
  </h2>

  {/* Middle: Links (shift left by controlling margin) */}

  <div className="flex-1 flex justify-center">
  <ul className="flex items-center gap-8 font-medium text-green-700 ml-12">
    <li>
      <a
        href="/parent/home"
        className="hover:text-green-900 transition duration-200"
      >
        Home
      </a>
    </li>


      <li>
                  <a
                    href="#schedule"
                    className="hover:text-green-900 transition duration-200"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Next Due Dates
                  </a>

                </li>

                 <li>
      <a
        href="/parent/about"
        className="hover:text-green-900 transition duration-200"
      >
        About
      </a>
    </li>

                


     


<li className="relative">
                  <button
                    onClick={() => handleDropdownClick("profile")}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition duration-200 flex items-center gap-2"
                  >
                    Profile <span className="text-sm">▼</span>
                  </button>

                  {openDropdown === "profile" && (
                    <div className="absolute right-0 mt-3 w-48 bg-white border border-green-100 rounded-2xl shadow-lg overflow-hidden">
                      <Link
                        to="/parent/myaccount"
                        onClick={() => setOpenDropdown(null)}
                        className="block px-5 py-3 text-green-800 hover:bg-green-50 transition"
                      >
                        My Account
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </li>

  </ul>
  </div>

  {/* Right: Government Software Badge (always right-most) */}
  <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 border border-green-300 shadow-sm">
    <span className="w-3 h-3 rounded-full bg-green-600"></span>
    <p className="text-sm font-semibold text-green-700">
      Government Software
    </p>
  </div>

  </div>

  )}








    </nav>
  );
};

export default Navbar;
