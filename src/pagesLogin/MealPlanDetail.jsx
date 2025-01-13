import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Sidebar from "./Sidebar";

const MealPlanDetail = () => {
  const { id: mealPlanId } = useParams();

  const { loading, error, data } = useFetch(
    `http://localhost:1337/api/meal-plans/${mealPlanId}?populate=*`
  );

  const mealPlan = data?.data;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-white text-xl font-light animate-pulse">
          Načítání...
        </p>
      </div>
    );
  }

  if (error || !mealPlan) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-xl font-light">chyba</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Sidebar />

      <header className="py-6 bg-gray-800 shadow-md relative">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              {mealPlan.title}
            </h1>
            <p className="text-lg text-gray-300 italic">
              {mealPlan.description}
            </p>
            <p className="text-gray-400 mt-4">
              <span className="font-semibold text-white">Týden od:</span>{" "}
              {mealPlan.week_start
                ? new Date(mealPlan.week_start).toLocaleDateString("cs-CZ")
                : "žadne datum"}
            </p>
          </div>
          <Link
            to="/jidelnicky"
            className="mt-4 md:mt-0 px-5 py-2 bg-gray-700 text-sm text-gray-300 rounded-md border border-gray-600 hover:bg-gray-600 hover:text-white transition"
          >
            Zpět
          </Link>
        </div>
      </header>

      <main className="container mx-auto py-10 px-6">
        {mealPlan.image && (
          <div className="mb-6">
            <img
              src={`http://localhost:1337${mealPlan.image.url}`}
              alt={mealPlan.title || "Jídelníček"}
              className="w-full max-h-[500px] object-cover rounded-md shadow-lg"
            />
          </div>
        )}

        <div className="flex flex-col gap-6">
          {[
            { day: "monday", label: "Pondělí" },
            { day: "tuesday", label: "Úterý" },
            { day: "wednesday", label: "Středa" },
            { day: "thursday", label: "Čtvrtek" },
            { day: "friday", label: "Pátek" },
            { day: "saturday", label: "Sobota" },
            { day: "sunday", label: "Neděle" },
          ].map(({ day, label }) => (
            <section
              key={day}
              className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col"
            >
              <h2 className="text-2xl font-semibold capitalize text-white mb-4">
                {label}
              </h2>
              <ul className="space-y-2">
                {[
                  { meal: "breakfast", label: "Snídaně" },
                  { meal: "morning_snack", label: "Dopolední svačina" },
                  { meal: "lunch", label: "Oběd" },
                  { meal: "afternoon_snack", label: "Odpolední svačina" },
                  { meal: "dinner", label: "Večeře" },
                ].map(({ meal, label }) => (
                  <li
                    key={`${day}_${meal}`}
                    className="flex justify-between items-center"
                  >
                    <span className="capitalize font-medium text-gray-300">
                      {label}:
                    </span>
                    <span className="text-gray-400 text-sm lg:text-base">
                      {mealPlan[`${day}_${meal}`] || "Není k dispozici"}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MealPlanDetail;
