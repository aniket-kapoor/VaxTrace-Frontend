import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config/api";

const MyAccount = () => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyAccount = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("access_token");

      const res = await fetch(`${BASE_URL}/user/myaccount`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail || "Failed to fetch account details");
      }

      setAccount(data);
    } catch (err) {
      console.log(err);
      setError(err.message || "Failed to fetch account details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAccount();
  }, []);

  // ✅ Loading UI
  if (loading) {
    return (
      <section className="min-h-screen bg-[#fff7ed] flex items-center justify-center px-6">
        <div className="bg-white border border-green-100 shadow-lg rounded-3xl p-8 w-full max-w-md text-center">
          <p className="text-green-900 font-extrabold text-xl">
            Loading account details...
          </p>
          <p className="text-green-800/70 mt-2 text-sm">
            Please wait a moment ⏳
          </p>
        </div>
      </section>
    );
  }

  // ✅ Error UI
  if (error) {
    return (
      <section className="min-h-screen bg-[#fff7ed] flex items-center justify-center px-6">
        <div className="bg-white border border-red-200 shadow-lg rounded-3xl p-8 w-full max-w-md text-center">
          <p className="text-red-600 font-extrabold text-xl">
            Something went wrong ❌
          </p>
          <p className="text-red-500 mt-3 text-sm font-semibold">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#fff7ed] py-14 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold border border-green-200 shadow-sm">
            Profile
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mt-4">
            My Account
          </h2>

          <p className="text-green-800/70 mt-2">
            View your account details and verification information.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 md:p-8">
          <h3 className="text-2xl font-extrabold text-green-900 mb-6">
            Account Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Email */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
              <p className="text-sm text-green-700 font-semibold">Email</p>
              <p className="text-lg font-bold text-green-900 mt-1">
                {account?.email}
              </p>
            </div>

            {/* Account Type */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
              <p className="text-sm text-green-700 font-semibold">
                Account Type
              </p>
              <p className="text-lg font-bold text-green-900 mt-1 capitalize">
                {account?.account_type}
              </p>
            </div>

            {/* ✅ Worker-only Fields */}
            {account?.account_type === "worker" && (
              <>
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                  <p className="text-sm text-green-700 font-semibold">
                    Institution Name
                  </p>
                  <p className="text-lg font-bold text-green-900 mt-1">
                    {account?.institution_name || "N/A"}
                  </p>
                </div>

                <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                  <p className="text-sm text-green-700 font-semibold">
                    Institution Type
                  </p>
                  <p className="text-lg font-bold text-green-900 mt-1">
                    {account?.type_institution || "N/A"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
