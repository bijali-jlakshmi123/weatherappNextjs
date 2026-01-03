"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import moment from "moment";

const FiveDaysGraph = ({ forecastData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!forecastData || forecastData.length === 0) return;

    // Destroy old chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Extract unique dates & avg temperature
    const uniqueDates = forecastData.reduce(
      (acc, forecastDay) => {
        const date = moment.unix(forecastDay.dt).format("MMM D");

        if (!acc.dates.includes(date)) {
          acc.dates.push(date);
          acc.avgTemps.push(
            (forecastDay.main.temp_max + forecastDay.main.temp_min) / 2
          );
        }
        return acc;
      },
      { dates: [], avgTemps: [] }
    );

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: uniqueDates.dates,
        datasets: [
          {
            label: "Average Temperature (°C)",
            data: uniqueDates.avgTemps,
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [forecastData]);

  return (
    <div className="bg-gray-900 p-8 rounded-lg h-full">
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast Graph</h2>
      <div className="h-64">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default FiveDaysGraph;
