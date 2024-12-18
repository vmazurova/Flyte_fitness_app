import React from "react";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";
import Sidebar from "./Sidebar.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MealPlanList() {
  const {
    loading,
    error,
    data = { data: [] },
  } = useFetch("http://localhost:1337/api/meal-plans?populate=*");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      <Sidebar />
      <div className="flex-1 py-12 px-6">
        {/* Slider */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-teal-500 drop-shadow-md">
            Tvoje jídelníčky
          </h1>
          <p className="text-sm lg:text-lg text-gray-300 mt-4">
            Vyberte si jídelníček, který odpovídá vašim potřebám a stylu.
          </p>
        </motion.div>
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="p-4"
              >
                <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group">
                  <img
                    src={imageUrl}
                    alt={title || "Jídelníček"}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white">
                      {title || "Neznámý jídelníček"}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {description || "Bez popisu"}
                    </p>
                    <p className="text-teal-400 text-xs">
                      Začátek týdne:{" "}
                      {weekStart
                        ? new Date(weekStart).toLocaleDateString("cs-CZ")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </Slider>

        {/* Co obsahují naše jídelníčky */}
        <div className="mt-16">
          <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8 text-gradient bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
            Co obsahují naše jídelníčky?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Vyvážené recepty",
              "Podrobné kalorické hodnoty",
              "Praktické tipy k přípravě",
              "Přehledný týdenní plán",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="flex items-center justify-center bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <p className="text-lg font-bold text-white text-center">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Náhled jídelníčku týdne */}
        <div className="mt-16 bg-gray-900 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8 text-gradient bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
            Náhled jídelníčku týdne
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Snídaně", content: "Ovesná kaše s ovocem" },
              { title: "Oběd", content: "Kuřecí steak s rýží" },
              { title: "Večeře", content: "Zeleninový salát s vejcem" },
            ].map((meal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-white">{meal.title}</h3>
                <p className="text-gray-400 mt-2">{meal.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
