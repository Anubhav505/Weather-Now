import React, { useState, useEffect } from "react";
import { WiDaySunny } from "react-icons/wi";
import { weatherIcons } from "./WeatherIcons";
import { useLocation, useNavigate } from "react-router-dom";
import { get7DayForecast } from "../services/weatherService";

const SevenDaysWeather = () => {
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDaily = async (lat, lon) => {
      try {
        // prefer service helper which requests weathercode + timezone
        const data = await get7DayForecast(lat, lon);
        if (!data || !data.daily) {
          setError("No daily data returned from API");
          return;
        }
        setDaily(data.daily);
      } catch (e) {
        console.error(e);
        setError("Failed to fetch daily data");
      } finally {
        setLoading(false);
      }
    };

    // Try to get coords from Link state, then localStorage, then fallback to London
    const state = location.state || {};
    let lat = state.lat;
    let lon = state.lon;

    if (!lat || !lon) {
      try {
        const saved = JSON.parse(localStorage.getItem("lastCoords"));
        if (saved && saved.lat && saved.lon) {
          lat = saved.lat;
          lon = saved.lon;
        }
      } catch {
        // Ignore JSON parse errors and fallback to default coordinates
      }
    }

    if (!lat || !lon) {
      // If no coordinates, navigate back to home to encourage user to search first
      setLoading(false);
      setError("");
      navigate("/", { replace: true });
      return;
    }

    fetchDaily(lat, lon);
  }, [location, navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <p className="text-xl font-semibold text-gray-200 animate-pulse">
          Loading daily forecast...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );

  if (!daily)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <p className="text-xl font-semibold text-gray-200">
          No daily weather data available
        </p>
      </div>
    );

  const { time, temperature_2m_max, temperature_2m_min, weathercode } = daily;

  const getWeatherDescription = (code) => {
    if ([0, 1].includes(code)) return "Clear";
    if ([2, 3].includes(code)) return "Cloudy";
    if ([45, 48].includes(code)) return "Foggy";
    if ([51, 53, 55, 61, 63, 65].includes(code)) return "Rainy";
    if ([71, 73, 75].includes(code)) return "Snowy";
    if ([95, 99].includes(code)) return "Stormy";
    return "Unknown";
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-white drop-shadow-lg">
        7-Day Forecast
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {time.map((t, index) => {
          const date = new Date(t);
          const day = date.toLocaleDateString(undefined, {
            weekday: "short",
            day: "numeric",
            month: "short",
          });
          // weatherIcons entries are objects { day, night } in shared file - use day icon by default
          const iconEntry = weatherIcons[weathercode[index]];
          const icon = iconEntry?.day || <WiDaySunny size={60} />;

          // Dynamic card background based on weather
          const weatherDesc = getWeatherDescription(weathercode[index]);
          const cardBg =
            weatherDesc === "Clear"
              ? "from-yellow-400 to-yellow-200"
              : weatherDesc === "Cloudy"
              ? "from-gray-500 to-gray-700"
              : weatherDesc === "Rainy"
              ? "from-blue-700 to-blue-500"
              : weatherDesc === "Snowy"
              ? "from-white to-gray-300"
              : weatherDesc === "Stormy"
              ? "from-gray-800 to-gray-600"
              : "from-gray-600 to-gray-500";

          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${cardBg} text-white rounded-3xl p-6 flex flex-col items-center shadow-2xl hover:scale-105 transition-transform duration-300 backdrop-blur-md`}
            >
              <p className="font-semibold text-lg md:text-xl">{day}</p>
              <div className="my-3">{icon}</div>
              <p className="text-lg md:text-2xl font-bold">
                {temperature_2m_max[index]}°C / {temperature_2m_min[index]}°C
              </p>
              <p className="mt-2 text-sm md:text-base opacity-90">
                {weatherDesc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SevenDaysWeather;
