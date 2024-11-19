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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const courses = data?.data.filter((course) => {
    const courseDate = new Date(course.date);
    return courseDate > new Date();
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Content Section */}
      <section className="flex-1 py-12 bg-gray-900">
        <motion.h2
          className="h2 mt-10 max-lg:h4 max-md:h5 z-3 relative mx-auto mb-14 max-w-lg text-center text-white max-md:mb-11 max-sm:max-w-sm"
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Otevřené kurzy
        </motion.h2>
        <div className="container mx-auto px-4 sm:px-6 mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? (
              courses.map((course, index) => {
                const imageUrl = course.image?.[0]?.formats?.medium?.url
                  ? `http://localhost:1337${course.image[0].formats.medium.url}`
                  : "https://via.placeholder.com/400x200";

                const formattedDate = new Date(course.date).toLocaleString(
                  "cs-CZ",
                  {
                    dateStyle: "short",
                    timeStyle: "short",
                  }
                );

                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className="group relative h-full overflow-hidden rounded-2xl bg-gradient-to-r from-p3 to-p2 shadow-lg"
                  >
                    <div className="relative z-10 h-full overflow-hidden rounded-[inherit] bg-s1/50">
                      <img
                        className="inline-flex opacity-80 w-full h-56 object-cover"
                        src={imageUrl}
                        alt={course.title}
                      />
                      <div className="p-6 z-20">
                        <h3 className="text-lg font-semibold text-white truncate mb-3">
                          {course.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-3">
                          {course.description}
                        </p>
                        <p className="text-gray-300 text-xs mt-2">
                          {formattedDate}
                        </p>
                        <div className="mt-4 text-center">
                          <Link to={`/detail/${course.id}`}>
                            <button className="px-6 py-2 bg-p3 text-white rounded-full hover:bg-p2 transition">
                              Přihlásit se
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-center text-white">Žádné kurzy nenalezeny.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
