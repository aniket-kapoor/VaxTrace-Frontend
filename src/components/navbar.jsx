// import  { useState, useRef, useEffect } from "react";

// import { Link, useNavigate } from "react-router-dom";


// import { useAuth } from "../context/AuthContext";


// const Navbar = () => {

// const { role , logout } = useAuth();
//   const navigate = useNavigate(); 

//   const [openDropdown, setOpenDropdown] = useState(null);
//   const dropdownRef = useRef(null);

//   // ✅ Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpenDropdown(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // ✅ Toggle dropdown on click
//   const handleDropdownClick = (dropdownName) => {
//     setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
//   };


//   const handleLogout = () => {
//         logout();              // clears context + localStorage
//         setOpenDropdown(null); // close dropdown
//         navigate("/login");    // redirect to login
//       };










//   return (
//     <nav className="w-full bg-[#fff7ed] shadow-md sticky top-0 z-50">
     
//      {!role && (
//       <div className="max-w-7xl mx-auto px-10 py-4 flex items-center">
  
//   {/* Left: Healthcare Logo */}
//   <h2 className="text-2xl font-bold text-green-700">
//     Healthcare
//   </h2>

//   {/* Middle: Links (shift left by controlling margin) */}

//   <div className="flex-1 flex justify-center">
//   <ul className="flex items-center gap-8 font-medium text-green-700 ml-12">
//     <li>
//       <Link
//         to="/"
//         className="hover:text-green-900 transition duration-200"
//       >
//         Home
//       </Link>
//     </li>

//     <li>
//      <Link
//         to="/about"
//         className="hover:text-green-900 transition duration-200"
//       >
//         About
//       </Link>
//     </li>

//     <li>
//       <Link
//         to="/login"
//         className="px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition duration-200"
//       >
//         Login
//       </Link>
//     </li>

//     <li>
//       <Link
//         to="/signup"
//         className="px-4 py-2 rounded-lg border border-green-600 text-green-700 shadow-sm hover:bg-green-600 hover:text-white transition duration-200"
//       >
//         Signup
//       </Link>
//     </li>
//   </ul>
//   </div>

//   {/* Right: Government Software Badge (always right-most) */}
//   <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 border border-green-300 shadow-sm">
//     <span className="w-3 h-3 rounded-full bg-green-600"></span>
//     <p className="text-sm font-semibold text-green-700">
//       Government Software
//     </p>
//   </div>

//   </div>

//   )}






//    {role === "worker" &&(
//       <div className="max-w-7xl mx-auto px-10 py-4 flex items-center">
  
//   {/* Left: Healthcare Logo */}
//   <h2 className="text-2xl font-bold text-green-700">
//     Healthcare
//   </h2>

//   {/* Middle: Links (shift left by controlling margin) */}

//   <div className="flex-1 flex justify-center">
//   <ul className="flex items-center gap-8 font-medium text-green-700 ml-12">
//     <li>
//       <Link
//         to="/worker/home"
//         className="hover:text-green-900 transition duration-200"
//       >
//         Home
//       </Link>
//     </li>

//       <li className="relative">
//                   <button
//                     onClick={() => handleDropdownClick("patients")}
//                     className="hover:text-green-900 transition duration-200 flex items-center gap-2"
//                   >
//                     Patients <span className="text-sm">▼</span>
//                   </button>

//                   {openDropdown === "patients" && (
//                     <div className="absolute left-0 mt-3 w-64 bg-white border border-green-100 rounded-2xl shadow-lg overflow-hidden">
//                       <Link
//                         to="/worker/create/patient"
//                         onClick={() => setOpenDropdown(null)}
//                         className="block px-5 py-3 text-green-800 hover:bg-green-50 transition"
//                       >
//                         Create Patient Account
//                       </Link>

//                       <Link
//                         to="/search/profile/patient"
//                         onClick={() => setOpenDropdown(null)}
//                         className="block px-5 py-3 text-green-800 hover:bg-green-50 transition"
//                       >
//                         Search Patient Profile
//                       </Link>

//                       <Link
//                         to="/deactivate/patient"
//                         onClick={() => setOpenDropdown(null)}
//                         className="block px-5 py-3 text-green-800 hover:bg-green-50 transition"
//                       >
//                         Deactivate Patient Account (Soon)
//                       </Link>
//                     </div>
//                   )}
//                 </li>

//    <li>
//                   <Link
//                     to="/worker/patient/schedule"
//                     className="hover:text-green-900 transition duration-200"
//                     onClick={() => setOpenDropdown(null)}
//                   >
//                     Vaccine Schedule
//                   </Link>

//                 </li>
// <li className="relative">
//                   <button
//                     onClick={() => handleDropdownClick("profile")}
//                     className="px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition duration-200 flex items-center gap-2"
//                   >
//                     Profile <span className="text-sm">▼</span>
//                   </button>

