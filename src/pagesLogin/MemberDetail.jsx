import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MemberDetail = () => {
  // Data pro první graf (Sales Overview)
  const [salesChart, setSalesChart] = useState({
    series: [
      {
        name: "Websites",
        data: [200, 300, 400, 500, 300, 200, 400, 300, 350, 330, 400, 500],
      },
      {
        name: "Mobile Apps",
        data: [150, 250, 300, 400, 250, 150, 300, 250, 200, 250, 300, 400],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        toolbar: { show: false },
      },
      colors: ["#A35CFF", "#8D36FF"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: { colors: "#C4CBF5", fontFamily: "Poppins" },
        },
      },
      yaxis: {
        labels: {
          style: { colors: "#C4CBF5", fontFamily: "Poppins" },
        },
      },
      tooltip: { theme: "dark" },
      grid: { borderColor: "#333" },
    },
  });

  // Data pro druhý graf (Active Users)
  const [usersChart, setUsersChart] = useState({
    series: [
      {
        name: "Active Users",
        data: [320, 250, 400, 150, 200, 300],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      colors: ["#712BCD"],
      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: "45%",
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        labels: {
          style: { colors: "#C4CBF5", fontFamily: "Poppins" },
        },
      },
      yaxis: {
        labels: {
          style: { colors: "#C4CBF5", fontFamily: "Poppins" },
        },
      },
      tooltip: { theme: "dark" },
      grid: { borderColor: "#333" },
    },
  });

  // Data pro seznam kurzů
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/courses");
        const result = await response.json();
        setCourses(result.data || []);
      } catch (error) {
        console.error("Chyba při načítání kurzů:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = (courseId) => {
    console.log(`Přihlášen na kurz s ID: ${courseId}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/path/to/your-background.jpg')",
      }}
    >
      <div className="flex flex-col gap-8 p-8">
        {/* Sekce grafů */}
        <div className="flex flex-row gap-8">
          {/* První graf */}
          <div className="bg-s2 p-6 rounded-20 shadow-200 flex-1">
            <h2 className="text-p4 text-2xl font-bold mb-2">Sales Overview</h2>
            <p className="text-p5 text-sm">+5% more in 2021</p>
            <Chart
              options={salesChart.options}
              series={salesChart.series}
              type="area"
              height={350}
            />
          </div>

          {/* Druhý graf */}
          <div className="bg-s2 p-6 rounded-20 shadow-200 flex-1">
            <h2 className="text-p4 text-2xl font-bold mb-2">Active Users</h2>
            <p className="text-green-400 text-sm">(+23%) than last week</p>
            <Chart
              options={usersChart.options}
              series={usersChart.series}
              type="bar"
              height={350}
            />
          </div>
        </div>

        {/* Sekce kurzů (pod jedním grafem) */}
        <div className="bg-s2 p-6 rounded-20 shadow-200 flex-1">
          <h2 className="text-p4 text-2xl font-bold mb-4">Dostupné kurzy</h2>
          <div className="flex flex-col gap-4">
            {courses.length > 0 ? (
              courses.map((course) => {
                const formattedDate = course.attributes?.date
                  ? new Date(course.attributes.date).toLocaleDateString("cs-CZ")
                  : "Datum není dostupné";

                return (
                  <motion.div
                    key={course.id}
                    className="bg-s3 p-4 rounded-lg flex justify-between items-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        {course.attributes?.title || "Neznámý název"}
                      </h3>
                      <p className="text-p5 text-sm">Datum: {formattedDate}</p>
                    </div>
                    <Link to={`/jidelnicek/${course.id}`}>
                      <button className="px-4 py-2 bg-p1 hover:bg-p2 text-white rounded-full shadow-md">
                        Přihlásit
                      </button>
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-center text-white">
                Žádné kurzy nejsou dostupné.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
