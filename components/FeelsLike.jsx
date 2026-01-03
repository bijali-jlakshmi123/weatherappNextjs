import React from "react";

const FeelsLike = ({ actualTemperature, feelsLikeTemperature }) => {
  const temperatureDifference = feelsLikeTemperature - actualTemperature;

  let description = "";
  if (temperatureDifference < 0) {
    description = "Feels colder than actual temperature";
  } else if (temperatureDifference > 0) {
    description = "Feels warmer than actual temperature";
  } else {
    description = "Feels like actual temperature";
  }

  return (
    <div className="bg-gray-900 p-8 rounded-lg mb-3">
      <h2 className="text-2xl font-bold mb-4">Feels Like</h2>
      <div className="flex items-center justify-center">
        <p className="text-xl mb-2 font-bold">{feelsLikeTemperature}°C</p>
      </div>
      <p className="text-md">{description}</p>
    </div>
  );
};

export default FeelsLike;
