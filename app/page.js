"use client";

import { useEffect, useState } from "react";
import {
  Weather,
  SunriseSunset,
  WindSpeed,
  HourlyWeather,
  FeelsLike,
  HumidityInfo,
  VisibiltyInfo,
  FiveDaysGraph,
  PressureInfo,
  RainInfo,
} from "../components";
import axios from "axios";

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function Home() {
  const [location, setLocation] = useState({
    country: "",
    state: "",
    city: "",
  });

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyTemperatureData, setHourlyTemperatureData] = useState([]);
  const [error, setError] = useState(null);

  const [isbuttonClicked, setIsbuttonClicked] = useState(false);

  const clearData = () => {
    setCurrentWeather(null);
    setForecastData(null);
    setHourlyTemperatureData([]);
    setError(null);
  };

  const handleSubmit = (e) => {
    fetchWeatherData();

    setLocation({
      country: "",
      state: "",
      city: "",
    });
    setIsbuttonClicked(true);
  };

  const fetchWeatherData = async () => {
    if (!location.city) {
      setError("Please enter a city");
      return;
    }
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const weatherRes = await axios.get(
        `${baseUrl}/weather?q=${location.city?.name}&appid=${apiKey}&units=metric`
      );
      const forecastRes = await axios.get(
        `${baseUrl}/forecast?q=${location.city?.name}&appid=${apiKey}&units=metric`
      );

      if (!weatherRes.data || !forecastRes.data) {
        setError("Invalid city name");
        return;
      }

      const weatherData = await weatherRes.data;
      const forecastResult = await forecastRes.data;

      setCurrentWeather(weatherData);
      setForecastData(forecastResult);

      const hourly = forecastResult.list.map((item) => ({
        time: item.dt,
        temperature: item.main.temp,
      }));

      setHourlyTemperatureData(hourly);
      setError("");
    } catch {
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    clearData();
  }, [location.city || location.state || location.country || isbuttonClicked]);

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <h1 className="text-4xl font-bold text-center mb-8">WEATHER DASHBOARD</h1>

      {/* Search */}
      <div className="flex justify-center gap-4 mb-8">
        <CountrySelect
          onChange={(country) => setLocation({ ...location, country })}
          value={location.country}
          placeHolder="Select Country"
        />

        <StateSelect
          countryid={location.country?.id}
          onChange={(state) => setLocation({ ...location, state })}
          value={location.state}
          placeHolder="Select State"
        />

        <CitySelect
          countryid={location.country?.id}
          stateid={location.state?.id}
          onChange={(_city) => setLocation({ ...location, city: _city })}
          value={location.city}
          placeHolder="Select City"
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="px-6 bg-gray-900 text-white rounded"
        >
          Search
        </button>
      </div>

      {error && <p className="text-center text-red-400 mb-6">{error}</p>}

      {currentWeather && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ROW 1 LEFT */}
          <div className="lg:col-span-2">
            <Weather currentWeather={currentWeather} />
          </div>

          {/* ROW 1 RIGHT */}
          <div className="flex flex-col gap-6">
            <SunriseSunset
              sunrise={currentWeather.sys.sunrise}
              sunset={currentWeather.sys.sunset}
            />
            <WindSpeed windSpeed={currentWeather.wind.speed} />
          </div>

          {/* ROW 2 LEFT */}
          <div className="lg:col-span-2">
            <HourlyWeather hourlyTemperatureData={hourlyTemperatureData} />
          </div>

          {/* ROW 2 RIGHT */}
          <div className="flex flex-col gap-6">
            <FeelsLike
              actualTemperature={currentWeather.main.temp}
              feelsLikeTemperature={currentWeather.main.feels_like}
            />
            <HumidityInfo humidity={currentWeather.main.humidity} />
            <VisibiltyInfo visibilty={currentWeather.visibility} />
          </div>

          {/* ROW 3 */}
          {forecastData?.list && (
            <>
              <div className="lg:col-span-2">
                <FiveDaysGraph forecastData={forecastData.list} />
              </div>

              <div className="lg:col-span-1">
                <PressureInfo pressure={currentWeather.main.pressure} />
                <RainInfo rainVolume={currentWeather.rain?.rainVolume} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
