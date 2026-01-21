import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="w-full bg-[#fff7ed]">
      <div className="max-w-7xl mx-auto px-10 py-16">
        <div className="mb-10">
          <p className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold border border-green-200 shadow-sm">
            About VaxTrace
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-green-900 mt-5">
            Built for Healthcare Tracking & Safety
          </h2>

          <p className="text-lg text-green-800/80 mt-4 max-w-3xl">
            VaxTrace is a government healthcare platform designed to help parents
            track vaccination records and receive smart alerts when vaccine due dates arrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Card */}
          <div className="bg-white p-8 rounded-3xl shadow-md border border-green-100">
            <h3 className="text-2xl font-bold text-green-900">
              Why VaxTrace?
            </h3>

            <ul className="mt-5 space-y-3 text-green-800/80">
              <li>✅ Prevent missed vaccine schedules</li>
              <li>✅ Secure digital vaccination records</li>
              <li>✅ Alerts & reminders for parents</li>
              <li>✅ Supports health awareness</li>
              <li>✅ Helps public healthcare systems</li>
            </ul>
          </div>

          {/* Developer Card */}
          <div className="bg-white p-8 rounded-3xl shadow-md border border-green-100">
            <p className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold border border-green-200 shadow-sm">
              Developer
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-4">
              Aniket Kapoor
            </h3>

            <p className="text-green-800/80 mt-2">
              2nd Year B.Tech (CSE) Student at{" "}
              <span className="font-semibold text-green-900">
                Guru Nanak Dev University, Amritsar
              </span>
            </p>

            <p className="text-green-800/80 mt-5">
              🚀 Developed this platform to help parents stay updated with vaccine schedules,
              reduce missed vaccinations, and improve healthcare tracking through technology.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 font-semibold text-sm">
                React + Tailwind
              </span>
              <span className="px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 font-semibold text-sm">
                Government Software
              </span>
              <span className="px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 font-semibold text-sm">
                Healthcare Platform
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
