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
  const [loadingBookingStatus, setLoadingBookingStatus] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const { loading, error, data } = useFetch(
    `http://localhost:1337/api/courses?filters[documentId][$eq]=${documentId}&populate=*`
  );

  const course = data?.data?.[0];

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No valid token found.");
        return;
      }

      try {
        const response = await fetch("http://localhost:1337/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserRole(userData.role?.name || null); // Zkontroluj, jestli role vrací "Trainer"
        } else {
          console.error("Failed to fetch user role:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const handleRemoveUser = async (bookingId) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!bookingId) {
        console.error("Neplatné bookingId.");
        return;
      }

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
        console.log("Rezervace úspěšně odstraněna.");
        setEnrolledUsers((prev) =>
          prev.filter((user) => user.bookingId !== bookingId)
        );
      } else {
        console.error(
          "Chyba při odstraňování rezervace:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Chyba při odstraňování rezervace:", error);
    }
  };

  const fetchEnrolledUsers = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No valid token found.");
        return;
      }

      const response = await fetch(
        `http://localhost:1337/api/bookings?filters[course][documentId][$eq]=${documentId}&populate=user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("API Response:", result.data); // Debugging
        const users =
          result?.data?.map((booking) => ({
            bookingId: booking.id, // ID rezervace
            username: booking.user?.username || "Neznámé jméno",
            email: booking.user?.email || "Neznámý email",
          })) || [];
        setEnrolledUsers(users);
      } else {
        console.error("Chyba při načítání uživatelů:", await response.text());
      }
    } catch (error) {
      console.error("Chyba při načítání uživatelů:", error);
    }
  };

  useEffect(() => {
    if (documentId && userRole === "Trainer") {
      fetchEnrolledUsers();
    }
  }, [documentId, userRole]);

  const checkBooking = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No valid token found.");
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload?.id;

      console.log("Kontroluji rezervaci pro uživatele:", userId);
      console.log("Kurz Document ID:", documentId);

      const response = await fetch(
        `http://localhost:1337/api/bookings?filters[user][id][$eq]=${userId}&filters[course][documentId][$eq]=${documentId}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("API Response:", result);

        if (result?.data?.length > 0) {
          console.log("Rezervace existuje:", result.data[0]);
          setIsBooked(true);
          setBookingId(result.data[0].id); // Nastavení správného bookingId
        } else {
          console.log("Rezervace neexistuje.");
          setIsBooked(false);
          setBookingId(null);
        }
      } else {
        console.error("Chyba při načítání rezervace:", response.statusText);
      }
    } catch (error) {
      console.error("Chyba při kontrole rezervace:", error);
    } finally {
      setLoadingBookingStatus(false);
    }
  };

  const handleBook = async () => {
    setLoadingAction(true);
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No valid token found.");
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload?.id;

      const response = await fetch("http://localhost:1337/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            user: userId,
            course: documentId,
          },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Rezervace vytvořena:", result);
        setIsBooked(true);
        setBookingId(result.data.id);
      } else {
        console.error("Chyba při přihlášení na kurz:", await response.json());
      }
    } catch (error) {
      console.error("Chyba při přihlášení na kurz:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleCancelBooking = async () => {
    setLoadingAction(true);
    try {
      const token = localStorage.getItem("jwt");
      console.log("Zkouším odstranit booking s ID:", bookingId);

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
        console.log("Rezervace byla úspěšně zrušena.");
        setIsBooked(false);
        setBookingId(null);
      } else {
        const text = await response.text(); // Získání surového textu odpovědi
        console.error("Chyba při odhlášení z kurzu:", text);
      }
    } catch (error) {
      console.error("Chyba při odhlášení z kurzu:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  useEffect(() => {
    if (documentId) {
      setLoadingBookingStatus(true);
      checkBooking();
    }
  }, [documentId]);

  if (loading || loadingBookingStatus) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <p className="text-white text-2xl animate-pulse">Načítání...</p>
      </div>
    );
  }

  if (error || !data?.data?.length) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <p className="text-red-500 text-xl">Chyba: Kurz nenalezen.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200">
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

      <main className="container mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
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
              {userRole === "Trainer" ? (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Přihlášení uživatelé:
                  </h3>
                  {enrolledUsers.length > 0 ? (
                    <ul>
                      {enrolledUsers.map((user) => (
                        <li
                          key={user.bookingId}
                          className="flex justify-between items-center text-gray-300 mb-2"
                        >
                          <span>
                            {user.username} ({user.email})
                          </span>
                          <button
                            onClick={() => handleRemoveUser(user.bookingId)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            Odebrat
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">
                      Na tento kurz zatím nejsou žádní uživatelé přihlášeni.
                    </p>
                  )}
                </div>
              ) : (
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
              )}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default CourseDetail;
