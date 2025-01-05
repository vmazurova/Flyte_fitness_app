import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch.js";
import Sidebar from "./Sidebar.jsx";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setError("Uživatel není přihlášen.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:1337/api/users?populate=role",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(`Chyba API: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Chyba při načítání uživatelů:", error);
        setError("Nepodařilo se načíst uživatele.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Načítání role přihlášeného uživatele
  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:1337/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Chyba při načítání role uživatele.");
        }

        const user = await response.json();
        setUserRole(user.role?.name || null);
      } catch (error) {
        console.error("Chyba při načítání role uživatele:", error);
      }
    };

    fetchUserRole();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const token = localStorage.getItem("jwt");

    try {
      const response = await fetch(
        `http://localhost:1337/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: newRole,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(`Chyba API: ${response.statusText}`);
      }

      alert("Role uživatele byla úspěšně změněna.");
      window.location.reload();
    } catch (error) {
      console.error("Chyba při změně role uživatele:", error);
      alert("Něco se pokazilo. Zkuste to znovu.");
    }
  };

  if (loading)
    return <p className="text-white text-center mt-20 text-xl">Načítání...</p>;
  if (error)
    return <p className="text-red-500 text-center mt-20 text-xl">{error}</p>;

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex justify-center">
      <Sidebar />
      <div className="w-full max-w-4xl py-12 px-6 flex flex-col items-center overflow-y-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 drop-shadow-md">
            Správa uživatelů
          </h1>
          <p className="text-sm lg:text-lg text-gray-300 mt-4">
            Změň role uživatelů v systému.
          </p>
        </motion.div>

        {userRole === "MainTrainer" ? (
          <div className="relative border-l border-gray-700">
            {users.length > 0 ? (
              users.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="mb-12 pl-6 relative"
                >
                  <div className="absolute -left-3 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-teal-500 shadow-lg"></div>
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[700px] mx-auto">
                    <h3 className="text-2xl font-semibold text-white">
                      {user.username}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">
                      Email: {user.email}
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Současná role: {user.role?.name || "N/A"}
                    </p>
                    <div className="mt-4 flex space-x-4">
                      <button
                        onClick={() => handleRoleChange(user.id, "Trainer")}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition"
                      >
                        Nastavit jako Trainer
                      </button>
                      <button
                        onClick={() =>
                          handleRoleChange(user.id, "Authenticated")
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
                      >
                        Nastavit jako Authenticated
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-white text-xl">
                Žádní uživatelé nebyli nalezeni.
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-xl">
            K této stránce nemáte přístup.
          </p>
        )}
      </div>
    </div>
  );
}
