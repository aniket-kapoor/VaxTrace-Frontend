import { useState } from "react";


function ParentVaccineList({ vaccines }) {
 
  const[vaccineList]=useState(vaccines);




  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Vaccination Plan</h3>

      {vaccineList.length === 0 ? (
        <p>No vaccines found</p>
      ) : (
        <>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Vaccine Name</th>
                <th>Dose</th>
                <th>Due Date</th>
                <th>Vaccine Given On</th>
                <th>Status</th>
                
              </tr>
            </thead>

            <tbody>
              {vaccineList.map((vaccine, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{vaccine.vaccine_name}</td>
                  <td>{vaccine.dose_number}</td>
                  <td>{vaccine.due_date}</td>
                  <td>{vaccine.administered_date}</td>
                  <td>{vaccine.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </>
      )}
    </div>
  );
}

export default ParentVaccineList;
