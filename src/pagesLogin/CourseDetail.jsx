import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";

const CourseDetail = () => {
  const { id: documentId } = useParams();
  const [isBooked, setIsBooked] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  // Fetch course data
  const { loading, error, data } = useFetch(
    `http://localhost:1337/api/courses?filters[documentId][$eq]=${documentId}&populate=*`
  );

  const course = data?.data?.[0];

  // Check if user is booked
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
      {/* Header */}
      <header className="py-6 shadow-md bg-gradient-to-r from-purple-500 to-indigo-500">
        <div className="container mx-auto px-6 flex justify-between items-center">
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
        <section className="col-span-2 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-lg p-8">
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
      </main>
    </div>
  );
};

export default CourseDetail;
