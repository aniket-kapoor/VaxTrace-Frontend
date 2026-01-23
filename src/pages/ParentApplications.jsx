import { useEffect, useState } from "react";
import { BASE_URL } from "../config/api";

function ApplicationStatusPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ parent_contact input
  const [contact, setContact] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("Unauthorized. Please login again.");
        return;
      }

      // ✅ validation
      if (!contact || contact.length !== 10) {
        setError("Please enter a valid 10-digit phone number.");
        return;
      }

      // ✅ E.164 format expected
      const parent_contact = `+91${contact}`;

      const response = await fetch(
        `${BASE_URL}/check/application/status?parent_contact=${encodeURIComponent(
          parent_contact
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Backend error:", data);
        setError(data?.detail || "Failed to fetch applications");
        return;
      }

      setApplications(data || []);
    } catch (err) {
      console.error(err);
      setError("Server error while fetching applications");
    } finally {
      setLoading(false);
    }
  };

  // ✅ format created_at & updated_at
  const formatDateTime = (isoString) => {
    if (!isoString) return "N/A";
    const d = new Date(isoString);
    return d.toLocaleString();
  };

  const getStatusTheme = (status) => {
    const s = (status || "").toLowerCase();

    if (s === "rejected") {
      return {
        border: "border-red-300",
        bg: "bg-red-50",
        title: "text-red-900",
        badge: "bg-red-600 text-white",
        label: "text-red-800",
        subtle: "text-red-700/80",
      };
    }

    if (s === "approved") {
      return {
        border: "border-green-300",
        bg: "bg-green-50",
        title: "text-green-900",
        badge: "bg-green-600 text-white",
        label: "text-green-800",
        subtle: "text-green-700/80",
      };
    }

    // ✅ processing / default
    return {
      border: "border-yellow-300",
      bg: "bg-yellow-50",
      title: "text-yellow-900",
      badge: "bg-yellow-500 text-white",
      label: "text-yellow-800",
      subtle: "text-yellow-700/80",
    };
  };

  return (
    <section className="min-h-screen w-full bg-[#fff7ed] py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-10">
          <p className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold border border-green-200 shadow-sm">
            My Applications
          </p>

          <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 mt-4">
            Application Status
          </h1>

          <p className="text-green-800/80 mt-2 max-w-3xl">
            Enter your phone number to view your submitted child registration
            applications.
          </p>
        </div>

        {/* ✅ Parent Contact Search Box */}
        <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 md:p-8 mb-8">
          <h2 className="text-xl font-extrabold text-green-900">
            Check Applications
          </h2>

          <p className="text-green-800/70 mt-1">
            Enter the same phone number used during registration.
          </p>

          <div className="mt-5 flex flex-col md:flex-row gap-4">
            <div className="flex items-center w-full">
              <span className="px-4 py-3 rounded-l-xl bg-green-100 text-green-700 border border-green-200 font-semibold">
                +91
              </span>

              <input
                type="tel"
                value={contact}
                onChange={(e) =>
                  setContact(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="Enter 10-digit number"
                className="w-full px-4 py-3 rounded-r-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              onClick={fetchApplications}
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-green-600 text-white font-bold shadow hover:bg-green-700 transition duration-200 disabled:opacity-60"
            >
              {loading ? "Checking..." : "Check Status"}
            </button>
          </div>
        </div>

        {/* Error */}
        {!loading && error && (
          <div className="bg-white border border-red-200 shadow rounded-2xl p-6 mb-8">
            <p className="text-red-700 font-bold">Error:</p>
            <p className="text-red-800/80 mt-1">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && applications?.length === 0 && (
          <div className="bg-white border border-green-100 shadow rounded-2xl p-6">
            <p className="text-green-900 font-semibold">
              No applications found.
            </p>
            <p className="text-green-800/70 mt-1">
              If you recently applied, please wait a few minutes and try again.
            </p>
          </div>
        )}

        {/* Applications List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {applications?.map((app) => {
            const theme = getStatusTheme(app.application_status);

            return (
              <div
                key={app.id}
                className={`rounded-3xl shadow-lg border p-6 transition duration-200 hover:shadow-xl ${theme.border} ${theme.bg}`}
              >
                {/* Top Row */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className={`text-xl font-extrabold ${theme.title}`}>
                      {app.name}
                    </h2>
                    <p className={`${theme.subtle} text-sm mt-1`}>
                      Application ID:{" "}
                      <span className="font-semibold">{app.id}</span>
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${theme.badge}`}
                  >
                    {String(app.application_status).toUpperCase()}
                  </span>
                </div>

                {/* Info */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm font-semibold ${theme.label}`}>
                      Gender
                    </p>
                    <p className="text-gray-800 font-medium">{app.gender}</p>
                  </div>

                  <div>
                    <p className={`text-sm font-semibold ${theme.label}`}>
                      Father Name
                    </p>
                    <p className="text-gray-800 font-medium">{app.father_name}</p>
                  </div>

                  <div>
                    <p className={`text-sm font-semibold ${theme.label}`}>
                      Parent Contact
                    </p>
                    <p className="text-gray-800 font-medium">
                      {app.parent_contact}
                    </p>
                  </div>

                  <div>
                    <p className={`text-sm font-semibold ${theme.label}`}>
                      District
                    </p>
                    <p className="text-gray-800 font-medium">{app.district}</p>
                  </div>

                  <div>
                    <p className={`text-sm font-semibold ${theme.label}`}>
                      State
                    </p>
                    <p className="text-gray-800 font-medium">{app.state}</p>
                  </div>

                  <div>
                    <p className={`text-sm font-semibold ${theme.label}`}>
                      Address
                    </p>
                    <p className="text-gray-800 font-medium">{app.Address}</p>
                  </div>
                </div>

                {/* Dates */}
                <div className="mt-6 border-t border-black/10 pt-4 flex flex-col gap-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Submitted on:</span>{" "}
                    {formatDateTime(app.created_at)}
                  </p>

                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Updated at:</span>{" "}
                    {formatDateTime(app.updated_at)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ApplicationStatusPage;

