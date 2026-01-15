import React from 'react';

const Home = () => {
  return (
    <div style={styles.wrapper}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.mainTitle}>
            Global Vaccination <br />
            <span style={styles.highlight}>Trust & Transparency</span>
          </h1>
          <p style={styles.heroLead}>
            VaxTrace is a blockchain-powered ecosystem designed to secure, verify, 
            and manage immunization records globally. Eliminating fraud and 
            simplifying international health compliance.
          </p>
          <div style={styles.ctaContainer}>
            <button style={styles.primaryBtn}>Access Digital Passport</button>
            <button style={styles.secondaryBtn}>Verify a Record</button>
          </div>
        </div>
        <div style={styles.heroVisual}>
          {/* Placeholder for a hero illustration or 3D shield icon */}
          <div style={styles.abstractGraphic}>🛡️</div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <div style={styles.statsBar}>
        <div style={styles.statItem}><strong>100%</strong><span>Immutable</span></div>
        <div style={styles.statItem}><strong>Global</strong><span>Standards</span></div>
        <div style={styles.statItem}><strong>Zero</strong><span>Knowledge Privacy</span></div>
      </div>

      {/* Features Grid */}
      <section style={styles.featureSection}>
        <h2 style={styles.sectionHeading}>The VaxTrace Advantage</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.cardIcon}>🧬</div>
            <h3>Decentralized Identity</h3>
            <p>Your health data belongs to you. Not a central database. Control access with your private key.</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>🔗</div>
            <h3>Smart Contract Logic</h3>
            <p>Automatic verification of booster schedules and validity periods through pre-defined protocols.</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>📱</div>
            <h3>QR Integration</h3>
            <p>Generate secure, time-sensitive QR codes for touchless verification at airports and venues.</p>
          </div>
        </div>
      </section>

      {/* About / Mission Section */}
      <section style={styles.missionSection}>
        <div style={styles.missionContent}>
          <h2>Bridging the Gap in Healthcare</h2>
          <p>
            VaxTrace solves the "fragmented record" problem. By utilizing a distributed ledger, 
            we ensure that whether you are vaccinated in London or Lima, your record is 
            instantly verifiable by authorized healthcare entities without compromising your 
            personal identity data.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2026 VaxTrace Protocol. Empowering public health through cryptography.</p>
      </footer>
    </div>
  );
};

// Styling Object
const styles = {
  wrapper: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    backgroundColor: '#ffffff',
    color: '#1a202c',
    overflowX: 'hidden',
  },
  heroSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '100px 10% 80px',
    background: 'radial-gradient(circle at top right, #eef2ff 0%, #ffffff 50%)',
    minHeight: '60vh',
  },
  heroContent: {
    flex: '1',
    maxWidth: '600px',
  },
  mainTitle: {
    fontSize: '3.5rem',
    lineHeight: '1.1',
    color: '#0f172a',
    margin: '0 0 24px 0',
  },
  highlight: {
    color: '#2563eb',
  },
  heroLead: {
    fontSize: '1.25rem',
    color: '#475569',
    marginBottom: '40px',
    lineHeight: '1.7',
  },
  ctaContainer: {
    display: 'flex',
    gap: '16px',
  },
  primaryBtn: {
    padding: '16px 32px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
  },
  secondaryBtn: {
    padding: '16px 32px',
    backgroundColor: 'white',
    color: '#2563eb',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  heroVisual: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '15rem',
  },
  statsBar: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '40px 10%',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #f1f5f9',
    borderBottom: '1px solid #f1f5f9',
  },
  statItem: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.1rem',
  },
  featureSection: {
    padding: '100px 10%',
  },
  sectionHeading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '60px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
  },
  card: {
    padding: '40px',
    borderRadius: '16px',
    backgroundColor: '#fff',
    border: '1px solid #f1f5f9',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
  },
  cardIcon: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  missionSection: {
    padding: '100px 10%',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    textAlign: 'center',
  },
  missionContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  footer: {
    padding: '60px 10%',
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '0.9rem',
  }
};

export default Home;