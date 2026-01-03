"use client";

import { useState } from "react";
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
  const [country, setCountry] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [city, setCity] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyTemperatureData, setHourlyTemperatureData] = useState([]);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    if (!currentCity) {
      setError("Please enter a city");
      return;
    }
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const weatherRes = await axios.get(
        `${baseUrl}/weather?q=${currentCity?.name}&appid=${apiKey}&units=metric`
      );
      const forecastRes = await axios.get(
        `${baseUrl}/forecast?q=${currentCity?.name}&appid=${apiKey}&units=metric`
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

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <h1 className="text-4xl font-bold text-center mb-8">WEATHER DASHBOARD</h1>

      {/* Search */}
      <div className="flex justify-center gap-4 mb-8">
        {/* <input
          className="p-3 bg-gray-700 rounded outline-none"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
         */}
        <CountrySelect
          onChange={(_country) => setCountry(_country)}
          defaultValue={country}
          placeHolder="Select Country"
        />

        <StateSelect
          countryid={country?.id}
          onChange={(_state) => setCurrentState(_state)}
          defaultValue={currentState}
          placeHolder="Select State"
        />

        <CitySelect
          countryid={country?.id}
          stateid={currentState?.id}
          onChange={(_city) => setCurrentCity(_city)}
          defaultValue={currentCity}
          placeHolder="Select City"
        />

        <button
          onClick={fetchWeatherData}
          className="px-6 bg-blue-600 text-white rounded"
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
