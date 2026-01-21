import React from "react";
import AboutSection from "../components/AboutSection";

const Home = () => {
  const awarenessData = [
    {
      title: "Timely Vaccination",
      desc: "Stay on schedule & prevent risks",
      img: "https://cdn-icons-png.flaticon.com/512/2966/2966486.png",
    },
    {
      title: "Digital Records",
      desc: "All vaccination records in one place",
      img: "https://cdn-icons-png.flaticon.com/512/2920/2920244.png",
    },
    {
      title: "Smart Alerts",
      desc: "Get reminders before due dates",
      img: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
    },
  ];

  return (
    <>
    <section className="w-full bg-[#fff7ed]">
      <div className="max-w-7xl mx-auto px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE CONTENT */}
          <div className="space-y-6">
            <p className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold border border-green-200 shadow-sm">
              🇮🇳 Government Initiative
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">
              VaxTrace — Track Vaccine Records & Send Smart Alerts
            </h1>

            <p className="text-lg text-green-800/80 leading-relaxed">
              <span className="font-semibold text-green-900">VaxTrace</span> is a
              government platform that helps parents track vaccination records
              of children and automatically sends reminders when the next vaccine
              due date arrives.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <button className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition duration-200">
                Get Started
              </button>

              <button className="px-6 py-3 rounded-xl border border-green-600 text-green-700 font-semibold shadow-sm hover:bg-green-600 hover:text-white transition duration-200">
                View Features
              </button>
            </div>

            {/* Small Info Cards */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-white rounded-2xl p-4 shadow-md border border-green-100">
                <p className="text-2xl font-bold text-green-700">24/7</p>
                <p className="text-sm text-green-800/70">Tracking</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md border border-green-100">
                <p className="text-2xl font-bold text-green-700">Instant</p>
                <p className="text-sm text-green-800/70">Alerts</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md border border-green-100">
                <p className="text-2xl font-bold text-green-700">Secure</p>
                <p className="text-sm text-green-800/70">Records</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE ICON STACK */}
          <div className="flex flex-col gap-6 items-center md:items-end">

            {awarenessData.map((item, index) => (
              <div
                key={index}
                className="w-full max-w-md flex items-center gap-4 bg-white p-5 rounded-2xl shadow-md border border-green-100 hover:shadow-lg transition duration-200"
              >
                {/* Circular icon */}
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center border border-green-200 shadow-sm">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-8 h-8 object-contain"
                  />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-bold text-green-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-green-800/70">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
     <AboutSection/>
    </>
  );
};

export default Home;
