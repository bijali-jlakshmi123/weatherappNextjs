import React from "react";
import moment from "moment";
import {
  FaCloud,
  FaSun,
  FaCloudRain,
  FaSnowflake,
  FaSmog,
} from "react-icons/fa";

const Weather = ({ currentWeather }) => {
  if (!currentWeather) return null;

  const formatDateTime = (timestamp) =>
    moment.unix(timestamp).format("DD/MM/YYYY HH:mm");

  const getWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
      case "clear sky":
        return <FaSun className="text-yellow-400 text-5xl" />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return <FaCloud className="text-gray-400 text-5xl" />;
      case "shower rain":
      case "rain":
        return <FaCloudRain className="text-blue-400 text-5xl" />;
      case "snow":
        return <FaSnowflake className="text-blue-200 text-5xl" />;
      default:
        return <FaSmog className="text-gray-500 text-5xl" />;
    }
  };

  return (
    <div className="bg-gray-900 text-white w-full h-full max-w-6xl mx-auto p-10 rounded-xl">
      {/* CITY */}
      <h2 className="text-[px] font-bold text-center">{currentWeather.name}</h2>

      {/* DATE & TIME */}
      <p className="text-base text-gray-400 text-center mt-2">
        {moment.unix(currentWeather.dt).format("dddd")} •{" "}
        {formatDateTime(currentWeather.dt)}
      </p>

      {/* TEMPERATURE */}
      <div className="text-center my-8">
        <p className="text-7xl font-bold">{currentWeather.main.temp}°C</p>
      </div>

      {/* BOTTOM ROW */}
      <div className="flex justify-between items-center mt-8">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {getWeatherIcon(currentWeather.weather[0].description)}
          <p className="text-xl capitalize">
            {currentWeather.weather[0].description}
          </p>
        </div>

        {/* RIGHT */}
        <div className="text-right text-base text-gray-300 h-full w-full">
          <p>High: {currentWeather.main.temp_max}°C</p>
          <p>Low: {currentWeather.main.temp_min}°C</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
