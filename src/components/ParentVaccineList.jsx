import { useEffect, useMemo, useState } from "react";

function ParentVaccineList({ plan }) {
  const [vaccineList, setVaccineList] = useState([]);

  useEffect(() => {
    const vaccines = plan?.vaccines || plan?.plan || [];
    setVaccineList(Array.isArray(vaccines) ? vaccines : []);
  }, [plan]);

  // ✅ today in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // ✅ find nearest upcoming due date (>= today) among NOT completed vaccines
  const nextUpcomingPlanId = useMemo(() => {
    const upcoming = vaccineList
      .filter((v) => v?.due_date && v.due_date >= today && v.status !== "COMPLETED")
      .sort((a, b) => a.due_date.localeCompare(b.due_date));

    return upcoming[0]?.plan_id || null;
  }, [vaccineList, today]);

  // ✅ helper: determine row type
  const getRowType = (vaccine) => {
    const due = vaccine?.due_date;

    // if already completed → no missed logic
    if (vaccine.status === "COMPLETED") return "COMPLETED";

    // if due date exists and passed → missed
    if (due && due < today) return "MISSED";

    // nearest upcoming due → green highlight
    if (vaccine.plan_id === nextUpcomingPlanId) return "NEXT";

    return "NORMAL";
  };

  // ✅ status override for parents
  const getDisplayStatus = (vaccine) => {
    const rowType = getRowType(vaccine);

    if (rowType === "MISSED") return "MISSED";
    return vaccine.status || "PENDING";
  };

  const infoCards = [
    {
      title: "Green Row = Next Vaccine",
      desc: "This is the nearest upcoming due vaccine. Prioritize this one.",
    },
    {
      title: "Red Row = Missed",
      desc: "Due date passed and vaccine is not completed. Consult healthcare worker.",
    },
    {
      title: "Completed ✅",
      desc: "Already administered vaccine. No action required.",
    },
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
            Important Notes
          </h3>

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
                Vaccination Schedule
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
                      <th className="px-4 py-3 text-sm font-bold rounded-r-xl">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {vaccineList.map((vaccine, index) => {
                      const rowType = getRowType(vaccine);
                      const displayStatus = getDisplayStatus(vaccine);

                      // ✅ row styling
                      const rowClass =
                        rowType === "MISSED"
                          ? "bg-red-50 hover:bg-red-100/60 border-b border-red-200"
                          : rowType === "NEXT"
                          ? "bg-green-50 hover:bg-green-100/60 border-b border-green-200"
                          : "border-b border-green-100 hover:bg-green-50/40";

                      return (
                        <tr
                          key={vaccine.plan_id || index}
                          className={`${rowClass} transition`}
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
                            {displayStatus === "MISSED" ? (
                              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs">
                                MISSED ⛔
                              </span>
                            ) : displayStatus === "COMPLETED" ? (
                              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-xs">
                                COMPLETED ✅
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-bold text-xs">
                                PENDING ⏳
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentVaccineList;
