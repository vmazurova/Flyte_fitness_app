import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";
import Sidebar from "./Sidebar.jsx";
import { Link } from "react-router-dom";

export default function TrainingPlanList() {
  const {
    loading,
    error,
    data = { data: [] },
  } = useFetch("http://localhost:1337/api/training-plans?populate=*");

  const [userRole, setUserRole] = useState(null); // Stav pro roli uživatele

  // Fetchování role uživatele
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
        console.error("Chyba při načítání role uživatele:", error);
      }
    };
    fetchUserRole();
  }, []);

  if (loading)
    return <p className="text-white text-center mt-20 text-xl">Načítání...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-20 text-xl">
        Chyba: {error.message}
      </p>
    );

  const trainingPlans = Array.isArray(data.data) ? data.data : [];

  const formatLenght = (lenght) => {
    if (!lenght) return "N/A";
    const numberPart = lenght.replace(/\D+/g, ""); // Odebere nečíselné znaky
    return `${numberPart} minut`;
  };

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
            Tréninkové plány
          </h1>
          <p className="text-sm lg:text-lg text-gray-300 mt-4">
            Vyberte si plán, který vám pomůže dosáhnout vašich fitness cílů.
          </p>
        </motion.div>

        {/* Button for Trainers */}
        {userRole === "Trainer" && (
          <div className="text-center mb-8">
            <Link to="/trenink-pridani">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl transition"
              >
                Přidat tréninkový plán
              </motion.button>
            </Link>
          </div>
        )}

        <div className="relative border-l border-gray-700">
          {trainingPlans.length > 0 ? (
            trainingPlans.map((plan, index) => {
              const {
                id,
                title,
                description,
                image,
                difficulty,
                lenght,
                goals,
                documentId,
              } = plan;

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="mb-12 pl-6 relative"
                >
                  <div className="absolute -left-3 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-teal-500 shadow-lg"></div>
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[700px] mx-auto">
                    <h3 className="text-2xl font-semibold text-white">
                      {title || "Bez názvu"}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">
                      {description || "Bez popisu"}
                    </p>
                    <br />
                    <div className="flex items-center mt-4 space-x-4">
                      <img
                        src={
                          image?.url
                            ? `http://localhost:1337${image.url}`
                            : "https://via.placeholder.com/400x200"
                        }
                        alt={title || "Tréninkový plán"}
                        className="w-32 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-white text-sm">
                          Obtížnost: {difficulty || "Nedefinováno"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Délka: {formatLenght(lenght)}
                        </p>
                        <p className="text-gray-500 text-sm">Cíl: {goals}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Link to={`/trenink/${documentId}`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl transition"
                        >
                          Zobrazit detaily
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="text-center text-white text-xl">
              Žádné tréninkové plány nenalezeny.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
