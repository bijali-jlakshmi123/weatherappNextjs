import React from "react";
import { FaTachometerAlt } from "react-icons/fa";

const PressureInfo = ({ pressure }) => {
  const getDescription = () => {
    4;
    if (pressure < 1000) {
      return "Low pressure. Expect stormy weather";
    } else if (pressure > 1000 && pressure < 1020) {
      return "Normal pressure. Typical weather conditions.";
    } else {
      return "High pressure. Expect clear skies and calm weather.";
    }
  };
  return (
    <div className="bg-gray-900 p-8 rounded-lg mb-3">
      <h2 className="text-2xl font-bold mb-4 text-white">Pressure</h2>
      <div className="flex items-center justify-center text-white">
        <FaTachometerAlt className="mr-2" />
        <p className="text-lg font-semibold text-white">
          Current Pressure:{pressure} hPa{" "}
        </p>
      </div>
      <p className="text-md text-white">{getDescription()}</p>
    </div>
  );
};

export default PressureInfo;
