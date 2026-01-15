// import { Link } from "react-router-dom";

// function Navbar() {

//     return (
//         <nav className="navbar">
//             <h2 className="logo">VaxTrace</h2>

//             <ul className="nav-links">


//                 <li>
//                     <Link to="/">Home</Link>
//                 </li>

//                 <li>
//                     <Link to="/plans">Plans</Link>
//                 </li>

//                 <li>
//                     <Link to="/create/patient">Patients</Link>
//                 </li>





               
//             </ul>
//         </nav>
//     );
// }

// export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isHovered, setIsHovered] = useState(null);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <h2 style={styles.logo}>Vax<span>Trace</span></h2>
      </div>

      <ul style={styles.navLinks}>
        <li 
          onMouseEnter={() => setIsHovered('home')} 
          onMouseLeave={() => setIsHovered(null)}
        >
          <Link to="/" style={{
            ...styles.link, 
            color: isHovered === 'home' ? '#2563eb' : '#475569'
          }}>Home</Link>
        </li>

        <li 
          onMouseEnter={() => setIsHovered('plans')} 
          onMouseLeave={() => setIsHovered(null)}
        >
          <Link to="/plans" style={{
            ...styles.link, 
            color: isHovered === 'plans' ? '#2563eb' : '#475569'
          }}>Plans</Link>
        </li>

        <li 
          onMouseEnter={() => setIsHovered('patients')} 
          onMouseLeave={() => setIsHovered(null)}
        >
          <Link to="/create/patient" style={styles.patientButton}>
            Patient Portal
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 10%',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logoContainer: {
    cursor: 'pointer',
  },
  logo: {
    fontSize: '1.6rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.2s ease',
  },
  patientButton: {
    textDecoration: 'none',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'background-color 0.2s ease',
  }
};

export default Navbar;