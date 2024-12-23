import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import { motion } from "framer-motion";

const AddTrainingPlan = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goals: [],
    difficulty: "Začátečník",
    lenght: "Minut30",
    exercises: [],
  });
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const addExercise = () => {
    setFormData((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        { name: "", details: "", icon: "", sets: "" },
      ],
    }));
  };

  const addGoal = () => {
    setFormData((prev) => ({
      ...prev,
      goals: [...prev.goals, ""],
    }));
  };

  const handleExerciseChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedExercises = [...prev.exercises];
      updatedExercises[index][field] = value;
      return { ...prev, exercises: updatedExercises };
    });
  };

  const handleGoalChange = (index, value) => {
    setFormData((prev) => {
      const updatedGoals = [...prev.goals];
      updatedGoals[index] = value;
      return { ...prev, goals: updatedGoals };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Zajištění, že formData.goals je vždy string
      const goalsString =
        typeof formData.goals === "string"
          ? formData.goals
              .split(";")
              .map((goal) => goal.trim())
              .join(";")
          : "";

      // Převod cviků na řetězec oddělený středníkem
      const exercisesString = formData.exercises
        .map(
          (exercise) =>
            `${exercise.name}|${exercise.details}|${exercise.icon}|${exercise.sets}`
        )
        .join(";");

      // Připravte data k odeslání
      const dataToSubmit = {
        title: formData.title,
        description: formData.description,
        goals: goalsString,
        difficulty: formData.difficulty,
        lenght: formData.lenght,
        exercises: exercisesString,
        created_training_at: new Date().toISOString(),
      };

      console.log("Data k odeslání:", dataToSubmit);

      const response = await fetch("http://localhost:1337/api/training-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        alert("Tréninkový plán byl úspěšně vytvořen!");
      } else {
        const errorData = await response.json();
        console.error("Chyba při vytváření plánu:", errorData);
        alert(`Chyba: ${errorData.error.message}`);
      }
    } catch (error) {
      console.error("Chyba při odesílání dat:", error);
      alert("Nastala chyba při odesílání dat.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen">
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
            Přidání nového tréninkového plánu
          </h1>
          <p className="text-lg text-gray-300 mt-4">
            Vytvořte ideální tréninkový plán pro vaše klienty.
          </p>
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 rounded-lg bg-gray-800 shadow-md">
            <label className="block text-lg font-medium text-white">
              Název
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 bg-gray-900 text-white rounded-lg"
              required
            />
          </div>

          <div className="p-6 rounded-lg bg-gray-800 shadow-md">
            <label className="block text-lg font-medium text-white">
              Popis
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 bg-gray-900 text-white rounded-lg"
              rows="3"
            ></textarea>
          </div>

          <div className="p-6 rounded-lg bg-gray-800 shadow-md">
            <h2 className="text-lg font-medium text-white mb-4">Cíle</h2>
            {formData.goals.map((goal, index) => (
              <input
                key={index}
                type="text"
                placeholder="Cíl"
                value={goal}
                onChange={(e) => handleGoalChange(index, e.target.value)}
                className="w-full p-3 mb-2 bg-gray-900 text-white rounded-lg"
              />
            ))}
            <button
              type="button"
              onClick={addGoal}
              className="px-6 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-lg shadow-lg hover:shadow-xl transition mt-2"
            >
              Přidat cíl
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-gray-800 shadow-md">
              <label className="block text-lg font-medium text-white">
                Obtížnost
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-gray-900 text-white rounded-lg"
              >
                <option value="Začátečník">Začátečník</option>
                <option value="Pokročilý">Pokročilý</option>
                <option value="Obtížný">Obtížný</option>
              </select>
            </div>
            <div className="p-6 rounded-lg bg-gray-800 shadow-md">
              <label className="block text-lg font-medium text-white">
                Délka
              </label>
              <select
                name="lenght"
                value={formData.lenght}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-gray-900 text-white rounded-lg"
              >
                <option value="Minut15">15 minut</option>
                <option value="Minut30">30 minut</option>
                <option value="Minut45">45 minut</option>
                <option value="Minut60">60 minut</option>
                <option value="Minut90">90 minut</option>
                <option value="Minut120">120 minut</option>
              </select>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-gray-800 shadow-md">
            <h2 className="text-lg font-medium text-white mb-4">Cviky</h2>
            {formData.exercises.map((exercise, index) => (
              <div
                key={index}
                className="p-4 mb-4 bg-gray-900 rounded-lg shadow-lg"
              >
                <input
                  type="text"
                  placeholder="Název cviku"
                  value={exercise.name}
                  onChange={(e) =>
                    handleExerciseChange(index, "name", e.target.value)
                  }
                  className="w-full p-2 mb-2 bg-gray-800 text-white rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Detaily"
                  value={exercise.details}
                  onChange={(e) =>
                    handleExerciseChange(index, "details", e.target.value)
                  }
                  className="w-full p-2 mb-2 bg-gray-800 text-white rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Ikona (emoji)"
                  value={exercise.icon}
                  onChange={(e) =>
                    handleExerciseChange(index, "icon", e.target.value)
                  }
                  className="w-full p-2 mb-2 bg-gray-800 text-white rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Sety"
                  value={exercise.sets}
                  onChange={(e) =>
                    handleExerciseChange(index, "sets", e.target.value)
                  }
                  className="w-full p-2 bg-gray-800 text-white rounded-lg"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addExercise}
              className="px-6 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-lg shadow-lg hover:shadow-xl transition mt-2"
            >
              Přidat cvik
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition"
          >
            {loading ? "Odesílání..." : "Vytvořit tréninkový plán"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrainingPlan;
