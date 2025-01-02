import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Sidebar from "./Sidebar.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MealPlanList() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const {
    loading,
    error,
    data = { data: [] },
  } = useFetch("http://localhost:1337/api/meal-plans?populate=*");

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) return;
      try {
        const response = await fetch("http://localhost:1337/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const user = await response.json();
          setUserRole(user.role.name || null);
        }
      } catch (err) {
        console.error("Chyba při získávání role uživatele:", err);
      }
    };
    fetchUserRole();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, centerPadding: "30px" },
      },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "20px" } },
    ],
  };

  if (loading)
    return <p className="text-white text-center mt-20">Načítání...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-20">Chyba: {error.message}</p>
    );

  const mealPlans = Array.isArray(data.data) ? data.data : [];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`relative transition-transform duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-0"
        }`}
      >
        <header className="py-12  text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold">Tvoje jídelníčky</h1>
            <p className="text-gray-300 mt-3">
              Najdi plán, který tě posune blíže k tvým cílům.
            </p>
            {userRole === "Trainer" && (
              <div className="mt-6">
                <Link to="/jidelnicek-pridani">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition"
                  >
                    Přidat jídelníček
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.div>
        </header>

        <main className="px-6 py-12">
          <section className="mb-12">
            <h2 className="text-center text-3xl font-bold mb-6">
              Doporučené jídelníčky
            </h2>
            <div className="max-w-7xl mx-auto">
              <Slider {...settings}>
                {mealPlans.map((mealPlan, index) => {
                  const {
                    id,
                    title,
                    description,
                    image,
                    week_start: weekStart,
                    documentId,
                  } = mealPlan;

                  const imageUrl = image?.url
                    ? `http://localhost:1337${image.url}`
                    : "https://via.placeholder.com/400x200";

                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      className="p-4"
                    >
                      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                        <img
                          src={imageUrl}
                          alt={title || "Jídelníček"}
                          className="w-full h-56 object-cover"
                        />
                        <div className="p-6 text-center">
                          <h3 className="text-xl font-semibold">{title}</h3>
                          <p className="text-gray-400 mt-2 text-sm">
                            {description || "Bez popisu"}
                          </p>
                          <p className="text-gray-500 mt-1 text-xs">
                            Začátek týdne:{" "}
                            {weekStart
                              ? new Date(weekStart).toLocaleDateString("cs-CZ")
                              : "N/A"}
                          </p>
                          <div className="mt-4">
                            <Link to={`/jidelnicek/${documentId}`}>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full shadow-md hover:shadow-lg transition"
                              >
                                Detail jídelníčku
                              </motion.button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </Slider>
            </div>
          </section>

          <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Personal Dashboard */}
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text text-white to-green-400">
                Tvůj osobní přehled
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-6 bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-blue-400">
                    <i className="fas fa-chart-line mr-2"></i> Týdenní aktivita
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Tento týden jsi dokončil(a){" "}
                    <span className="text-white font-bold">5/7</span>{" "}
                    plánovaných jídelníčků.
                  </p>
                  <div className="h-4 w-full bg-gray-700 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: "71%" }}
                    ></div>
                  </div>
                </div>

                <div className="p-6 bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-green-400">
                    <i className="fas fa-heart mr-2"></i> Oblíbené recepty
                  </h3>
                  <p className="text-gray-300">
                    Máš <span className="text-white font-bold">12</span>{" "}
                    oblíbených receptů. Prohlédni si je nebo přidej nové!
                  </p>
                  <Link
                    to="/jidelnicky/oblibene"
                    className="mt-4 inline-block text-green-400 font-medium hover:underline"
                  >
                    Projít oblíbené recepty &rarr;
                  </Link>
                </div>

                <div className="p-6 bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">
                    <i className="fas fa-lightbulb mr-2"></i> Tipy na zlepšení
                  </h3>
                  <p className="text-gray-300">
                    Zkus přidat více zeleniny do svých plánů. Můžeš využít naše
                    návrhy nebo vytvořit vlastní kombinace.
                  </p>
                  <Link
                    to="/jidelnicky/tipy"
                    className="mt-4 inline-block text-purple-400 font-medium hover:underline"
                  >
                    Zobrazit návrhy &rarr;
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-16 max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-8">
                Statistiky stravování
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-800 p-6 rounded-3xl shadow-lg">
                  <h3 className="text-xl font-bold text-blue-400">Kalorie</h3>
                  <p className="text-gray-300 mt-2">
                    Průměrně:{" "}
                    <span className="text-white font-bold">1800 kcal</span> /
                    den
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-3xl shadow-lg">
                  <h3 className="text-xl font-bold text-green-400">
                    Bílkoviny
                  </h3>
                  <p className="text-gray-300 mt-2">
                    Průměrně:{" "}
                    <span className="text-white font-bold">120 g</span> / den
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-3xl shadow-lg">
                  <h3 className="text-xl font-bold text-purple-400">
                    Sacharidy
                  </h3>
                  <p className="text-gray-300 mt-2">
                    Průměrně:{" "}
                    <span className="text-white font-bold">200 g</span> / den
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
