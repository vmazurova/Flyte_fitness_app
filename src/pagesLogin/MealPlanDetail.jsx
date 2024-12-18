import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const MealPlanDetail = () => {
  const { id: mealPlanId } = useParams();

  const { loading, error, data } = useFetch(
    `http://localhost:1337/api/meal-plans?filters[documentId][$eq]=${documentId}&populate=*`
  );

  const mealPlan = data?.data;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-white text-xl">Načítání...</p>
      </div>
    );
  }

  if (error || !mealPlan) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-xl">Chyba: Jídelníček nenalezen.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="py-6 bg-gray-800 shadow-md">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold">{mealPlan.attributes.title}</h1>
          <p className="text-gray-400">{mealPlan.attributes.description}</p>
          <p className="text-gray-400 mt-2">
            Týden od:{" "}
            {new Date(mealPlan.attributes.week_start).toLocaleDateString(
              "cs-CZ"
            )}
          </p>
        </div>
      </header>

      <main className="container mx-auto py-10 px-6 grid grid-cols-1 gap-6">
        {mealPlan.attributes.image && (
          <div className="mb-6">
            <img
              src={`http://localhost:1337${mealPlan.attributes.image.url}`}
              alt={mealPlan.attributes.title}
              className="w-full h-auto rounded-md"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          {[
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ].map((day) => (
            <section key={day} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold capitalize mb-4">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </h2>
              <ul className="space-y-2">
                {[
                  "breakfast",
                  "morning_snack",
                  "lunch",
                  "afternoon_snack",
                  "dinner",
                ].map((meal) => (
                  <li
                    key={`${day}_${meal}`}
                    className="flex justify-between items-center"
                  >
                    <span className="capitalize">
                      {meal.replace("_", " ")}:
                    </span>
                    <span className="text-gray-300">
                      {mealPlan.attributes[`${day}_${meal}`] ||
                        "Není k dispozici"}
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
