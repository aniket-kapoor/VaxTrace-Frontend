import { useEffect, useState } from "react";
import ApplicationCard from "../components/ApplicationCard";
import { BASE_URL } from "../config/api";

const PendingApplications = () => {
  const [applicationsList, setApplication] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchApplication = async () => {
    const token = localStorage.getItem("access_token");

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${BASE_URL}/patients/selfRegistration/applications`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || "No Pending Applications");
      }

      setApplication(data);
    } catch (err) {
      setError(err.message);
      setApplication([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (applicationsList.length === 0) return <p>No pending applications</p>;

  return (
    <div className="space-y-4">
      {applicationsList.map((application , index) => (
        <ApplicationCard
          key={application.id}
          application={application}
          index={index}
          onActionSuccess={fetchApplication}
        />
      ))}
    </div>
  );
};

export default PendingApplications;
