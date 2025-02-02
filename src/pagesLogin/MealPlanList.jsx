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
        console.error("chyba v roli", err);
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
            <h1 className="text-4xl lg:text-5xl font-bold">Jídelníčky</h1>
            <p className="text-gray-300 mt-3">
              Podívej se na jídelníčky na míru:
            </p>
            {userRole === "Trainer" && (
              <div className="mt-6">
                <Link to="/jidelnicek-pridani">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition"
                  >
                    Vytvořit jídelníček
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.div>
        </header>

        <main className="px-6 py-12">
          <section className="mb-12">
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
                                Chci vidět víc!
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
        </main>
      </div>
    </div>
  );
}
