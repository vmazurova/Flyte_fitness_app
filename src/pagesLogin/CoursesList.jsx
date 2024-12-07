import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar.jsx";

export default function CourseList() {
  const {
    loading,
    error,
    data = { data: [] },
  } = useFetch("http://localhost:1337/api/courses?populate=*");

  if (loading)
    return <p className="text-white text-center mt-20 text-xl">Načítání...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-20 text-xl">
        Chyba: {error.message}
      </p>
    );

  const courses = data?.data.filter((course) => {
    const courseDate = course.date ? new Date(course.date) : null;
    return courseDate && courseDate > new Date();
  });

  return (
    <div className="h-screen w-screen bg-cover bg-fixed bg-center flex flex-col lg:flex-row ">
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
          <h1 className="text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 drop-shadow-md">
            Otevřené kurzy
          </h1>
          <p className="text-sm lg:text-lg text-gray-300 mt-4">
            Vyberte si z naší nabídky aktuálních kurzů a začněte ještě dnes.
          </p>
        </motion.div>

        {/* Course Grid */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course, index) => {
              const imageUrl = course.image?.[0]?.formats?.medium?.url
                ? `http://localhost:1337${course.image[0].formats.medium.url}`
                : "https://via.placeholder.com/400x200";

              const formattedDate = course.date
                ? new Date(course.date).toLocaleString("cs-CZ", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })
                : "N/A";

              return (
                <motion.div
                  key={course.id}
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
                    alt={course.title}
                  />
                  <div className="p-4 lg:p-6 z-20">
                    <h3 className="text-lg lg:text-2xl font-semibold text-white truncate mb-2 lg:mb-4">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm lg:text-base mb-2 lg:mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    <p className="text-gray-500 text-xs lg:text-sm mb-2">
                      Datum: {formattedDate}
                    </p>
                    <div className="text-center">
                      <Link to={`/kurz/${course.documentId}`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 lg:px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                        >
                          Přihlásit se
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="text-center text-white text-xl">
              Žádné kurzy nenalezeny.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