//                   {openDropdown === "profile" && (
//                     <div className="absolute right-0 mt-3 w-48 bg-white border border-green-100 rounded-2xl shadow-lg overflow-hidden">
//                       <Link
//                         to="/worker/myaccount"
//                         onClick={() => setOpenDropdown(null)}
//                         className="block px-5 py-3 text-green-800 hover:bg-green-50 transition"
//                       >
//                         My Account
//                       </Link>

//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </li>

//   </ul>
//   </div>

//   {/* Right: Government Software Badge (always right-most) */}
//   <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 border border-green-300 shadow-sm">
//     <span className="w-3 h-3 rounded-full bg-green-600"></span>
//     <p className="text-sm font-semibold text-green-700">
//       Government Software
//     </p>
//   </div>

//   </div>

//   )}







//    {role === "parent" &&(
//       <div className="max-w-7xl mx-auto px-10 py-4 flex items-center">
  
//   {/* Left: Healthcare Logo */}
//   <h2 className="text-2xl font-bold text-green-700">
//     Healthcare
//   </h2>

//   {/* Middle: Links (shift left by controlling margin) */}

//   <div className="flex-1 flex justify-center">
//   <ul className="flex items-center gap-8 font-medium text-green-700 ml-12">
//     <li>
//       <Link
//         to="/parent/home"
//         className="hover:text-green-900 transition duration-200"
//       >
//         Home
//       </Link>
//     </li>


//       <li>
//                   <Link
//                     to="/patient/schedule"
//                     className="hover:text-green-900 transition duration-200"
//                     onClick={() => setOpenDropdown(null)}
//                   >
//                     Next Due Dates
//                   </Link>

//                 </li>

//                  <li>
//       <Link
//         to="/parent/about"
//         className="hover:text-green-900 transition duration-200"
//       >
//         About
//       </Link>
//     </li>

                


     


// <li className="relative">
//                   <button
//                     onClick={() => handleDropdownClick("profile")}
//                     className="px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition duration-200 flex items-center gap-2"
//                   >
//                     Profile <span className="text-sm">▼</span>
//                   </button>

//                   {openDropdown === "profile" && (
//                     <div className="absolute right-0 mt-3 w-48 bg-white border border-green-100 rounded-2xl shadow-lg overflow-hidden">
//                       <Link
//                         to="/parent/myaccount"
//                         onClick={() => setOpenDropdown(null)}
//                         className="block px-5 py-3 text-green-800 hover:bg-green-50 transition"
//                       >
//                         My Account
//                       </Link>

//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </li>

//   </ul>
//   </div>

//   {/* Right: Government Software Badge (always right-most) */}
//   <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 border border-green-300 shadow-sm">
//     <span className="w-3 h-3 rounded-full bg-green-600"></span>
//     <p className="text-sm font-semibold text-green-700">
//       Government Software
//     </p>
//   </div>

//   </div>

//   )}








//     </nav>
//   );
// };

// export default Navbar;






