import { BASE_URL } from "../config/api";
import VerifyApplicationAction from "./VerifyApplication";



const ApplicationCard = ({ application, index , onActionSuccess }) => {
  const token = localStorage.getItem("access_token");

  const handleAction = async (status) => {
    try {
      const response = await fetch(
        `${BASE_URL}/applications/${application.id}/verify`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update application");
      }

      onActionSuccess();
    } catch (err) {
      alert(err.message);
    }
  };

  return (

    
    <div className="border rounded-xl p-5 shadow bg-white">
      {/* ❌ ID NOT SHOWN */}

      <div className="flex justify-between items-center mb-3">
  <h2 className="text-lg font-bold text-gray-800">
    Application #{index + 1}
  </h2>

  <span className="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
    {application.application_status}
  </span>
</div>

      <p><strong>Name:</strong> {application.name}</p>
      <p><strong>Gender:</strong> {application.gender}</p>
      <p><strong>Date of Birth:</strong> {application.dob}</p>
      <p><strong>Father Name:</strong> {application.father_name}</p>
      <p><strong>District:</strong> {application.district}</p>
      <p><strong>Pincode:</strong> {application.pincode}</p>
      <p><strong>Address:</strong> {application.Address}</p>

      <p className="mt-2">
        <strong>Status:</strong>{" "}
        <span className="text-yellow-600 font-semibold">
          {application.application_status}
        </span>
      </p>

      {/* 📄 Documents */}
      <div className="mt-3">
        <strong>Documents:</strong>
        <ul className="list-disc ml-5">
          {application.documents.map((doc, index) => (
            <li key={index}>
              {doc.document_type}
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Actions */}
      <div className="flex gap-3 mt-4">
        <VerifyApplicationAction
          patientId={application.id}
          status="approved"
          onSuccess={onActionSuccess}
          onError={(msg) => alert(msg)}
        />

        <VerifyApplicationAction
          patientId={application.id}
          status="rejected"
          onSuccess={onActionSuccess}
          onError={(msg) => alert(msg)}
        />
      </div>
    </div>
  );
};

export default ApplicationCard;
