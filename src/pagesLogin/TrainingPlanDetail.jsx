import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";

const TrainingPlanDetail = () => {
  const { id: documentId } = useParams();
  const { loading, error, data } = useFetch(
    `http://localhost:1337/api/training-plans?filters[documentId][$eq]=${documentId}&populate=*`
  );

  const trainingPlan = data?.data?.[0];

  const parseExercises = (exerciseString) => {
    return exerciseString.split(";").map((exercise) => {
      const parts = exercise.split("|").map((part) => part.trim());
      return {
        name: parts[0] || "no name",
        details: parts[1] || null,
        icon: parts[2] || "❓",
        sets: parts[3] || null,
      };
    });
  };

  const formatLength = (length) => {
    if (!length) return "Neznámá délka";
    return length.replace("Minut", "") + " minut";
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Začátečník":
        return "bg-green-500";
      case "Pokročilý":
        return "bg-orange-500";
      default:
        return "bg-red-500";
    }
  };

  const exercises = trainingPlan?.exercises
    ? parseExercises(trainingPlan.exercises)
    : [];

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <p className="text-white text-2xl animate-pulse">Načítání...</p>
      </div>
    );

  if (error || !trainingPlan) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <p className="text-red-500 text-xl">Chyba.</p>
      </div>
    );
  }

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,_#2b2e3b,_#1f2029,_#141517)] from-gray-800 via-gray-900 to-black text-white flex flex-col items-center">
      <header className="w-full py-4 bg-gray-900 shadow-sm">
        <div className="flex justify-between items-center px-6 max-w-7xl mx-auto py-4">
          <motion.h1
            className="text-2xl font-semibold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Trénink: {trainingPlan.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/treninky"
              className="px-5 py-2 bg-gray-800 text-sm text-gray-300 rounded-md border border-gray-700 hover:bg-gray-700 hover:text-white transition"
            >
              Zpět na seznam
            </Link>
          </motion.div>
        </div>
      </header>

      <div className="mt-10 flex flex-wrap lg:flex-nowrap items-center lg:items-start gap-6 max-w-7xl w-full px-4">
        <div className="lg:w-3/5 w-full rounded-xl overflow-hidden shadow-lg bg-gray-900">
          <img
            src={
              trainingPlan.image?.url
                ? `http://localhost:1337${trainingPlan.image.url}`
                : "https://via.placeholder.com/800x400"
            }
            alt={trainingPlan.title}
            className="w-full h-64 lg:h-96 object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-gray-800 p-2 px-4 rounded-full flex items-center shadow-md"></div>
        </div>

        <div className="lg:w-2/5 w-full bg-gray-900 rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <div
              className={`w-4 h-4 rounded-full ${getDifficultyColor(
                trainingPlan.difficulty
              )} mr-2`}
            ></div>
            <span className="text-gray-400">{trainingPlan.difficulty}</span>
          </div>
          <div className="text-gray-400 flex justify-between items-center mb-4">
            <span>{formatLength(trainingPlan?.lenght)}</span>
          </div>
          <h1 className="text-3xl font-bold">{trainingPlan.title}</h1>
          <p className="text-sm text-gray-400 mt-4">
            {trainingPlan.description}
          </p>
          <h3 className="text-lg font-semibold mt-6">Cíle tréninku</h3>
          <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
            {trainingPlan.goals
              ?.split(";")
              .map((goal) => goal.trim())
              .filter((goal) => goal)
              .map((goal, idx) => (
                <li key={idx} className="whitespace-pre-line">
                  {goal}
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 w-full max-w-7xl px-4">
        <div className="bg-gray-900 rounded-xl shadow-lg p-4 flex flex-col space-y-4">
          {exercises.map((exercise, idx) => (
            <div
              key={idx}
              className="flex flex-wrap lg:flex-nowrap items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
            >
              <div className="flex items-center space-x-4 min-w-0">
                <div className="w-12 h-12 bg-gray-700 flex items-center justify-center rounded-full text-2xl flex-shrink-0">
                  {exercise.icon}
                </div>
                <span className="text-white font-medium truncate">
                  {exercise.name}
                </span>
              </div>

              <div className="text-gray-300 text-right flex-shrink-0 whitespace-nowrap">
                {exercise.details && (
                  <span className="mr-4">{exercise.details}</span>
                )}
                {exercise.sets && (
                  <span className="text-green-400">{exercise.sets}</span>
                )}
              </div>
            </div>
          ))}
          <button className="bg-green-500 text-white text-lg font-bold py-2 rounded-lg hover:bg-green-600 transition">
            Začít trénink
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingPlanDetail;
