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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSubmit = new FormData();

      formDataToSubmit.append("title", formData.title);
      formDataToSubmit.append("week_start", formData.week_start);

      if (formData.image) {
        formDataToSubmit.append("files.image", formData.image);
      }

      Object.keys(daysMap).forEach((day) => {
        Object.keys(mealTypesMap).forEach((mealType) => {
          const mealKey = `${day}_${mealType}`;
          const mealsForType = formData.meals[day][mealType]
            .map(
              (meal) =>
                `${meal.food || ""}|${meal.weight || ""}|${meal.side || ""}`
            )
            .join(";");
          formDataToSubmit.append(mealKey, mealsForType); // Přidání jídel do formátu
        });
      });

      console.log("FormData entries:", Array.from(formDataToSubmit.entries()));

      const response = await axios.post(
        "http://localhost:1337/api/meal-plans",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Jídelníček byl úspěšně přidán!");
        console.log("Úspěšná odpověď:", response.data);
      } else {
        toast.error("Při přidávání došlo k chybě.");
        console.error("Chyba odpovědi:", response.data);
      }
    } catch (error) {
      console.error("Chyba odeslání:", error);
      toast.error("Nepodařilo se přidat jídelníček.");
    } finally {
      setLoading(false);
    }
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
                    Gramy
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
              className="w-full px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
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
          <div className="max-w-3xl mx-auto">
            <h1 className="mt-10 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Přidání nového jídelníčku
            </h1>
            <p className="text-lg text-white mt-4 p-5">
              Vytvořte jídelníček pro své klienty pomocí tohoto formuláře.
              <br />
              Vyplňte název jídelníčku, vyberte den a přidejte jídla pro
              jednotlivé části dne. <br />
              Každé jídlo může mít zadanou gramáž a přílohu.
            </p>
          </div>
        </motion.div>

        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg font-medium text-white mb-2">
              Název jídelníčku
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full p-3 bg-gray-900 text-white rounded-lg"
            />
          </div>
          {/* Nahrání obrázku */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-white mb-2">
              Obrázek jídelníčku
            </label>
            <input
              type="file"
              name="image"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
              }
              className="w-full p-3 bg-gray-900 text-white rounded-lg"
              accept="image/*"
            />
          </div>
          {/* Sekce dní */}
          {Object.keys(daysMap).map((day, index) =>
            renderDaySection(day, index)
          )}
          {/* Submit tlačítko */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Vytvořit jídelníček
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MealPlanAdd;
