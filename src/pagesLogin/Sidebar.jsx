import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaDumbbell,
  FaUtensils,
  FaIdCard,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const routesData = [
    { name: "Otevřené kurzy", path: "/kurzy", icon: <FaBookOpen /> },
    { name: "Tréninkové plány", path: "/treninky", icon: <FaDumbbell /> },
    { name: "Jídelníčky", path: "/jidelnicky", icon: <FaUtensils /> },
    { name: "Osobní karta", path: "/osobni-slozka", icon: <FaIdCard /> },
    { name: "Kalendář", path: "/kalendar", icon: <FaCalendarAlt /> },
  ];

  return (
    <motion.div
      className={clsx(
        "fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white shadow-xl z-50 flex flex-col",
        isOpen ? "w-72" : "w-20",
        "transition-all duration-300"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Close Button */}
      <div className="flex items-center justify-center px-4 py-5 bg-gray-800 border-b border-gray-700">
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3">
        {routesData.map((route, key) => (
          <NavLink
            to={route.path}
            key={key}
            className="flex items-center px-4 py-3 text-base rounded-lg hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-500 group transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-center w-10 h-10 text-xl text-gray-300 group-hover:text-white">
              {route.icon}
            </div>
            {isOpen && (
              <span className="ml-4 text-gray-300 group-hover:text-white">
                {route.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Buttons */}
      <div className="flex flex-col items-center py-5 border-t border-gray-600">
        <button className="flex items-center justify-center w-full py-4 px-6 text-base text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-500 hover:text-white transition-all duration-300 shadow-lg">
          <FaCog className="w-6 h-6 mr-3" />
          {isOpen && "Nastavení"}
        </button>
        <button className="flex items-center justify-center w-full py-4 px-6 text-base text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-500 hover:text-white transition-all duration-300 shadow-lg">
          <FaSignOutAlt className="w-6 h-6 mr-3" />
          {isOpen && "Odhlásit se"}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
