import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";
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

  const fetchMemberDetails = async () => {
    const token = localStorage.getItem("jwt");
    const userPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = userPayload.id;

    const response = await fetch(
      `http://localhost:1337/api/member-details?filters[user][id][$eq]=${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
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
    }
  };

  useEffect(() => {
    fetchMemberDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({ ...newRecord, [name]: value });
  };

  const handleAddRecord = async () => {
    const token = localStorage.getItem("jwt");
    const userPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = userPayload.id;

    try {
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
        fetchMemberDetails();
        setNewRecord({
          weight: "",
          height: "",
          bmi: "",
          body_fat_percentage: "",
        });
      } else {
        const error = await response.json();
        alert(error.error?.message || "Chyba při přidávání záznamu.");
      }
    } catch (error) {
      console.error("Chyba při přidávání záznamu:", error);
    }
  };

  const chartOptions = {
    chart: {
      id: "member-progress",
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200">
      <Sidebar />
      <header className="py-6 bg-gray-800 shadow-md">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <motion.h1
            className="text-3xl font-semibold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Tvá osobní karta!
          </motion.h1>
        </div>
      </header>

      <div className="container mx-auto py-10 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2 bg-gray-900 rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Sleduj svůj vývoj
          </h2>
          <Chart
            options={chartOptions}
            series={series}
            type="line"
            height="400"
          />
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-white mb-6">Přidat:</h2>
          <div className="space-y-4">
            <input
              name="weight"
              type="number"
              placeholder="Zadejte váhu (kg)"
              value={newRecord.weight}
              onChange={handleInputChange}
              className="w-full p-4 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <input
              name="height"
              type="number"
              placeholder="Zadejte výšku (cm)"
              value={newRecord.height}
              onChange={handleInputChange}
              className="w-full p-4 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <input
              name="bmi"
              type="number"
              placeholder="Zadejte BMI"
              value={newRecord.bmi}
              onChange={handleInputChange}
              className="w-full p-4 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <input
              name="body_fat_percentage"
              type="number"
              placeholder="Zadejte Tělesný tuk (%)"
              value={newRecord.body_fat_percentage}
              onChange={handleInputChange}
              className="w-full p-4 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={handleAddRecord}
            className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 transition"
          >
            Přidat Záznam
          </button>
        </div>
      </div>
    </div>
  );
}
