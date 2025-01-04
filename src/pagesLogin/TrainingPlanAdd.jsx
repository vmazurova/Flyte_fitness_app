import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
import "react-toastify/dist/ReactToastify.css";

const TrainingPlanAdd = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goals: [],
    difficulty: "Začátečník",
    lenght: "Minut30",
    exercises: [],
    image: [],
  });
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

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
      const formDataToSubmit = new FormData();
      formDataToSubmit.append(
        "data",
        JSON.stringify({
          title: formData.title,
          description: formData.description,
          goals: formData.goals.join(";"),
          difficulty: formData.difficulty,
          lenght: formData.lenght,
          exercises: formData.exercises
            .map(
              (exercise) =>
                `${exercise.name}|${exercise.details}|${exercise.icon}|${exercise.sets}`
            )
            .join(";"),
          created_training_at: new Date().toISOString(),
        })
      );

      if (formData.images.length > 0) {
        formData.images.forEach((image) => {
          formDataToSubmit.append("files.image", image);
        });
      }

      console.log("Data k odeslání:", formDataToSubmit);

      const response = await fetch("http://localhost:1337/api/training-plans", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: formDataToSubmit,
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
    <div className="min-h-screen flex flex-row bg-cover bg-center relative">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-start py-12 px-6 relative bg-gradient-to-r from-purple-500 via-indigo-500 to-black">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <ToastContainer />

        <div className="relative w-full max-w-3xl flex justify-between mb-8">
          <Link
            to="/treninky"
            className="text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            ← Zpět na tréninkové plány
          </Link>
        </div>

        <div className="relative w-full max-w-lg bg-[#1A1A2E] text-white rounded-xl shadow-2xl p-6 pb-20 mb-12">
          <h2 className="text-center text-3xl font-bold mb-6">
            Přidat nový tréninkový plán
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Název plánu
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Popis</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cíle</label>
              {formData.goals.map((goal, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Cíl"
                    value={goal}
                    onChange={(e) => handleGoalChange(index, e.target.value)}
                    className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addGoal}
                className="mt-2 text-sm text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Přidat cíl
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Obtížnost
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                <option value="Začátečník">Začátečník</option>
                <option value="Pokročilý">Pokročilý</option>
                <option value="Obtížný">Obtížný</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Délka</label>
              <select
                name="lenght"
                value={formData.lenght}
                onChange={handleInputChange}
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                <option value="Minut15">15 minut</option>
                <option value="Minut30">30 minut</option>
                <option value="Minut45">45 minut</option>
                <option value="Minut60">60 minut</option>
                <option value="Minut90">90 minut</option>
                <option value="Minut120">120 minut</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Obrázky</label>
              <input
                type="file"
                name="images"
                onChange={handleFileChange}
                multiple
                className="w-full p-3 bg-transparent border border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <h2 className="block text-sm font-medium mb-2">Cviky</h2>
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
                className="mt-2 text-sm text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Přidat cvik
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 py-3 text-center text-white rounded-lg hover:bg-purple-700 focus:outline-none transition"
              disabled={loading}
            >
              {loading ? "Odesílání..." : "Přidat tréninkový plán"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrainingPlanAdd;
