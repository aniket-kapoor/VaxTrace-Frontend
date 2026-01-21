import { useEffect, useState } from "react";
import UpdateDialog from "./UpdateVaccine";

function VaccineList({ plan }) {
  const [showDialog, setShowDialog] = useState(false);
  const [currentVaccine, setCurrentVaccine] = useState(null);
  const [vaccineList, setVaccineList] = useState([]);

  useEffect(() => {
    const vaccines = plan?.vaccines || plan?.plan || [];
    setVaccineList(Array.isArray(vaccines) ? vaccines : []);
  }, [plan]);

  const handleSave = (updatedVaccine) => {
    const updatedList = vaccineList.map((v) =>
      v.plan_id === updatedVaccine.plan_id ? { ...v, ...updatedVaccine } : v
    );
    setVaccineList(updatedList);
  };

  const infoCards = [
    {
      title: "Update Status",
      desc: "Click Update to change vaccine status or administered date.",
    },
    {
      title: "Pending vs Completed",
      desc: "Pending vaccines are due. Completed means already administered.",
    },
    // {
    //   title: "Missed Alert",
    //   desc: "If due date passed and not given, it may show as MISSED ⛔.",
    // },
    // {
    //   title: "Accuracy Matters",
    //   desc: "Correct administered date ensures proper next vaccine scheduling.",
    // },
  ];

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* ✅ LEFT 1/4 Sticky Sidebar */}
        <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-24 h-fit">
          {/* ✅ Patient Small Card */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-green-100">
            <h3 className="text-lg font-extrabold text-green-900">
              Patient Profile
            </h3>

            <div className="mt-3 space-y-2 text-sm">
              <p className="text-green-800/70">
                <span className="font-bold text-green-900">ID:</span>{" "}
                {plan?.patient_id || "N/A"}
              </p>

              <p className="text-green-800/70">
                <span className="font-bold text-green-900">Name:</span>{" "}
                {plan?.name || "N/A"}
              </p>

              <p className="text-green-800/70">
                <span className="font-bold text-green-900">Gender:</span>{" "}
                {plan?.gender || "N/A"}
              </p>

              <p className="text-green-800/70">
                <span className="font-bold text-green-900">Address:</span>{" "}
                {plan?.address || "N/A"}
              </p>
            </div>
          </div>

          {/* ✅ Instructions Title */}
          <h3 className="text-xl font-extrabold text-green-900">
            Update Instructions
          </h3>

          {/* ✅ Instruction Cards */}
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-md border border-green-100 hover:shadow-lg transition duration-200"
            >
              <h4 className="text-lg font-bold text-green-900">{card.title}</h4>
              <p className="text-sm text-green-800/70 mt-2">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* ✅ RIGHT 3/4 Table */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h3 className="text-2xl font-extrabold text-green-900">
                Vaccination Plan
              </h3>

              <p className="text-sm text-green-700 font-semibold">
                Total: {vaccineList.length}
              </p>
            </div>

            {vaccineList.length === 0 ? (
              <p className="mt-6 text-green-800/70 font-medium">
                No vaccines found.
              </p>
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-green-50 text-green-900">
                      <th className="px-4 py-3 text-sm font-bold rounded-l-xl">
                        #
                      </th>
                      <th className="px-4 py-3 text-sm font-bold">
                        Vaccine Name
                      </th>
                      <th className="px-4 py-3 text-sm font-bold">Dose</th>
                      <th className="px-4 py-3 text-sm font-bold">Due Date</th>
                      <th className="px-4 py-3 text-sm font-bold">Given On</th>
                      <th className="px-4 py-3 text-sm font-bold">Status</th>
                      <th className="px-4 py-3 text-sm font-bold rounded-r-xl">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {vaccineList.map((vaccine, index) => (
                      <tr
                        key={vaccine.plan_id || index}
                        className="border-b border-green-100 hover:bg-green-50/40 transition"
                      >
                        <td className="px-4 py-4 font-semibold text-green-900">
                          {index + 1}
                        </td>

                        <td className="px-4 py-4 text-green-900 font-semibold">
                          {vaccine.vaccine_name}
                        </td>

                        <td className="px-4 py-4 text-green-800">
                          {vaccine.dose_number}
                        </td>

                        <td className="px-4 py-4 text-green-800">
                          {vaccine.due_date || "-"}
                        </td>

                        <td className="px-4 py-4 text-green-800">
                          {vaccine.administered_date || "-"}
                        </td>

                        <td className="px-4 py-4">
                          {vaccine.status === "MISSED" ? (
                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs">
                              MISSED ⛔
                            </span>
                          ) : vaccine.status === "COMPLETED" ? (
                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-xs">
                              COMPLETED ✅
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-bold text-xs">
                              PENDING ⏳
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <button
                            onClick={() => {
                              setCurrentVaccine(vaccine);
                              setShowDialog(true);
                            }}
                            className="px-4 py-2 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition duration-200"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Dialog */}
            {showDialog && (
              <UpdateDialog
                vaccine={currentVaccine}
                onSave={handleSave}
                onClose={() => setShowDialog(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VaccineList;
