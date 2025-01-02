import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";

export default function MemberDetail() {
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

  const handleAddRecord = async () => {
    const token = localStorage.getItem("jwt");
    const userPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = userPayload.id;

    const payload = {
      data: {
        weight: parseFloat(newRecord.weight),
        height: parseFloat(newRecord.height),
        bmi: parseFloat(newRecord.bmi),
        body_fat_percentage: parseFloat(newRecord.body_fat_percentage),
        last_update: new Date(),
        user: userId,
      },
    };

    console.log("Odesílání dat:", payload); // Přidá logování

    const response = await fetch("http://localhost:1337/api/member-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Úspěšně přidáno:", result);
    } else {
      const error = await response.json();
      console.error("Chyba při přidávání:", error);
    }
  };

  const chartOptions = {
    chart: { id: "member-progress" },
    xaxis: { categories: chartData.labels },
    stroke: { curve: "smooth" },
    tooltip: { theme: "dark" },
    colors: ["#f39c12", "#3498db", "#2ecc71", "#e74c3c"],
  };

  const series = [
    { name: "Váha", data: chartData.weight },
    { name: "Výška", data: chartData.height },
    { name: "BMI", data: chartData.bmi },
    { name: "Tělesný tuk (%)", data: chartData.bodyFat },
  ];

  if (loading)
    return <p className="text-gray-500 text-center mt-20">Načítání...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-20">Chyba: {error.message}</p>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Pokroky člena
      </motion.h1>

      <div className="mb-8">
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          height="350"
        />
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Přidat nový záznam</h2>
        <div className="grid grid-cols-2 gap-4">
          {["weight", "height", "bmi", "body_fat_percentage"].map((field) => (
            <input
              key={field}
              name={field}
              type="number"
              step="0.1"
              placeholder={`Zadejte ${field}`}
              value={newRecord[field]}
              onChange={handleInputChange}
              className="p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          ))}
        </div>
        <button
          onClick={handleAddRecord}
          className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-400"
        >
          Přidat záznam
        </button>
      </div>
    </div>
  );
}
