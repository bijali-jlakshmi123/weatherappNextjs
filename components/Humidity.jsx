import React from "react";
const HumidityInfo = ({ humidity }) => {
  //determine desc based on humidity levels
  let humidityDescription = "";
  if (humidity < 30) {
    humidityDescription = "Low humidity. Consider staying hydrated.";
  } else if (humidity < 70) {
    humidityDescription = "High humidity. Be prepared for moistured";
  } else {
    humidityDescription = "Normal humidity levels.";
  }
  return (
    <div className="bg-gray-900 p-8 rounded-lg mb-3">
      <h2 className="text-2xl font-bold mb-4">Humidity</h2>
      <div className="flex items-center justify-center">
        <p className="text-xl mb-2 font-bold">{humidity}%</p>
      </div>
      <p className="text-md">{humidityDescription}</p>
    </div>
  );
};
export default HumidityInfo;
