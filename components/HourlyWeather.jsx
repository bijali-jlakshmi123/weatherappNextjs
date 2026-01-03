"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import moment from "moment";

const HourlyWeather = ({ hourlyTemperatureData }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!hourlyTemperatureData.length) return;

    if (chartRef.current) chartRef.current.destroy();

    const labels = hourlyTemperatureData
      .slice(0, 8)
      .map((item) => moment.unix(item.time).format("h A"));
    const data = hourlyTemperatureData
      .slice(0, 8)
      .map((item) => item.temperature);

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data,
            borderColor: "#5eead4",
            backgroundColor: "rgba(94,234,212,0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [hourlyTemperatureData]);

  return (
    <div className="bg-gray-900 p-6 rounded-lg h-[80vh] w-full">
      <h2 className="text-xl font-bold mb-4 text-center text-white">
        Hourly Weather
      </h2>
      <div className="h-full w-full text-white">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default HourlyWeather;
