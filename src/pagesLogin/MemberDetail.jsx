import React, { useState } from "react";
import Chart from "react-apexcharts";

const DashboardCharts = () => {
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

  return (
    <div className="flex flex-row gap-8 bg-s1 p-8 rounded-20">
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
  );
};

export default DashboardCharts;
