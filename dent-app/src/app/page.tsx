"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-[#800000] px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-4">
          <Image src="/up.png" alt="UP Logo" width={64} height={64} className="w-16 h-16" />
          <Image src="/upcd.png" alt="UPCD Logo" width={72} height={72} className="w-18 h-18" />
          <div className="text-white">
            <h1 className="text-2xl font-bold leading-tight">
              University of the Philippines Manila
            </h1>
            <h2 className="text-lg font-medium">College of Dentistry</h2>
          </div>
        </div>

        <button
          className="text-white px-8 py-2.5 text-base font-semibold bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-[#800000] transition-all duration-300 hover:cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Log in
        </button>
      </nav>

      {/* Hero Section */}
      <div
        className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/landingbg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">DentIS 3.0</h1>
            <p className="text-2xl text-white/90 mb-4 font-medium">Dental Information System</p>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              An integrated platform for patient registration, dental records management, and
              referral lookup designed for the UP Manila College of Dentistry
            </p>
            <div className="flex gap-4">
              <button
                className="px-8 py-4 bg-[#800000] text-white rounded-lg shadow-xl hover:bg-[#990000] hover:shadow-2xl border-2 border-white font-bold text-lg transform hover:scale-105 transition-all duration-200 hover:cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Get Started
              </button>
              <button
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg shadow-xl hover:bg-white/20 border-2 border-white font-bold text-lg transition-all duration-200 hover:cursor-pointer"
                onClick={() =>
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-50 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#800000] mb-4">System Features</h2>
            <p className="text-xl text-gray-600">Comprehensive tools for dental care management</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-[#800000]">
              <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Patient Registration</h3>
              <p className="text-gray-600 leading-relaxed">
                Streamlined patient admission process with comprehensive data collection and secure
                record storage
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-[#800000]">
              <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Dental Records Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete dental charting system including periodontal assessments, treatment plans,
                and patient history
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-[#800000]">
              <div className="w-16 h-16 bg-[#800000] rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Patient Referral Lookup</h3>
              <p className="text-gray-600 leading-relaxed">
                Integrated referral system for seamless coordination between departments and
                healthcare providers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-[#800000] py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-xl text-white/80">Years of Excellence</div>
            </div>
            <div className="text-white">
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-xl text-white/80">Patients Served</div>
            </div>
            <div className="text-white">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-xl text-white/80">System Availability</div>
            </div>
            <div className="text-white">
              <div className="text-5xl font-bold mb-2">Secure</div>
              <div className="text-xl text-white/80">Data Protection</div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#800000] mb-6">About the System</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                DentIS 3.0 is a comprehensive dental information management system developed
                specifically for the UP Manila College of Dentistry. Our platform modernizes patient
                care delivery through digital record-keeping, efficient referral management, and
                streamlined clinical workflows.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Built with the latest web technologies, DentIS ensures data security, accessibility,
                and user-friendly interfaces for both clinical staff and administrators.
              </p>
              <button
                className="px-8 py-3 bg-[#800000] text-white rounded-lg shadow-lg hover:bg-[#990000] font-semibold text-lg transition-all duration-200 hover:cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Access the System
              </button>
            </div>
            <div className="bg-gradient-to-br from-[#800000]/10 to-[#800000]/5 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#800000] mr-3 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Paperless record-keeping for environmental sustainability
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#800000] mr-3 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Faster patient processing and reduced wait times
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#800000] mr-3 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Enhanced data accuracy and clinical decision support
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#800000] mr-3 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Seamless integration with existing clinical workflows
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DentIS 3.0</h3>
              <p className="text-gray-400 leading-relaxed">
                University of the Philippines Manila
                <br />
                College of Dentistry
                <br />
                Dental Information System
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => router.push("/login")}
                    className="text-gray-400 hover:text-white transition-colors hover:cursor-pointer"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-gray-400 hover:text-white transition-colors hover:cursor-pointer"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <span className="text-gray-400">Patient Portal (Coming Soon)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400 leading-relaxed">
                Pedro Gil St., Ermita
                <br />
                Manila, 1000 Metro Manila
                <br />
                Philippines
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2026 University of the Philippines Manila College of Dentistry. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