import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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

  // Toggle dropdown on click
  const handleDropdownClick = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleLogout = () => {
    logout();
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="w-full bg-[#fff7ed] shadow-md sticky top-0 z-50">
      {/* NO ROLE (Public) */}
      {!role && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <h2 className="text-xl sm:text-2xl font-bold text-green-700">
              Healthcare
            </h2>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-8 font-medium text-green-700">
                <li>
                  <Link to="/" className="hover:text-green-900 transition duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-green-900 transition duration-200">
                    About
                  </Link>
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

            {/* Government Badge - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 border border-green-300 shadow-sm">
              <span className="w-3 h-3 rounded-full bg-green-600"></span>
              <p className="text-sm font-semibold text-green-700">Government Software</p>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-green-700 hover:bg-green-100 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-green-200 pt-4">
              <ul className="flex flex-col gap-3 font-medium text-green-700">
                <li>
                  <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="block py-2 hover:text-green-900 transition duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    onClick={closeMobileMenu}
                    className="block py-2 hover:text-green-900 transition duration-200"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block px-4 py-2 rounded-lg bg-green-600 text-white text-center shadow hover:bg-green-700 transition duration-200"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="block px-4 py-2 rounded-lg border border-green-600 text-green-700 text-center shadow-sm hover:bg-green-600 hover:text-white transition duration-200"
                  >
                    Signup
                  </Link>
                </li>
                <li className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 border border-green-300 shadow-sm justify-center">
                  <span className="w-3 h-3 rounded-full bg-green-600"></span>
                  <p className="text-sm font-semibold text-green-700">Government Software</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* WORKER ROLE */}
      {role === "worker" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <h2 className="text-xl sm:text-2xl font-bold text-green-700">
              Healthcare
            </h2>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-8 font-medium text-green-700">
                <li>
                  <Link to="/worker/home" className="hover:text-green-900 transition duration-200">
                    Home
                  </Link>
                </li>

                <li className="relative" ref={openDropdown === "patients" ? dropdownRef : null}>
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
                  <Link
                    to="/worker/patient/schedule"
                    className="hover:text-green-900 transition duration-200"
                  >
                    Vaccine Schedule
                  </Link>
                </li>

                <li className="relative" ref={openDropdown === "profile" ? dropdownRef : null}>
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

            {/* Government Badge - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 border border-green-300 shadow-sm">
              <span className="w-3 h-3 rounded-full bg-green-600"></span>
              <p className="text-sm font-semibold text-green-700">Government Software</p>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-green-700 hover:bg-green-100 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-green-200 pt-4">
              <ul className="flex flex-col gap-3 font-medium text-green-700">
                <li>
                  <Link
                    to="/worker/home"
                    onClick={closeMobileMenu}
                    className="block py-2 hover:text-green-900 transition duration-200"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <button
                    onClick={() => handleDropdownClick("patients")}
                    className="w-full text-left py-2 hover:text-green-900 transition duration-200 flex items-center justify-between"
                  >
                    Patients <span className="text-sm">{openDropdown === "patients" ? "▲" : "▼"}</span>
                  </button>

                  {openDropdown === "patients" && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      <Link
                        to="/worker/create/patient"
                        onClick={closeMobileMenu}
                        className="block py-2 text-green-800 hover:text-green-900 transition"
                      >
                        Create Patient Account
                      </Link>
                      <Link
                        to="/search/profile/patient"
                        onClick={closeMobileMenu}
                        className="block py-2 text-green-800 hover:text-green-900 transition"
                      >
                        Search Patient Profile
                      </Link>
                      <Link
                        to="/deactivate/patient"
                        onClick={closeMobileMenu}
                        className="block py-2 text-green-800 hover:text-green-900 transition"
                      >
                        Deactivate Patient Account (Soon)
                      </Link>
                    </div>
                  )}
                </li>

                <li>
                  <Link
                    to="/worker/patient/schedule"
                    onClick={closeMobileMenu}
                    className="block py-2 hover:text-green-900 transition duration-200"
                  >
                    Vaccine Schedule
                  </Link>
                </li>

                <li>
                  <button
                    onClick={() => handleDropdownClick("profile")}
                    className="w-full text-left px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition duration-200 flex items-center justify-between"
                  >
                    Profile <span className="text-sm">{openDropdown === "profile" ? "▲" : "▼"}</span>
                  </button>

                  {openDropdown === "profile" && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      <Link
                        to="/worker/myaccount"
                        onClick={closeMobileMenu}
                        className="block py-2 text-green-800 hover:text-green-900 transition"
                      >
                        My Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left py-2 text-red-600 hover:text-red-700 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </li>

                <li className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 border border-green-300 shadow-sm justify-center mt-2">
                  <span className="w-3 h-3 rounded-full bg-green-600"></span>
                  <p className="text-sm font-semibold text-green-700">Government Software</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* PARENT ROLE */}
      {role === "parent" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <h2 className="text-xl sm:text-2xl font-bold text-green-700">
              Healthcare
            </h2>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-8 font-medium text-green-700">
                <li>
                  <Link to="/parent/home" className="hover:text-green-900 transition duration-200">
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/patient/schedule"
                    className="hover:text-green-900 transition duration-200"
                  >
                    Next Due Dates
                  </Link>
                </li>

                <li>
                  <Link to="/parent/about" className="hover:text-green-900 transition duration-200">
                    About
                  </Link>
                </li>

                <li className="relative" ref={openDropdown === "profile" ? dropdownRef : null}>
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

            {/* Government Badge - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 border border-green-300 shadow-sm">
              <span className="w-3 h-3 rounded-full bg-green-600"></span>
              <p className="text-sm font-semibold text-green-700">Government Software</p>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-green-700 hover:bg-green-100 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-green-200 pt-4">
              <ul className="flex flex-col gap-3 font-medium text-green-700">
                <li>
                  <Link
                    to="/parent/home"
                    onClick={closeMobileMenu}
                    className="block py-2 hover:text-green-900 transition duration-200"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/patient/schedule"
                    onClick={closeMobileMenu}
                    className="block py-2 hover:text-green-900 transition duration-200"
                  >
                    Next Due Dates
                  </Link>
                </li>

                <li>
                  <Link
                    to="/parent/about"
                    onClick={closeMobileMenu}
                    className="block py-2 hover:text-green-900 transition duration-200"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <button
                    onClick={() => handleDropdownClick("profile")}
                    className="w-full text-left px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition duration-200 flex items-center justify-between"
                  >
                    Profile <span className="text-sm">{openDropdown === "profile" ? "▲" : "▼"}</span>
                  </button>

                  {openDropdown === "profile" && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      <Link
                        to="/parent/myaccount"
                        onClick={closeMobileMenu}
                        className="block py-2 text-green-800 hover:text-green-900 transition"
                      >
                        My Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left py-2 text-red-600 hover:text-red-700 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </li>

                <li className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 border border-green-300 shadow-sm justify-center mt-2">
                  <span className="w-3 h-3 rounded-full bg-green-600"></span>
                  <p className="text-sm font-semibold text-green-700">Government Software</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;





