import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";
import Sidebar from "./Sidebar";

const CourseDetail = () => {
  const { id: documentId } = useParams();
  const [isBooked, setIsBooked] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  const { loading, error, data } = useFetch(
    `http://localhost:1337/api/courses?filters[documentId][$eq]=${documentId}&populate=*`
  );
  const { data: allCourses } = useFetch(
    `http://localhost:1337/api/courses?populate=*`
  );

  const course = data?.data?.[0];

  useEffect(() => {
    const checkBooking = async () => {
      try {
        const token = localStorage.getItem("jwt");

        if (!token) {
          console.error("User is not logged in.");
          return;
        }

        const userId = JSON.parse(atob(token.split(".")[1])).id;

        const response = await fetch(
          `http://localhost:1337/api/bookings?filters[course][documentId][$eq]=${documentId}&filters[user][id][$eq]=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unauthorized or invalid token");
        }

        const result = await response.json();

        if (result?.data?.length > 0) {
          setIsBooked(true);
          setBookingId(result.data[0].id);
        } else {
          setIsBooked(false);
          setBookingId(null);
        }
      } catch (err) {
        console.error("Error checking booking:", err);
      }
    };

    checkBooking();
  }, [documentId]);

  const handleBook = async () => {
    setLoadingAction(true);
    try {
      const token = localStorage.getItem("jwt");

      const response = await fetch("http://localhost:1337/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            course: documentId,
          },
        }),
      });

      if (response.ok) {
        setIsBooked(true);
        const result = await response.json();
        setBookingId(result.data.id);
      }
    } catch (err) {
      console.error("Error booking:", err);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleCancelBooking = async () => {
    setLoadingAction(true);
    try {
      const token = localStorage.getItem("jwt");

      const response = await fetch(
        `http://localhost:1337/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setIsBooked(false);
        setBookingId(null);
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
    } finally {
      setLoadingAction(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200">
      <Sidebar />
      <header className="py-4 bg-gray-900 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.h1
            className="text-2xl font-semibold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Detaily kurzu
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/kurzy"
              className="px-5 py-2 bg-gray-800 text-sm text-gray-300 rounded-md border border-gray-700 hover:bg-gray-700 hover:text-white transition"
            >
              Zpět na seznam kurzů
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left - Main Course Details */}
        <section className="col-span-2 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-lg p-8">
          <motion.img
            src={
              course?.image?.[0]?.formats?.medium?.url
                ? `http://localhost:1337${course.image[0].formats.medium.url}`
                : "https://via.placeholder.com/800x400"
            }
            alt={course.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-white mb-6">
              {course.title}
            </h1>
            <p className="text-gray-400 leading-relaxed mb-6">
              {course.description}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-lg text-gray-400">
                Datum:{" "}
                {course.date
                  ? new Date(course.date).toLocaleString("cs-CZ", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })
                  : "Datum není k dispozici"}
              </p>
              <button
                onClick={isBooked ? handleCancelBooking : handleBook}
                disabled={loadingAction}
                className={`px-6 py-3 ${
                  isBooked
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                } text-white rounded-full shadow-md transition-transform`}
              >
                {isBooked ? "Odhlásit se" : "Přihlásit se"}
              </button>
            </div>
          </motion.div>
        </section>

        {/* Right - List of Other Courses */}
        <aside className="col-span-1 bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Další kurzy</h2>
          <ul className="space-y-6">
            {allCourses?.data
              ?.filter((course) => {
                const courseDate = new Date(course.date);
                return courseDate > new Date(); // Filtruje pouze budoucí kurzy
              })
              .map((course) => (
                <li key={course.id} className="flex flex-col">
                  <Link
                    to={`/kurz/${course.documentId}`}
                    className="flex items-center p-4 hover:bg-gray-800 rounded-md transition"
                  >
                    <div className="w-14 h-14 overflow-hidden rounded-lg mr-4">
                      <img
                        src={
                          course?.image?.[0]?.formats?.thumbnail?.url
                            ? `http://localhost:1337${course.image[0].formats.thumbnail.url}`
                            : "https://via.placeholder.com/100x100"
                        }
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="text-white font-medium text-lg">
                        {course.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {course.date
                          ? new Date(course.date).toLocaleDateString("cs-CZ", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "Datum není k dispozici"}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default CourseDetail;
