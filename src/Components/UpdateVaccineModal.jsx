import { useState } from "react";

function UpdateDialog({ vaccine,onSave, onClose}) {

    const [date, setDate] = useState(vaccine.administered_date);
    const [status, setStatus] = useState(vaccine.status);

      const handleSubmit = () => {
    const updatedVaccine = {
      ...vaccine,
      due_date: dueDate,
      status: status,
    };

    onSave(updatedVaccine);   // ✅ This will work now
    onClose();
  };


    return (
        <div style={overlayStyle}>
            <div style={boxStyle}>
                <h3>Update Vaccine</h3>

                <input type="date"
                       value={date}
                       onChange={(e) => setDate(e.target.value)} />
                        <br /><br />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option>PENDING</option>
                    <option>COMPLETED</option>
                </select>

                <br /><br />

                <button onClick={handleSubmit}>Save</button>

                <button onClick={onClose}>Cancel</button>


            </div>
        </div>
    )

}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const boxStyle = {
  background: "white",
  padding: "20px",
};



export default UpdateDialog;