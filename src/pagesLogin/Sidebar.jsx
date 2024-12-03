import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaBookOpen,
  FaUtensils,
  FaDumbbell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="lg:hidden flex items-center bg-black px-4 py-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          <FaBars />
        </button>
        <img
          src="/images/flyte_bile_pop.webp"
          alt="Logo"
          className="h-8 ml-4"
        />
      </div>

      <div
        className={`lg:flex flex-col h-full w-64 fixed inset-y-0 left-0 bg-gradient-to-b from-black via-gray-900 to-black text-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300`}
      >
        <div className="flex flex-col justify-center flex-1 space-y-8 px-4">
          <div className="flex items-center space-x-4 mt-8">
            <img
              src="/images/flyte_bile_pop.webp"
              alt="Logo"
              className="h-12"
            />
          </div>

          <Link
            to="/kurzy"
            className="flex items-center space-x-4 hover:bg-gray-800 px-4 py-3 rounded-lg transition"
          >
            <FaBookOpen className="text-white text-xl" />
            <span className="font-medium text-sm">Kurzy</span>
          </Link>

          <Link
            to="/jidelnicky"
            className="flex items-center space-x-4 hover:bg-gray-800 px-4 py-3 rounded-lg transition"
          >
            <FaUtensils className="text-white text-xl" />
            <span className="font-medium text-sm">Jídelníčky</span>
          </Link>

          <Link
            to="/treninkove-plany"
            className="flex items-center space-x-4 hover:bg-gray-800 px-4 py-3 rounded-lg transition"
          >
            <FaDumbbell className="text-white text-xl" />
            <span className="font-medium text-sm">Tréninkové plány</span>
          </Link>

          <Link
            to="/osobni-slozka"
            className="flex items-center space-x-4 hover:bg-gray-800 px-4 py-3 rounded-lg transition"
          >
            <FaUserCircle className="text-white text-xl" />
            <span className="font-medium text-sm">Osobní složka</span>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col mb-8 px-4 space-y-4">
          <Link
            to="/nastaveni"
            className="flex items-center space-x-4 hover:bg-gray-800 px-4 py-3 rounded-lg transition"
          >
            <FaCog className="text-white text-xl" />
            <span className="font-medium text-sm">Nastavení</span>
          </Link>

          <Link
            to="/odhlasit"
            className="flex items-center space-x-4 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition"
          >
            <FaSignOutAlt className="text-white text-xl" />
            <span className="font-medium text-sm">Odhlásit se</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
