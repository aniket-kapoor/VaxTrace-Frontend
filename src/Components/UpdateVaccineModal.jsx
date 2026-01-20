import { useState } from "react";
import { BASE_URL } from "../config/api";
import { useEffect } from "react";



function UpdateDialog(props) {

    const [date, setDate] = useState(props.vaccine.administered_date || "");
    const [status, setStatus] = useState(props.vaccine.status);
    const[confirmStatus , setConfirm]=useState(true);


  useEffect(() => {
      setDate(props.vaccine.administered_date || "");
      setStatus(props.vaccine.status);
    }, [props.vaccine]);


  
  const today = new Date().toISOString().split("T")[0];



  const handleSubmit = async () => {

     if (status === "COMPLETED" && date === "") {
      alert("Please select administered date!");
      return;
    }

      if (status === "COMPLETED" && date > today) {
      alert("Future date is not allowed!");
      return;
    }
      const token = localStorage.getItem("access_token");

      const payload = {
        update_date: status === "COMPLETED" && date !== "" ? date : null,
        new_status: status,
        confirm: true,
      };


      const res = await fetch(`${BASE_URL}/plan/${props.vaccine.plan_id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),


      });

      const updatedVaccine = await res.json();
      console.log("UPDATED RESPONSE:", updatedVaccine);

      props.onSave(updatedVaccine);  // ✅ updates table
                 // ✅ closes modal

 };

  
        
   


    return (
        <div style={overlayStyle}>
            <div style={boxStyle}>
                <h3>Update Vaccine</h3>


                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                      <option value="PENDING">⏳ Pending</option>
                      <option value="COMPLETED">✅ Completed</option>
                      <option value="MISSED">⛔ Missed</option>
                  </select>

                  <br /><br />

                  {status === "COMPLETED" && (
                    <>
                      <input
                        type="date"
                        value={date}
                         max={today}
                        onChange={(e) => setDate(e.target.value)}
                      />
                      <br /><br />
                    </>
                    )}

                <button onClick={handleSubmit}>Save</button>

                <button onClick={props.onClose}>Cancel</button>


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