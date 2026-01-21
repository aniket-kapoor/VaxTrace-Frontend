function PatientInfo({ plan }) {
  if (!plan) return null;

  return (
    <div className="bg-white rounded-3xl shadow-md border border-green-100 p-6 md:p-8">
      <h3 className="text-2xl font-extrabold text-green-900">
        Patient Information
      </h3>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
          <p className="text-sm text-green-700 font-semibold">Patient ID</p>
          <p className="text-lg font-bold text-green-900">{plan.patient_id}</p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
          <p className="text-sm text-green-700 font-semibold">Name</p>
          <p className="text-lg font-bold text-green-900">{plan.name}</p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
          <p className="text-sm text-green-700 font-semibold">Gender</p>
          <p className="text-lg font-bold text-green-900">{plan.gender}</p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
          <p className="text-sm text-green-700 font-semibold">Address</p>
          <p className="text-lg font-bold text-green-900">
            {plan.address || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PatientInfo;
