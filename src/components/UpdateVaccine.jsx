import { useEffect, useState } from "react";
import { BASE_URL } from "../config/api";

function UpdateDialog(props) {
  const { vaccine, onSave, onClose } = props;

  const [date, setDate] = useState(vaccine?.administered_date || "");
  const [status, setStatus] = useState(vaccine?.status || "PENDING");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDate(vaccine?.administered_date || "");
    setStatus(vaccine?.status || "PENDING");
  }, [vaccine]);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {
    try {
      // ✅ validations
      if (status === "COMPLETED" && date === "") {
        alert("Please select administered date!");
        return;
      }

      if (status === "COMPLETED" && date > today) {
        alert("Future date is not allowed!");
        return;
      }

      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("Unauthorized. Please login again.");
        return;
      }

      setLoading(true);

      const payload = {
        update_date: status === "COMPLETED" && date !== "" ? date : null,
        new_status: status,
        confirm: true,
      };

      const res = await fetch(`${BASE_URL}/plan/${vaccine.plan_id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const updatedVaccine = await res.json();

      if (!res.ok) {
        console.error("Update Error:", updatedVaccine);
        alert(updatedVaccine?.detail || "Update failed!");
        return;
      }

      onSave(updatedVaccine); // ✅ update table instantly
      onClose(); // ✅ close modal after successful update
    } catch (error) {
      console.error(error);
      alert("Server error while updating!");
    } finally {
      setLoading(false);
    }
  };

  // close on background click
  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") {
      onClose();
    }
  };

  if (!vaccine) return null;

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-green-100 p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm border border-green-200">
              Update Vaccine Status
            </p>

            <h3 className="text-2xl font-extrabold text-green-900 mt-3">
              {vaccine.vaccine_name}
            </h3>

            <p className="text-green-800/70 mt-1 text-sm">
              Dose:{" "}
              <span className="font-semibold text-green-900">
                {vaccine.dose_number}
              </span>{" "}
              • Due Date:{" "}
              <span className="font-semibold text-green-900">
                {vaccine.due_date || "-"}
              </span>
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-green-900 hover:text-red-600 font-bold text-xl transition"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="mt-8 space-y-5">
          {/* Status */}
          <div className="flex flex-col gap-2">
            <label className="text-green-900 font-semibold">
              Vaccine Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400 bg-white font-semibold text-green-900"
            >
              <option value="PENDING">⏳ Pending</option>
              <option value="COMPLETED">✅ Completed</option>
              <option value="MISSED">⛔ Missed</option>
            </select>
          </div>

          {/* Date input only for completed */}
          {status === "COMPLETED" && (
            <div className="flex flex-col gap-2">
              <label className="text-green-900 font-semibold">
                Administered Date
              </label>

              <input
                type="date"
                value={date}
                max={today}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-400"
              />

              <p className="text-xs text-green-700 font-medium">
                ✅ Administered date cannot be a future date.
              </p>
            </div>
          )}

          {/* Helpful note */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
            <p className="text-sm text-green-900 font-semibold">
              Tip for accurate update ✅
            </p>
            <p className="text-sm text-green-800/70 mt-1">
              Choose <b>Completed</b> only when the vaccine is given. If the child
              missed the due date, choose <b>Missed</b>.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-3 rounded-2xl bg-green-600 text-white font-bold shadow hover:bg-green-700 transition duration-200 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Update"}
            </button>

            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 rounded-2xl border border-green-600 text-green-700 font-bold shadow-sm hover:bg-green-600 hover:text-white transition duration-200 disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateDialog;
