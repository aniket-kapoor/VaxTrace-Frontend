import { useState } from "react";
import UpdateDialog from "./UpdateVaccineModal";

function VaccineList({ vaccines }) {
  const [showDialog, setShowDialog] = useState(false);

  const [vaccineList, setVaccineList] = useState(vaccines);

  const handleSave = (updatedVaccine) => {
  const updatedList = vaccineList.map((v) =>
    v.id === updatedVaccine.id ? updatedVaccine : v
  );

  setVaccineList(updatedList);
};


  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Vaccination Plan</h3>

      {vaccines.length === 0 ? (
        <p>No vaccines found</p>
      ) : (
        <>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Vaccine Name</th>
                <th>Dose</th>
                <th>Due Date</th>
                <th>Vaccine Given On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {vaccines.map((vaccine, index) => (
                <tr key={index}>
                  <td>{vaccine.vaccine_name}</td>
                  <td>{vaccine.dose_number}</td>
                  <td>{vaccine.due_date}</td>
                  <td>{vaccine.administered_date}</td>
                  <td>{vaccine.status}</td>
                  <td>
                    <button onClick={() =>{
                      setSelectedVaccine(vaccine);
                      setShowDialog(true);
                    } }>
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showDialog && (
            <UpdateDialog   vaccine={selectedVaccine} 
                            onSave={handleSave}
                            onClose={() => setShowDialog(false)} />
          )}
        </>
      )}
    </div>
  );
}

export default VaccineList;















































// const VaccinationPlan = ({ plan }) => {

//     const VaccineItem = ({ vaccine }) => {
//   return (
//     <div style={styles.vaccineRow}>
//       <div>
//         <strong>{vaccine.vaccine_name}</strong>
//         <p style={styles.subText}>Dose {vaccine.dose_number}</p>
//       </div>

//       <div style={{ textAlign: "right" }}>
//         <p style={styles.subText}>
//           Due: {new Date(vaccine.due_date).toLocaleDateString()}
//         </p>
//         <span style={styles.status}>{vaccine.status}</span>
//       </div>
//     </div>
//   );
// };

//   return (
//     <div style={styles.card}>
//       <h2 style={styles.heading}>Vaccination Plan</h2>

//       {plan.vaccines.length > 0 ? (
//         plan.vaccines.map((vaccine, index) => (
//           <VaccineItem key={index} vaccine={vaccine} />
//         ))
//       ) : (
//         <p>No vaccines scheduled</p>
//       )}
//     </div>
//   );
// };

// export default VaccinationPlan;


