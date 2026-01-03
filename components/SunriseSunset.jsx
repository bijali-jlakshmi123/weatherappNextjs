import React from "react";
import moment from "moment";
const SunriseSunset = ({ sunrise, sunset }) => {
  return (
    <div className="bg-gray-900 p-8 rounded-lg mb-3">
      <h2 className="text-2xl font-bold mb-4">Sunrise & Sunset</h2>
      <div className="flex items-center justify-center">
        <p className="text-lg mb-2">
          Sunrise: {moment.unix(sunrise).format("HH:mm")}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-lg">Sunset: {moment.unix(sunset).format("HH:mm")}</p>
      </div>
    </div>
  );
};
export default SunriseSunset;
