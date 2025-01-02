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
  const [maxCapacity, setMaxCapacity] = useState(0);
  const { loading, error, data } = useFetch(
    `http://localhost:1337/api/courses?filters[documentId][$eq]=${documentId}&populate=*`
  );
  const [showDangerZone, setShowDangerZone] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    data: allCourses,
    loading: allCoursesLoading,
    error: allCoursesError,
  } = useFetch(`http://localhost:1337/api/courses?populate=*`);

  const course = data?.data?.[0];

  useEffect(() => {
    if (course) {
      setMaxCapacity(course.max_capacity || 0);
    }
  }, [course]);

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No valid token found.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:1337/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }, // Tato závorka byla správně
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

  useEffect(() => {
    if (allCoursesError) {
      console.error("Chyba při načítání všech kurzů:", allCoursesError);
    }
  }, [allCoursesError]);
  const handleDeleteCourse = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        `http://localhost:1337/api/courses/${documentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Kurz byl úspěšně odstraněn.");
        // Přesměrování nebo jiná logika po odstranění
      } else {
        console.error("Chyba při odstraňování kurzu:", await response.text());
      }
    } catch (error) {
      console.error("Chyba při odstraňování kurzu:", error);
    }
  };
  const handleRemoveUser = async (bookingId) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!bookingId) {
        console.error("Neplatné bookingId.");
        return;
      }

      console.log("Snažím se odstranit rezervaci s ID:", bookingId);

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
        console.log(`Rezervace s ID ${bookingId} byla úspěšně odstraněna.`);
        // Aktualizace seznamu uživatelů na frontend
        setEnrolledUsers((prev) =>
          prev.filter((user) => user.bookingId !== bookingId)
        );
      } else {
        const errorText = await response.text();
        console.error("Chyba při mazání rezervace:", errorText);
      }
    } catch (error) {
      console.error("Chyba při mazání rezervace:", error);
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
        `http://localhost:1337/api/bookings?filters[course][documentId][$eq]=${documentId}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Bookings response:", result.data);

        const users = result.data.map((booking) => ({
          bookingId: booking.id,
          username: booking?.user?.username || "Neznámé jméno",
          email: booking?.user?.email || "Neznámý email",
        }));

        console.log("Transformed users list:", users);
        setEnrolledUsers(users);
      } else {
        console.error("Chyba při načítání uživatelů:", await response.text());
      }
    } catch (error) {
      console.error("Chyba při načítání uživatelů:", error);
    }
  };

  useEffect(() => {
    if (documentId) {
      fetchEnrolledUsers();
    }
  }, [documentId]);

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
        console.log("Raw response data:", result);

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

      const response = await fetch(`http://localhost:1337/api/bookings`, {
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

        // Načti znovu přihlášené uživatele
        fetchEnrolledUsers();
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
    setLoadingAction(true); // Nastavení načítacího stavu
    try {
      const token = localStorage.getItem("jwt");
      if (!bookingId) {
        console.error("Chyba: Nebylo nalezeno platné bookingId.");
        return;
      }

      console.log("Odstraňování rezervace s ID:", bookingId);

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
        console.log("Rezervace byla úspěšně odstraněna.");
        // Aktualizace stavů
        console.log("Před aktualizací stavů:", {
          isBooked,
          bookingId,
          enrolledUsers,
        });

        setIsBooked(false);
        setBookingId(null);

        // Aktualizace seznamu přihlášených uživatelů
        setEnrolledUsers((prev) =>
          prev.filter((user) => user.bookingId !== bookingId)
        );

        console.log("Po aktualizaci stavů:", {
          isBooked,
          bookingId,
          enrolledUsers,
        });

        // Opětovná kontrola přihlášení a aktualizace seznamu
        await checkBooking();
        await fetchEnrolledUsers();
      } else {
        const errorText = await response.text();
        console.error("Chyba při odhlášení z kurzu:", errorText);
      }
    } catch (error) {
      console.error("Chyba při odhlášení z kurzu:", error);
    } finally {
      setLoadingAction(false); // Ukončení načítacího stavu
    }
  };

  useEffect(() => {
    if (documentId) {
      setLoadingBookingStatus(true);
      checkBooking();
    }
  }, [documentId]);

  useEffect(() => {
    if (documentId && userRole === "Trainer") {
      fetchEnrolledUsers();
    }
  }, [documentId, userRole]);
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
                : `https://via.placeholder.com/800x400`
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
            <p className="text-lg text-white mb-4">
              Přihlášeno: {enrolledUsers.length}/{maxCapacity}
            </p>
            {enrolledUsers.length >= maxCapacity ? (
              <p className="text-red-500 text-lg font-semibold">
                Kurz je plně obsazen.
              </p>
            ) : (
              <p className="text-green-500 text-lg font-semibold">
                Volná místa jsou k dispozici.
              </p>
            )}

            <div>
              <p className="text-lg text-white mb-4">
                Datum:{" "}
                {course.date
                  ? new Date(course.date).toLocaleString("cs-CZ", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })
                  : "Datum není k dispozici"}
              </p>

              {userRole === "Trainer" && (
                <div className="mt-16">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Přihlášení uživatelé:
                  </h3>
                  {enrolledUsers.length > 0 ? (
                    <ul className="space-y-4">
                      {enrolledUsers.map((user) => (
                        <li
                          key={user.bookingId}
                          className="flex justify-between items-center bg-gray-800 rounded-lg p-4"
                        >
                          <div>
                            <p className="text-white font-medium">
                              {user.username || "Neznámé jméno"}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {user.email || "Neznámý email"}
                            </p>
                          </div>
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
              )}

              {userRole !== "Trainer" && (
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
              {userRole === "Trainer" && (
                <div className="mt-16  border border-red-600 p-4 rounded-md">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Nebezpečná zóna
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-800 rounded-lg p-4">
                      <div>
                        <p className="text-white font-medium">Odstanit kurz</p>
                        <p className="text-gray-400 text-sm">
                          Odstranění kurzu je nevratná akce.
                        </p>
                      </div>
                      {!confirmDelete ? (
                        <button
                          onClick={() => setConfirmDelete(true)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Odstranit kurz
                        </button>
                      ) : (
                        <div className="flex space-x-4">
                          <Link
                            onClick={handleDeleteCourse}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            to="/kurzy"
                          >
                            Ano, odstranit
                          </Link>
                          <button
                            onClick={() => setConfirmDelete(false)}
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
                          >
                            Zrušit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </section>
        <aside className="col-span-1 bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Další kurzy</h2>
          <ul className="space-y-6">
            {allCourses?.data
              ?.filter((course) => {
                const courseDate = new Date(course.date);
                return courseDate > new Date();
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
                            : `https://via.placeholder.com/100x100`
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
