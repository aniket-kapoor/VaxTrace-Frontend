import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
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

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logoContainer}>
        <h2 style={styles.logo}>
          Vax<span style={styles.logoSpan}>Trace</span>
        </h2>
      </div>

      {/* Links */}
      <ul style={styles.navLinks} ref={dropdownRef}>
        {/* Home */}
        <li>
          <Link to="/" style={styles.link} onClick={() => setOpenDropdown(null)}>
            Home
          </Link>
        </li>

        {/* ✅ Patients Dropdown */}
        <li style={styles.dropdownWrapper}>
          <span
            style={styles.link}
            onClick={() => handleDropdownClick("patients")}
          >
            Patients ⬇
          </span>

          {openDropdown === "patients" && (
            <div style={styles.dropdownMenu}>
              <Link
                to="/create/patient"
                style={styles.dropdownItem}
                onClick={() => setOpenDropdown(null)}
              >
                Create Patient Account
              </Link>

              <Link
                to="/search/patient"
                style={styles.dropdownItem}
                onClick={() => setOpenDropdown(null)}
              >
                Search Patient Profile
              </Link>

              <Link
                to="/deactivate/patient"
                style={styles.dropdownItem}
                onClick={() => setOpenDropdown(null)}
              >
                Deactivate Patient Account
              </Link>
            </div>
          )}
        </li>

        {/* Vaccine Schedule */}
        <li>
          <Link
            to="/plans"
            style={styles.link}
            onClick={() => setOpenDropdown(null)}
          >
            Vaccine Schedule
          </Link>
        </li>

        {/* ✅ Profile Dropdown */}
        <li style={styles.dropdownWrapper}>
          <span
            style={styles.profileButton}
            onClick={() => handleDropdownClick("profile")}
          >
            Profile ⬇
          </span>

          {openDropdown === "profile" && (
            <div style={styles.dropdownMenuRight}>
              <Link
                to="/my-account"
                style={styles.dropdownItem}
                onClick={() => setOpenDropdown(null)}
              >
                My Account
              </Link>

              <Link
                to="/logout"
                style={styles.dropdownItem}
                onClick={() => setOpenDropdown(null)}
              >
                Logout
              </Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#f8fafc",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#0f172a",
    cursor: "pointer",
  },

  logoSpan: {
    color: "#2563eb",
  },

  navLinks: {
    display: "flex",
    gap: "25px",
    listStyle: "none",
    margin: 0,
    padding: 0,
    alignItems: "center",
  },

  link: {
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    color: "#475569",
    cursor: "pointer",
    padding: "8px 10px",
    borderRadius: "6px",
    userSelect: "none",
  },

  dropdownWrapper: {
    position: "relative",
  },

  dropdownMenu: {
    position: "absolute",
    top: "42px",
    left: 0,
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.15)",
    padding: "10px 0",
    minWidth: "230px",
    display: "flex",
    flexDirection: "column",
    zIndex: 999,
  },

  dropdownMenuRight: {
    position: "absolute",
    top: "42px",
    right: 0,
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.15)",
    padding: "10px 0",
    minWidth: "180px",
    display: "flex",
    flexDirection: "column",
    zIndex: 999,
  },

  dropdownItem: {
    textDecoration: "none",
    padding: "10px 15px",
    fontSize: "14px",
    color: "#334155",
    cursor: "pointer",
  },

  profileButton: {
    fontSize: "16px",
    fontWeight: "500",
    padding: "8px 14px",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#ffffff",
    cursor: "pointer",
    userSelect: "none",
  },
};
