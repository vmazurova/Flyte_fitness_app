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
  const [formData, setFormData] = useState({
    title: "",
    week_start: "",
    image: null,
    meals: {
      monday: {
        breakfast: [],
        morning_snack: [],
        lunch: [],
        afternoon_snack: [],
        dinner: [],
      },
      tuesday: {
        breakfast: [],
        morning_snack: [],
        lunch: [],
        afternoon_snack: [],
        dinner: [],
      },
      wednesday: {
        breakfast: [],
        morning_snack: [],
        lunch: [],
        afternoon_snack: [],
        dinner: [],
      },
      thursday: {
        breakfast: [],
        morning_snack: [],
        lunch: [],
        afternoon_snack: [],
        dinner: [],
      },
      friday: {
        breakfast: [],
        morning_snack: [],
        lunch: [],
        afternoon_snack: [],
        dinner: [],
      },
      saturday: {
        breakfast: [],
        morning_snack: [],
        lunch: [],
        afternoon_snack: [],
        dinner: [],
      },
      sunday: {
        breakfast: [],
        morning_snack: [],
        lunch: [],
        afternoon_snack: [],
        dinner: [],
      },
    },
  });

  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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

  const handleDragEnter = () => setDragActive(true);
  const handleDragLeave = () => setDragActive(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    toast.success("Obrázek byl přidán.");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    toast.success("Obrázek byl přidán.");
  };

  const renderDaySection = (day, index) => (
    <div
      className={`p-4 rounded-lg mb-6 ${
        index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
      }`}
      key={day}
    >
      <h3 className="text-xl font-bold mb-4 text-white">{daysMap[day]}</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.keys(mealTypesMap).map((mealType) => (
          <div
            key={mealType}
            className="p-2 bg-gray-900 border border-purple-500 rounded-lg"
          >
            <label className="block text-sm font-medium mb-2 text-white">
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
                  className="w-full p-2 mb-2 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
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
                  <option value="custom">Vlastní</option>
                </select>
                {meal.weight === "custom" && (
                  <input
                    type="number"
                    placeholder="Zadejte vlastní gramáž"
                    className="w-full p-2 bg-transparent border border-gray-500 rounded-lg"
                    onChange={(e) =>
                      handleMealChange(e, day, mealType, i, "weight")
                    }
                  />
                )}
                <select
                  className="w-full p-2 bg-gray-800 text-white rounded-lg"
                  value={meal.side || ""}
                  onChange={(e) =>
                    handleMealChange(e, day, mealType, i, "side")
                  }
                >
                  <option value="" disabled>
                    Vyberte přílohu
                  </option>
                  {sides.map((side) => (
                    <option key={side} value={side}>
                      {side}
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serializedMeals = {};
      Object.keys(formData.meals).forEach((day) => {
        Object.keys(formData.meals[day]).forEach((mealType) => {
          const keyMap = {
            morning_snack: "morning_snack",
            afternoon_snack: "afternoon_snack",
          };
          const mappedMealType = keyMap[mealType] || mealType;
          serializedMeals[`${day}_${mappedMealType}`] = formData.meals[day][
            mealType
          ]
            .map(
              (meal) =>
                `${meal.weight || "0g"} ${meal.food || ""} ${meal.side || ""}`
            )
            .join(", ");
        });
      });

      const payload = {
        data: {
          title: formData.title,
          week_start: formData.week_start,
          ...serializedMeals,
        },
      };

      await axios.post("http://localhost:1337/api/meal-plans", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Jídelníček byl úspěšně uložen!");
    } catch (error) {
      toast.error("Chyba při ukládání jídelníčku.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center bg-gray-900 min-h-screen"
      style={{
        background: "linear-gradient(135deg, #4a148c, #12005e)",
      }}
    >
      <Sidebar />

      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-5xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-teal-500 drop-shadow-md">
            Přidání nového jídelníčku
          </h1>
          <p className="text-sm lg:text-lg text-gray-300 mt-4">
            Přidej jídelníček pro tvého klienta zde a jednoduše!
          </p>
        </motion.div>
        <ToastContainer />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Název jídelníčku
            </label>
            <input
              type="text"
              className="w-full p-3 bg-transparent border border-gray-500 rounded-lg"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Začátek týdne
            </label>
            <input
              type="date"
              className="w-full p-3 bg-transparent border border-gray-500 rounded-lg"
              value={formData.week_start}
              onChange={(e) =>
                setFormData({ ...formData, week_start: e.target.value })
              }
            />
          </div>
          {[
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ].map((day, index) => renderDaySection(day, index))}
          <button
            type="submit"
            className="w-full bg-purple-600 py-3 text-center  hover:bg-purple-700  bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            Uložit jídelníček
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealPlanAdd;
