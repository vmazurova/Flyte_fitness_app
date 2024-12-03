import React from "react";
import { useParams, Link } from "react-router-dom";
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
    return <p className="text-white text-center mt-20 text-xl">Načítání...</p>;

  if (error || !data?.data?.length) {
    return (
      <p className="text-red-500 text-center mt-20 text-xl">
        Chyba: Kurz nenalezen.
      </p>
    );
  }

  const course = data.data[0];
  const imageUrl = course.image?.[0]?.formats?.medium?.url
    ? `http://localhost:1337${course.image[0].formats.medium.url}`
    : "https://via.placeholder.com/400x200";

  return (
    <div className="min-h-screen w-screen bg-s1 text-white flex flex-col">
      {/* Header */}
      <header className="py-6 shadow-md bg-gradient-to-r from-p3 via-p2 to-p6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold mt-20">Detaily kurzu</h1>
          <Link
            to="/vsechny-kurzy"
            className="px-6 mt-20 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Zpět na seznam kurzů
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex flex-col md:flex-row gap-8 py-8 px-6">
        {/* Levý panel */}
        <aside className="w-full md:w-1/4 bg-s2 rounded-xl shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-p4">Další lekce</h2>
          <div className="space-y-4">
            {allCourses?.data.map((otherCourse) => (
              <Link
                to={`/detail/${otherCourse.documentId}`}
                key={otherCourse.id}
                className="flex items-center gap-4 p-2 bg-gradient-to-r from-p5 to-p2 rounded-lg hover:scale-105 transition-transform"
              >
                <img
                  src={
                    otherCourse.image?.[0]?.formats?.thumbnail?.url
                      ? `http://localhost:1337${otherCourse.image[0].formats.thumbnail.url}`
                      : "https://via.placeholder.com/60x60"
                  }
                  alt={otherCourse.title}
                  className="w-12 h-12 object-cover rounded-lg shadow-sm"
                />
                <p className="text-sm text-white">{otherCourse.title}</p>
              </Link>
            ))}
          </div>
        </aside>

        {/* Hlavní část */}
        <section className="flex-1 bg-s2 rounded-xl shadow-lg p-8">
          <div className="mb-8">
            {/* Obrázek */}
            <div className="overflow-hidden rounded-lg shadow-md">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <p className="text-gray-400 text-center py-24">
                  Obrázek není k dispozici.
                </p>
              )}
            </div>
          </div>

          {/* Popis kurzu */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-p4 mb-4">
              {course.title}
            </h1>
            <p className="text-lg text-gray-400">{course.description}</p>
          </div>

          {/* Datum a tlačítko */}
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold bg-gradient-to-r from-p4 to-p5 bg-clip-text text-transparent">
              {course.date
                ? new Date(course.date).toLocaleString("cs-CZ", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })
                : "Datum není k dispozici"}
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg hover:scale-105 transition-transform">
              Přihlásit se
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CourseDetail;
