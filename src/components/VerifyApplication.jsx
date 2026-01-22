import { BASE_URL } from "../config/api";

const VerifyApplicationAction = ({
  patientId,
  status,
  onSuccess,
  onError,
}) => {
  const token = localStorage.getItem("access_token");

  const verifyApplication = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/verify/application?patient_id=${patientId}&status=${status}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.detail || "Verification failed");
      }

      onSuccess();
    } catch (err) {
      onError(err.message);
    }
  };

  return (
    <button
      onClick={verifyApplication}
      className={
        status === "approved"
          ? "bg-green-600 text-white px-4 py-2 rounded"
          : "bg-red-600 text-white px-4 py-2 rounded"
      }
    >
      {status === "approved" ? "Accept" : "Reject"}
    </button>
  );
};

export default VerifyApplicationAction;
