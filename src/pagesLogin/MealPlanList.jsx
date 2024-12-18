import React, { useState } from "react";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";
import Sidebar from "./Sidebar.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default function MealPlanList() {
  const {
    loading,
    error,
    data = { data: [] },
  } = useFetch("http://localhost:1337/api/meal-plans?populate=*");

  const [weight, setWeight] = useState(0);

  // Výpočet makroživin na základě hmotnosti
  const calculateMacros = (weight) => {
    return {
      proteins: (weight * 1.6).toFixed(1), // 1.6g bílkovin na kg
      carbs: (weight * 4).toFixed(1), // 4g sacharidů na kg
      fats: (weight * 0.8).toFixed(1), // 0.8g tuků na kg
      sugars: (weight * 1).toFixed(1), // 1g cukrů na kg
    };
  };

  const macros = calculateMacros(weight);

  if (loading)
    return <p className="text-white text-center mt-20 text-xl">Načítání...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-20 text-xl">
        Chyba: {error.message}
      </p>
    );

  const mealPlans = Array.isArray(data.data) ? data.data : [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      <Sidebar />
      <div className="flex-1 py-12 px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-white">
            Tvoje jídelníčky
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 mt-2">
            Vyber si ideální plán pro tvé zdraví.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="max-w-screen-lg mx-auto">
          <Slider {...settings}>
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
                      className="w-full h-64 object-cover"
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
                        <Link to={`/meal-plan/${documentId}`}>
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

        {/* Makroživiny */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-white mb-6">
            Spočítejte si makroživiny
          </h2>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Zadejte svou hmotnost (kg)"
            className="p-3 w-72 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 max-w-screen-lg mx-auto">
            {[
              { label: "Bílkoviny", value: macros.proteins, unit: "g" },
              { label: "Sacharidy", value: macros.carbs, unit: "g" },
              { label: "Tuky", value: macros.fats, unit: "g" },
              { label: "Cukry", value: macros.sugars, unit: "g" },
            ].map((macro, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:bg-gray-700 transition duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-300">
                  {macro.label}
                </h3>
                <p className="text-4xl font-bold text-green-400 mt-2">
                  {macro.value} {macro.unit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
