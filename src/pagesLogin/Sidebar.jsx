import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { motion } from "framer-motion";

const Sidebar = ({ logoText = "Flyte" }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const routesData = [
    {
      name: "Otevřené kurzy",
      path: "/kurzy",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8h18M4 6h16m-7 12h1"
          />
        </svg>
      ),
    },
    {
      name: "Users",
      path: "/users",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"
          />
        </svg>
      ),
    },
    {
      name: "Tréninkové plány",
      path: "/treninkove-plany",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14m-7-7v14m5-5h4m-2-2v4"
          />
        </svg>
      ),
    },
    {
      name: "Jídelníčky",
      path: "/jidelnicky",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      name: "Osobní karta",
      path: "/osobni-karta",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4h16M4 20h16M9 10h6m-3 2v5"
          />
        </svg>
      ),
    },
    {
      name: "Kalendář",
      path: "/calendar",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4h16M4 20h16M9 10h6m-3 2v5"
          />
        </svg>
      ),
    },
  ];

  const createLinks = () =>
    routesData.map((route, key) => (
      <NavLink
        to={route.path}
        key={key}
        className={`flex flex-col items-center px-4 py-3 text-sm rounded-lg ${
          isOpen
            ? "justify-start text-gray-400 hover:bg-s2 hover:text-white"
            : "justify-center"
        }`}
        onClick={() => isMobile && setIsOpen(false)}
      >
        <div className="flex justify-center items-center h-10 w-10">
          {route.icon}
        </div>
        {isOpen && <span className="mt-2 text-center">{route.name}</span>}
      </NavLink>
    ));

  return (
    <motion.div
      className={clsx(
        "fixed top-0 left-0 h-full bg-s1 text-white shadow-lg z-50 flex flex-col",
        isOpen ? "w-64" : "w-16",
        "transition-all duration-300"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Hamburger Button */}
      <div className="flex items-center justify-between px-4 py-3 bg-s2">
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
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
      <nav className="flex-1 overflow-y-auto px-2">{createLinks()}</nav>
    </motion.div>
  );
};

export default Sidebar;
