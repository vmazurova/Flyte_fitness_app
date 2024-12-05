import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";

const CourseDetail = () => {
  const { id: documentId } = useParams();

  const { loading, error, data } = useFetch(
    `http://localhost:1337/api/courses?filters[documentId][$eq]=${documentId}&populate=*`
  );

  const { data: allCourses } = useFetch(
    `http://localhost:1337/api/courses?populate=*`
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <p className="text-white text-2xl animate-pulse">Načítání...</p>
      </div>
    );

  if (error || !data?.data?.length) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <p className="text-red-500 text-xl">Chyba: Kurz nenalezen.</p>
      </div>
    );
  }

  const course = data.data[0];
  const imageUrl = course.image?.[0]?.formats?.medium?.url
    ? `http://localhost:1337${course.image[0].formats.medium.url}`
    : "https://via.placeholder.com/400x200";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200">
      {/* Header */}
      <header className="py-6 shadow-md bg-gradient-to-r from-purple-500 to-indigo-500">
        <div className="container mt-10 mx-auto px-6 flex justify-between items-center">
          <motion.h1
            className="text-3xl font-extrabold text-white tracking-widest"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Detaily kurzu
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/vsechny-kurzy"
              className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-transform"
            >
              Zpět na seznam kurzů
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Hlavní obsah */}
        <section className="col-span-2 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-lg p-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Obrázek */}
            <img
              src={imageUrl}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />

            {/* Detaily kurzu */}
            <div className="mt-6">
              <h1 className="text-4xl font-bold text-white">{course.title}</h1>
              <p className="mt-4 text-gray-400 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Datum a tlačítko */}
            <div className="flex justify-between items-center mt-8">
              <p className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                {course.date
                  ? new Date(course.date).toLocaleString("cs-CZ", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })
                  : "Datum není k dispozici"}
              </p>
              <Link to={`/enroll/${course.id}`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-md hover:shadow-xl"
                >
                  Přihlásit se
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Pravý panel */}
        <aside className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Další lekce</h2>
          <div className="space-y-4">
            {allCourses?.data.map((otherCourse, index) => (
              <motion.div
                key={otherCourse.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Link
                  to={`/detail/${otherCourse.documentId}`}
                  className="flex items-center gap-4 p-3 bg-gradient-to-r from-gray-700 via-gray-800 to-black rounded-lg hover:scale-105 transition-transform"
                >
                  <img
                    src={
                      otherCourse.image?.[0]?.formats?.thumbnail?.url
                        ? `http://localhost:1337${otherCourse.image[0].formats.thumbnail.url}`
                        : "https://via.placeholder.com/60x60"
                    }
                    alt={otherCourse.title}
                    className="w-14 h-14 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-white font-semibold">
                      {otherCourse.title}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {otherCourse.date
                        ? new Date(otherCourse.date).toLocaleDateString("cs-CZ")
                        : "Datum neznámé"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CourseDetail;
