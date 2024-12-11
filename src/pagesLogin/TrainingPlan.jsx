import React from "react";
import { motion } from "framer-motion";

const TrainingSession = () => {
  const sessionDetails = {
    title: "Total burn",
    subtitle: "Upper Body & Core",
    duration: "51 min",
    level: "Intermediário",
    equipment: ["Cadeira", "Elásticos"],
    description:
      "Este plano treino apresenta uma lista de reprodução completa celebrando todos os insulares do Pacífico e da América do sul e do pacífico central.",
    breakdown: ["Exercicios entre 10 e 20 min", "7x Comandos", "4x Burpees"],
  };

  const exercises = [
    {
      name: "Lower body",
      time: "01:00",
      reps: null,
      icon: "🦵",
    },
    {
      name: "Push ups",
      time: "00:30",
      reps: null,
      icon: "🤸",
    },
    {
      name: "Descanso",
      time: "01:45",
      reps: null,
      icon: "⏳",
    },
    {
      name: "Pull ups",
      time: null,
      reps: "10 Reps",
      icon: "🏋️",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white flex flex-col items-center py-8 px-4">
      {/* Back Button */}
      <button className="absolute top-4 left-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition">
        ←
      </button>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-6 max-w-7xl w-full">
        {/* Video and Thumbnail */}
        <div className="lg:w-3/5 w-full rounded-xl overflow-hidden shadow-lg bg-gray-900 relative">
          <img
            src="https://source.unsplash.com/800x450/?fitness,workout"
            alt="Workout"
            className="w-full h-64 lg:h-96 object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-gray-800 p-2 px-4 rounded-full flex items-center shadow-md">
            <span className="text-xl">{exercises[0].icon}</span>
            <span className="ml-2">{exercises[0].name}</span>
          </div>
        </div>

        {/* Details */}
        <div className="lg:w-2/5 w-full bg-gray-900 rounded-xl p-6 shadow-lg">
          <div className="text-gray-400 flex justify-between items-center mb-4">
            <span>{sessionDetails.duration}</span>
            <span>🟢 {sessionDetails.level}</span>
          </div>
          <h1 className="text-3xl font-bold">{sessionDetails.title}</h1>
          <h2 className="text-xl font-semibold text-gray-300">
            {sessionDetails.subtitle}
          </h2>
          <p className="text-sm text-gray-400 mt-4">
            {sessionDetails.description}
          </p>
          <h3 className="text-lg font-semibold mt-6">Breakdown do treino</h3>
          <ul className="list-disc list-inside text-gray-400">
            {sessionDetails.breakdown.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Exercise List */}
      <div className="mt-8 w-full max-w-7xl">
        <div className="bg-gray-900 rounded-xl shadow-lg p-4 flex flex-col space-y-4">
          {exercises.map((exercise, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-700 flex items-center justify-center rounded-full text-2xl">
                  {exercise.icon}
                </div>
                <span>{exercise.name}</span>
              </div>
              <div>
                {exercise.time && <span className="mr-4">{exercise.time}</span>}
                {exercise.reps && <span>{exercise.reps}</span>}
              </div>
            </div>
          ))}
          <button className="bg-green-500 text-white text-lg font-bold py-2 rounded-lg hover:bg-green-600 transition">
            Começar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingSession;
