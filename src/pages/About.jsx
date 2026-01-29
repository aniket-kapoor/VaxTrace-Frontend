import React from "react";

const About = () => {
  return (
    <section className="w-full bg-[#fff7ed] min-h-screen">
      <div className="max-w-7xl mx-auto px-10 py-16">
        {/* Page Heading */}
        <div className="mb-10">
          <p className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold border border-green-200 shadow-sm">
            About VaxTrace
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mt-5">
            Building Safer Immunization Through Smart Tracking
          </h1>

          <p className="text-lg text-green-800/80 mt-4 max-w-3xl">
            VaxTrace is a government healthcare platform designed to help parents
            and healthcare workers track vaccination records, and send timely
            alerts whenever a vaccine due date arrives.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left Card */}
          <div className="bg-white p-8 rounded-3xl shadow-md border border-green-100">
            <h2 className="text-2xl font-bold text-green-900">
              Why VaxTrace?
            </h2>

            <ul className="mt-5 space-y-3 text-green-800/80">
              <li>✅ Helps prevent missed vaccination schedules</li>
              <li>✅ Centralized vaccine records in digital form</li>
              <li>✅ Reminder alerts for parents before due dates</li>
              <li>✅ Supports awareness about timely immunization</li>
              <li>✅ Improves tracking for public healthcare systems</li>
            </ul>

            <div className="mt-7 flex gap-4">
              <button className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition duration-200">
                Explore Features
              </button>

              <button className="px-6 py-3 rounded-xl border border-green-600 text-green-700 font-semibold shadow-sm hover:bg-green-600 hover:text-white transition duration-200">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Developer Card */}
          <div className="bg-white p-8 rounded-3xl shadow-md border border-green-100">
            <p className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold border border-green-200 shadow-sm">
              Developer
            </p>

            <h2 className="text-2xl font-bold text-green-900 mt-4">
              Aniket Kapoor
            </h2>

            <p className="text-green-800/80 mt-2">
              Computer Science & Engineering Undergraduate {" "}
              <span className="font-semibold text-green-900">
                Guru Nanak Dev University, Amritsar
              </span>
            </p>

            <div className="mt-6 space-y-3 text-green-800/80">
              <p>
                🚀 Built <span className="font-semibold text-green-900">VaxTrace</span>{" "}
                as a healthcare-focused platform to solve a real-world problem:
                missed vaccination schedules and poor tracking of records.
              </p>

              <p>
                💡 The goal is to provide a modern system for parents & healthcare
                workers with secure records, reminders, and awareness.
              </p>

              <p>
                ✅ Inspired by government healthcare initiatives & public safety needs.
              </p>
            </div>

            {/* Small badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 font-semibold text-sm">
                React + Tailwind
              </span>
              <span className="px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 font-semibold text-sm">
                Healthcare Platform
              </span>
              <span className="px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 font-semibold text-sm">
                Government Software
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 bg-white p-8 rounded-3xl shadow-md border border-green-100">
          <h3 className="text-xl font-bold text-green-900">
            Our Mission
          </h3>

          <p className="text-green-800/80 mt-3 max-w-4xl">
            To ensure that every child receives vaccines on time by providing a
            reliable tracking system and automated reminders, helping families stay
            safe and supporting public health through technology.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
