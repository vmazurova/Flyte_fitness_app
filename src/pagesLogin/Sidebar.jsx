import React, { useState } from "react";
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

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const routesData = [
    { name: "Otevřené kurzy", path: "/kurzy", icon: <FaBookOpen /> },
    { name: "Tréninkové plány", path: "/treninky", icon: <FaDumbbell /> },
    { name: "Jídelníčky", path: "/jidelnicky", icon: <FaUtensils /> },
    { name: "Osobní karta", path: "/osobni-slozka", icon: <FaIdCard /> },
    { name: "Kalendář", path: "/kalendar", icon: <FaCalendarAlt /> },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-full shadow-lg focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <motion.aside
        className={clsx(
          "fixed top-0 left-0 h-full bg-black text-white shadow-xl z-40 flex flex-col",
          isOpen ? "w-72" : "w-16",
          "transition-all duration-300 ease-in-out"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900 border-b border-gray-800">
          {isOpen && <h1 className="text-lg font-bold">Menu</h1>}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 mt-4 space-y-2 overflow-y-auto px-2">
          {routesData.map((route, index) => (
            <NavLink
              key={index}
              to={route.path}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )
              }
            >
              <div className="flex items-center justify-center w-8 h-8 text-xl">
                {route.icon}
              </div>
              {isOpen && <span>{route.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer Buttons */}
        <div className="flex flex-col items-center gap-2 px-2 py-4 border-t border-gray-800">
          <button className="flex items-center w-full gap-4 px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors">
            <FaCog className="text-xl" />
            {isOpen && <span>Nastavení</span>}
          </button>
          <button className="flex items-center w-full gap-4 px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors">
            <FaSignOutAlt className="text-xl" />
            {isOpen && <span>Odhlásit se</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
