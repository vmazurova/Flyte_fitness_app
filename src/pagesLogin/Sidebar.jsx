import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
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
  FaPlus,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const history = useHistory();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSettingsClick = () => {
    history.push("/nastaveni");
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("jwt");
    history.push("/auth/prihlaseni");
    window.location.reload();
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) return;
      try {
        const response = await fetch("http://localhost:1337/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = await response.json();
        setUserRole(user.role?.name || null);
      } catch (error) {
        console.error("chyba v roli", error);
      }
    };
    fetchUserRole();
  }, []);

  const routesData = [
    { name: "Otevřené kurzy", path: "/kurzy", icon: <FaBookOpen /> },
    { name: "Tréninkové plány", path: "/treninky", icon: <FaDumbbell /> },
    { name: "Jídelníčky", path: "/jidelnicky", icon: <FaUtensils /> },
    { name: "Osobní karta", path: "/osobni-slozka", icon: <FaIdCard /> },
    { name: "Kalendář", path: "/kalendar", icon: <FaCalendarAlt /> },
  ];

  return (
    <>
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
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900 border-b border-gray-800">
          {isOpen && <h1 className="text-lg font-bold">Menu</h1>}
        </div>

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
        <div className="flex flex-col items-center gap-2 px-2 py-4 border-t border-gray-800">
          {userRole === "Trainer" && (
            <div className="w-full">
              <button
                onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
                className="flex items-center w-full gap-4 px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
              >
                <FaPlus className="text-xl" />
                {isOpen && <span>Vytvořit</span>}
              </button>
              {isCreateMenuOpen && (
                <div className="mt-2 space-y-2">
                  <button
                    onClick={() => history.push("/vytvorit-kurz")}
                    className="w-full px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    Vytvořit kurz
                  </button>
                  <button
                    onClick={() => history.push("/vytvorit-trenink")}
                    className="w-full px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    Vytvořit trénink
                  </button>
                  <button
                    onClick={() => history.push("/vytvorit-jidelnicek")}
                    className="w-full px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    Vytvořit jídelníček
                  </button>
                  {userRole === "trener" && (
                    <div className="w-full">
                      <button
                        onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
                        className="flex items-center w-full gap-4 px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
                      >
                        <FaPlus className="text-xl" />
                        {isOpen && <span>Vytvořit</span>}
                      </button>
                      {isCreateMenuOpen && (
                        <div className="mt-2 space-y-2">
                          <button
                            onClick={() => history.push("/vytvorit-kurz")}
                            className="w-full px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
                          >
                            Vytvořit kurz
                          </button>
                          <button
                            onClick={() => history.push("/vytvorit-trenink")}
                            className="w-full px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
                          >
                            Vytvořit trénink
                          </button>
                          <button
                            onClick={() => history.push("/vytvorit-jidelnicek")}
                            className="w-full px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
                          >
                            Vytvořit jídelníček
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleSettingsClick}
            className="flex items-center w-full gap-4 px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
          >
            <FaCog className="text-xl" />
            {isOpen && <span>Nastavení</span>}
          </button>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center w-full gap-4 px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
          >
            <FaSignOutAlt className="text-xl" />
            {isOpen && <span>Odhlásit se</span>}
          </button>
        </div>
      </motion.aside>

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-6 text-center">
              Opravdu se chcete odhlásit?
            </h2>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-lg rounded-lg"
              >
                Zrušit
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-lg rounded-lg"
              >
                Odhlásit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
