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



  const handleSubmit = async () => {
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
{/* 
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

                <br /><br /> */}


                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>

                  <br /><br />

                  {status === "COMPLETED" && (
                    <>
                      <input
                        type="date"
                        value={date}
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