import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlideDown } from "react-slidedown";
import clsx from "clsx";
import "react-slidedown/lib/slidedown.css";
import useFetch from "../hooks/useFetch";
import Sidebar from "./Sidebar.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default function MealPlanList() {
  // Stavy
  const [weight, setWeight] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [activeId, setActiveId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Fetchování dat o jídelníčcích
  const {
    loading,
    error,
    data = { data: [] },
  } = useFetch("http://localhost:1337/api/meal-plans?populate=*");

  // Načtení detailů uživatele
  const fetchUserDetails = async () => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.warn("JWT token nebyl nalezen.");
      return null;
    }

    try {
      const response = await fetch("http://localhost:1337/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(
          "Chyba při získávání detailů uživatele:",
          response.statusText
        );
        return null;
      }

      const user = await response.json();
      console.log("Načtený uživatel:", user);
      return user;
    } catch (error) {
      console.error("Chyba při volání API:", error);
      return null;
    }
  };

  useEffect(() => {
    const getUserRole = async () => {
      const user = await fetchUserDetails();
      if (user && user.role) {
        setUserRole(user.role.name); // Nastavení role
      } else {
        console.warn("Role není dostupná.");
        setUserRole(null);
      }
    };

    getUserRole();
  }, []);

  // Výpočet makroživin
  const calculateMacros = (weight) => {
    return {
      proteins: (weight * 1.6).toFixed(1),
      carbs: (weight * 4).toFixed(1),
      fats: (weight * 0.8).toFixed(1),
      sugars: (weight * 1).toFixed(1),
    };
  };

  const macros = calculateMacros(weight);

  // Slider nastavení
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading)
    return <p className="text-white text-center mt-20 text-xl">Načítání...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-20 text-xl">
        Chyba: {error.message}
      </p>
    );

  const mealPlans = Array.isArray(data.data) ? data.data : [];

  return (
    <div
      className={`min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col font-sans transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-16"}`}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 py-12 px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <p className="text-center text-gray-400">
            Přihlášen jako: {userRole || "Nepřihlášený uživatel"}
          </p>

          <h1 className="text-4xl lg:text-6xl font-bold text-white">
            Tvoje jídelníčky
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 mt-2">
            Vyber si ideální plán pro tvé zdraví.
          </p>
        </motion.div>
        {/* Tlačítko Přidat jídelníček */}
        {userRole === "Trainer" && (
          <div className="mb-6 text-center">
            <Link to="/jidelnicek-pridani">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                Přidat jídelníček
              </motion.button>
            </Link>
          </div>
        )}
        {/* Slider */}
        <div className="w-full">
          <Slider {...settings} className="w-full">
            {mealPlans.map((mealPlan, index) => {
              const {
                id,
                title,
                description,
                image,
                week_start: weekStart,
                documentId,
              } = mealPlan;

              const imageUrl = image?.url
                ? `http://localhost:1337${image.url}`
                : "https://via.placeholder.com/400x200";

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="p-4"
                >
                  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={imageUrl}
                      alt={title || "Jídelníček"}
                      className="w-full h-80 object-cover"
                    />
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {title || "Neznámý jídelníček"}
                      </h3>
                      <p className="text-gray-400 mt-2 text-sm">
                        {description || "Bez popisu"}
                      </p>
                      <p className="text-gray-500 mt-1 text-xs">
                        Začátek týdne:{" "}
                        {weekStart
                          ? new Date(weekStart).toLocaleDateString("cs-CZ")
                          : "N/A"}
                      </p>
                      <div className="mt-4">
                        <Link to={`/jidelnicek/${documentId}`}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full shadow-md hover:shadow-lg transition duration-300"
                          >
                            Detail jídelníčku
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
