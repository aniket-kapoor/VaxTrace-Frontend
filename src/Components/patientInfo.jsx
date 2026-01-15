function PatientInfo({ plan }) {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        border: "1px solid #ccc",
      }}
    >
      <h3>Patient Information</h3>
      <p><strong>ID:</strong> {plan.patient_id}</p>
      <p><strong>Name:</strong> {plan.name}</p>
      <p><strong>Gender:</strong> {plan.gender}</p>
      <p><strong>Address:</strong> {plan.address}</p>
    </div>
  );
}

export default PatientInfo































// const PatientInfo = ({ plan }) => {

// const InfoRow = ({ label, value }) => (
//   <div style={styles.row}>
//     <span style={styles.label}>{label}</span>
//     <span style={styles.value}>{value}</span>
//   </div>
// );



//   return (
//     <div style={styles.card}>
//       <h2 style={styles.heading}>Patient Information</h2>

//       <InfoRow label="Patient ID" value={plan.patient_id} />
//       <InfoRow label="Name" value={plan.name} />
//       <InfoRow label="Gender" value={plan.gender} />
//       <InfoRow label="Address" value={plan.address} />
//     </div>
//   );
// };

// export default PatientInfo;


