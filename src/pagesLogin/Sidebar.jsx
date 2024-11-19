import React from "react";
import { FaHome, FaSearch, FaClock, FaDownload } from "react-icons/fa";
import { CgGym } from "react-icons/cg";

export default function Sidebar() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-64 bg-white rounded-xl shadow-lg p-4">
        {/* Logo Section */}
        <div className="flex items-center gap-4 p-4 mb-6">
          <img src="/images/flyte_cerne.png" alt="brand" className="w-16" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {/* Dashboard Link */}
          <button
            type="button"
            className="flex items-center p-3 font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <FaHome className="w-5 h-5 mr-4 text-gray-700" />
            Dashboard
          </button>

          {/* Analytics Link */}
          <button
            type="button"
            className="flex items-center p-3 font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <FaSearch className="w-5 h-5 mr-4 text-gray-700" />
            Analytics
          </button>

          {/* Reporting Link */}
          <button
            type="button"
            className="flex items-center p-3 font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <FaClock className="w-5 h-5 mr-4 text-gray-700" />
            Reporting
          </button>

          {/* Projects Link */}
          <button
            type="button"
            className="flex items-center p-3 font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <CgGym className="w-5 h-5 mr-4 text-gray-700" />
            Projects
          </button>

          {/* Orders Link */}
          <button
            type="button"
            className="flex items-center p-3 font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <FaDownload className="w-5 h-5 mr-4 text-gray-700" />
            Orders
          </button>
        </nav>
      </div>
    </div>
  );
}
