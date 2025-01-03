import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";
import Sidebar from "./Sidebar";

export default function MemberDetail({ username }) {
  const [chartData, setChartData] = useState({
    weight: [],
    height: [],
    bmi: [],
    bodyFat: [],
    labels: [],
  });

  const [newRecord, setNewRecord] = useState({
    weight: "",
    height: "",
    bmi: "",
    body_fat_percentage: "",
  });

  const {
    loading,
    error,
    data = { data: [] },
  } = useFetch("http://localhost:1337/api/member-details");

  useEffect(() => {
    if (data?.data?.length) {
      const transformedData = {
        weight: data.data.map((item) => item.weight),
        height: data.data.map((item) => item.height),
        bmi: data.data.map((item) => item.bmi),
        bodyFat: data.data.map((item) => item.body_fat_percentage),
        labels: data.data.map((item) =>
          new Date(item.last_update).toLocaleDateString()
        ),
      };
      setChartData(transformedData);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({ ...newRecord, [name]: value });
  };

  const fetchMemberDetails = async () => {
    const token = localStorage.getItem("jwt");
    const response = await fetch(
      `http://localhost:1337/api/member-details?filters[user][id][$eq]=${userId}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setChartData(transformData(data));
  };
  useEffect(() => {
    const fetchMemberDetails = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No valid token found.");
        return;
      }

      const userPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = userPayload.id; // ID přihlášeného uživatele

      try {
        const response = await fetch(
          `http://localhost:1337/api/member-details?filters[user][id][$eq]=${userId}&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const transformedData = {
            weight: data.data.map((item) => item.weight),
            height: data.data.map((item) => item.height),
            bmi: data.data.map((item) => item.bmi),
            bodyFat: data.data.map((item) => item.body_fat_percentage),
            labels: data.data.map((item) =>
              new Date(item.last_update).toLocaleDateString()
            ),
          };
          setChartData(transformedData);
        } else {
          console.error("Failed to fetch member details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching member details:", error);
      }
    };

    fetchMemberDetails();
  }, []);
  const handleAddRecord = async () => {
    const token = localStorage.getItem("jwt");
    const userPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = userPayload.id;

    try {
      // Kontrola, zda uživatel již má záznam
      const checkResponse = await fetch(
        `http://localhost:1337/api/member-details?filters[user][id][$eq]=${userId}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const existingData = await checkResponse.json();

      if (existingData.data.length > 0) {
        console.error("Záznam již existuje pro tohoto uživatele.");
        alert("Záznam pro tohoto uživatele již existuje!");
        return; // Zabrání opakovanému vložení
      }

      const response = await fetch("http://localhost:1337/api/member-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            weight: parseFloat(newRecord.weight),
            height: parseFloat(newRecord.height),
            bmi: parseFloat(newRecord.bmi),
            body_fat_percentage: parseFloat(newRecord.body_fat_percentage),
            last_update: new Date(),
            user: userId,
          },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Záznam byl úspěšně přidán:", result);
      } else {
        const error = await response.json();
        console.error("Chyba při přidávání záznamu:", error);
        console.log("Odesílání dat:", {
          weight: parseFloat(newRecord.weight),
          height: parseFloat(newRecord.height),
          bmi: parseFloat(newRecord.bmi),
          body_fat_percentage: parseFloat(newRecord.body_fat_percentage),
          last_update: new Date(),
          user: userId,
        });
      }
    } catch (error) {
      console.error("Chyba při zpracování požadavku:", error);
    }
  };

  const chartOptions = {
    chart: {
      id: "member-progress",
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
      background: "transparent",
    },
    xaxis: {
      categories: chartData.labels,
      labels: { style: { colors: "#C084FC", fontSize: "14px" } },
    },
    yaxis: { labels: { style: { colors: "#C084FC", fontSize: "14px" } } },
    stroke: { curve: "smooth", width: 3 },
    tooltip: { theme: "dark" },
    colors: ["#A78BFA", "#7C3AED", "#9333EA", "#C084FC"],
    grid: { borderColor: "#6B21A8" },
    legend: { position: "top", labels: { colors: "#C084FC" } },
  };

  const series = [
    { name: "Váha (kg)", data: chartData.weight },
    { name: "Výška (cm)", data: chartData.height },
    { name: "BMI", data: chartData.bmi },
    { name: "Tělesný tuk (%)", data: chartData.bodyFat },
  ];

  if (loading)
    return <p className="text-purple-300 text-center mt-20">Načítání...</p>;
  if (error)
    return (
      <p className="text-red-400 text-center mt-20">Chyba: {error.message}</p>
    );

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Sidebar />
      <header className="py-6 bg-gray-900 shadow-md">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <motion.h1
            className="text-3xl font-semibold text-purple-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ahoj, {username}!
          </motion.h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto py-10 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="col-span-2 bg-gray-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-purple-400 mb-6">
            Tvůj pokrok
          </h2>
          <Chart
            options={chartOptions}
            series={series}
            type="line"
            height="400"
          />
        </div>

        {/* Add Record */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-purple-400 mb-6">
            Přidat Nový Záznam
          </h2>
          <div className="space-y-4">
            {["weight", "height", "bmi", "body_fat_percentage"].map((field) => (
              <input
                key={field}
                name={field}
                type="number"
                placeholder={`Zadejte ${field}`}
                value={newRecord[field]}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            ))}
          </div>
          <button
            onClick={handleAddRecord}
            className="mt-6 w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 px-6 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 transition"
          >
            Přidat Záznam
          </button>
        </div>
      </div>
    </div>
  );
}
