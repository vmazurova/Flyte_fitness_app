import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar.jsx";
import { motion } from "framer-motion";

const sides = ["Rýže", "Brambory", "Těstoviny", "Kuskus", "Quinoa"];
const predefinedWeights = [50, 100, 150, 200, 250];

const daysMap = {
  monday: "Pondělí",
  tuesday: "Úterý",
  wednesday: "Středa",
  thursday: "Čtvrtek",
  friday: "Pátek",
  saturday: "Sobota",
  sunday: "Neděle",
};

const mealTypesMap = {
  breakfast: "Snídaně",
  morning_snack: "Dopolední svačina",
  lunch: "Oběd",
  afternoon_snack: "Odpolední svačina",
  dinner: "Večeře",
};

const MealPlanAdd = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    week_start: "",
    image: null,
    meals: Object.keys(daysMap).reduce(
      (acc, day) => ({
        ...acc,
        [day]: Object.keys(mealTypesMap).reduce(
          (acc2, mealType) => ({
            ...acc2,
            [mealType]: [],
          }),
          {}
        ),
      }),
      {}
    ),
  });

  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const addMeal = (day, mealType) => {
    setFormData((prev) => ({
      ...prev,
      meals: {
        ...prev.meals,
        [day]: {
          ...prev.meals[day],
          [mealType]: [
            ...prev.meals[day][mealType],
            { food: "", weight: "", side: "" },
          ],
        },
      },
    }));
  };

  const handleMealChange = (e, day, mealType, index, field) => {
    const value = e.target.value;
    setFormData((prev) => {
      const updatedMeals = [...prev.meals[day][mealType]];
      updatedMeals[index][field] = value;
      return {
        ...prev,
        meals: {
          ...prev.meals,
          [day]: {
            ...prev.meals[day],
            [mealType]: updatedMeals,
          },
        },
      };
    });
  };

  const renderDaySection = (day, index) => (
    <div
      className={`p-6 rounded-lg mb-8 ${
        index % 2 === 0
          ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900"
          : "bg-gradient-to-r from-gray-700 to-gray-800"
      }`}
      key={day}
    >
      <h3 className="text-2xl font-bold text-white mb-4">{daysMap[day]}</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {Object.keys(mealTypesMap).map((mealType) => (
          <div
            key={mealType}
            className="p-4 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <label className="block text-lg font-semibold text-white mb-2">
              {mealTypesMap[mealType]}
            </label>
            {formData.meals[day][mealType].map((meal, i) => (
              <div key={i} className="mb-4">
                <input
                  type="text"
                  placeholder="Zadejte jídlo"
                  value={meal.food}
                  onChange={(e) =>
                    handleMealChange(e, day, mealType, i, "food")
                  }
                  className="w-full p-2 mb-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
                />
                <select
                  className="w-full p-2 mb-2 bg-gray-800 text-white rounded-lg"
                  value={meal.weight || ""}
                  onChange={(e) =>
                    handleMealChange(e, day, mealType, i, "weight")
                  }
                >
                  <option value="" disabled>
                    Vyberte gramáž
                  </option>
                  {predefinedWeights.map((weight) => (
                    <option key={weight} value={weight}>
                      {weight} g
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addMeal(day, mealType)}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Přidat další
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex bg-gradient-to-br from-gray-900 to-black min-h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "ml-72" : "ml-20"
        } p-6`}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-teal-500">
            Přidání nového jídelníčku
          </h1>
          <p className="text-lg text-gray-300 mt-4">
            Naplánujte ideální jídelníček pro vaše klienty.
          </p>
        </motion.div>
        <ToastContainer />
        <form>
          <div className="mb-6">
            <label className="block text-lg font-medium text-white mb-2">
              Název jídelníčku
            </label>
            <input
              type="text"
              className="w-full p-3 bg-gray-900 text-white rounded-lg"
            />
          </div>
          {Object.keys(daysMap).map((day, index) =>
            renderDaySection(day, index)
          )}
        </form>
      </div>
    </div>
  );
};

export default MealPlanAdd;
