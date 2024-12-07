import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar.jsx";

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

  const mealPlans = data?.data || [];

  return (
    <div className="h-screen w-screen bg-cover bg-fixed bg-center flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <section className="flex-1 overflow-y-auto lg:ml-64 py-12 px-6">
        {/* Title Section */}
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
            Objevte naše personalizované stravovací plány navržené pro vás.
          </p>
        </motion.div>

        {/* Meal Plan Grid */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealPlans.length > 0 ? (
            mealPlans.map((mealPlan, index) => {
              const imageUrl = mealPlan.image?.[0]?.formats?.medium?.url
                ? `http://localhost:1337${mealPlan.image[0].formats.medium.url}`
                : "https://via.placeholder.com/400x200";

              const duration = mealPlan.duration || "N/A";

              return (
                <motion.div
                  key={mealPlan.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.4)",
                  }}
                  className="group relative h-full overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-gray-900 via-gray-800 to-black transition-transform duration-300"
                >
                  <img
                    className="w-full h-40 lg:h-56 object-cover rounded-t-xl"
                    src={imageUrl}
                    alt={mealPlan.title}
                  />
                  <div className="p-4 lg:p-6 z-20">
                    <h3 className="text-lg lg:text-2xl font-semibold text-white truncate mb-2 lg:mb-4">
                      {mealPlan.title}
                    </h3>
                    <p className="text-gray-400 text-sm lg:text-base mb-2 lg:mb-4 line-clamp-3">
                      {mealPlan.description}
                    </p>
                    <p className="text-gray-500 text-xs lg:text-sm mb-2">
                      Délka: {duration}
                    </p>
                    <div className="text-center">
                      <Link to={`/mealplan/${mealPlan.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 lg:px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                        >
                          Detail
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="text-center text-white text-xl">
              Žádné meal plany nenalezeny.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
