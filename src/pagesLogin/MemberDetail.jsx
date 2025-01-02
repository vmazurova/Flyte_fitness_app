import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Sidebar from "./Sidebar.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MemberDetail() {
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
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
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
    <div className="relative min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`relative transition-transform duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-0"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-12">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <p className="text-gray-400">
              Přihlášen jako: {userRole || "Nepřihlášený uživatel"}
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold">Tvoje jídelníčky</h1>
            <p className="text-gray-400 mt-2">Najdi plán, který ti vyhovuje.</p>
          </motion.div>
          {userRole === "Trainer" && (
            <div className="text-center mb-8">
              <Link to="/jidelnicek-pridani">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition"
                >
                  Přidat jídelníček
                </motion.button>
              </Link>
            </div>
          )}
        </div>

        {/* Carousel */}
        <div className="px-6">
          <Slider {...settings}>
            {mealPlans.map((mealPlan, index) => (
              <motion.div
                key={mealPlan.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="p-4"
              >
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={
                      mealPlan.image?.url
                        ? `http://localhost:1337${mealPlan.image.url}`
                        : "https://via.placeholder.com/400x200"
                    }
                    alt={mealPlan.title || "Jídelníček"}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white">
                      {mealPlan.title || "Neznámý jídelníček"}
                    </h3>
                    <p className="text-gray-400 mt-2 text-sm">
                      {mealPlan.description || "Bez popisu"}
                    </p>
                    <div className="mt-4 text-center">
                      <Link to={`/jidelnicek/${mealPlan.documentId}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition"
                        >
                          Detail jídelníčku
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>

        {/* Additional Section */}
        <div className="px-6 py-12 bg-gray-800 mt-12">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Proč si vybrat naše jídelníčky?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Vědecký přístup</h3>
              <p className="text-gray-400">
                Všechny jídelníčky jsou sestavené podle aktuálních výživových
                trendů a vědeckých studií.
              </p>
            </div>
            <div className="p-6 bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Individuální plány</h3>
              <p className="text-gray-400">
                Přizpůsobujeme se tvým potřebám, ať už chceš zhubnout, nabrat
                svaly nebo zlepšit kondici.
              </p>
            </div>
            <div className="p-6 bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Podpora 24/7</h3>
              <p className="text-gray-400">
                Naše podpora je tu pro tebe, kdykoliv potřebuješ pomoc nebo
                radu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
