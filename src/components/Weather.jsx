import { useState } from "react";
import { getWeather, getHourlyForecast } from "../services/weatherService";
import {
    WiDaySunny,
} from "react-icons/wi";
import { Link } from "react-router-dom";
import { weatherDescriptions } from "./WeatherDescriptions";
import { weatherIcons } from "./WeatherIcons";
import { getTheme } from "./GetTheme";
import { getFeels } from "./GetFeels";

const Weather = ({ setAppTheme }) => {
    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState(null);
    const [hourly, setHourly] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchWeather = async () => {
    setError("");
    setWeather(null);
    setHourly(null);
    setLoading(true);
    try {
        // Open-Meteo geocoding
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`);
        const geoData = await geoRes.json();
        if (!geoData.results || !geoData.results.length) {
            setError("Location not found");
            setLoading(false);
            return;
        }

        const { latitude: lat, longitude: lon } = geoData.results[0];

        // Current weather
        const data = await getWeather(lat, lon);
        setWeather(data.current_weather);

        // persist coords for 7-day view
        try {
            localStorage.setItem("lastCoords", JSON.stringify({ lat, lon }));
        } catch {
            // Ignore localStorage errors
        }

        // Hourly forecast for next 24 hours
        const hourlyData = await getHourlyForecast(lat, lon);
        if (!hourlyData.hourly || !hourlyData.hourly.time) {
            setHourly(null);
        } else {
            const now = new Date();
            const next24 = now.getTime() + 24 * 60 * 60 * 1000;
            const indices = hourlyData.hourly.time.map((t, idx) => {
                const d = new Date(t);
                return (d >= now && d.getTime() <= next24) ? idx : -1;
            }).filter(i => i !== -1);
            setHourly({
                time: indices.map(i => hourlyData.hourly.time[i]),
                temperature_2m: indices.map(i => hourlyData.hourly.temperature_2m[i]),
                weathercode: indices.map(i => hourlyData.hourly.weathercode?.[i] ?? 0)
            });
        }

        const isDay = data.current_weather.is_day === 1;
        const theme = getTheme(data.current_weather.weathercode, isDay);
        setAppTheme(theme.bg);

    } catch {
        setError("Something went wrong");
    } finally {
        setLoading(false);
    }
};


    const renderHourly = () => {
        if (!hourly) return null;
        return (
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full border border-gray-200 rounded-xl text-center">
                    <thead className="bg-gray-100">
                        <tr>
                            {hourly.time.map((time, idx) => (
                                <th key={idx} className="px-2 py-1 text-xs whitespace-nowrap">
                                    {new Date(time).getHours()}:00
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {hourly.temperature_2m.map((temp, idx) => (
                                <td key={idx} className="px-2 py-1 whitespace-nowrap">{temp}°C</td>
                            ))}
                        </tr>
                        <tr>
                            {hourly.weathercode.map((code, idx) => {
                                const desc = weatherDescriptions[code] || { emoji: "🌈" };
                                return <td key={idx} className="px-2 py-1 whitespace-nowrap">{desc.emoji}</td>;
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    const renderWeather = () => {
        if (!weather) return null;
        const isDay = weather.is_day === 1;
        const theme = getTheme(weather.weathercode, isDay);
        const desc = weatherDescriptions[weather.weathercode] || { emoji: "🌈", text: "Unknown weather" };
        const feels = getFeels(weather.temperature, weather.weathercode);

        return (
            <div>
                <div className={`${theme.bg} rounded-xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 w-full`}>
                    <div className="flex flex-col items-center text-center">
                        {/* New line for current location and time */}
                        <p className="text-sm text-white">Location: {location || 'Unknown'} - Current Time: {new Date().toLocaleTimeString()}</p>

                        {weatherIcons[weather.weathercode] ? (isDay ? weatherIcons[weather.weathercode].day : weatherIcons[weather.weathercode].night) : <WiDaySunny size={80} />}
                        <h2 className={`text-4xl font-bold mt-4 ${theme.text}`}>{weather.temperature}°C</h2>
                        <p className={`mt-2 text-lg ${theme.text}`}>{desc.emoji} {desc.text}</p>
                        <p className={`mt-2 text-sm ${theme.text}`}>{feels.join(" • ")}</p>
                        <p className={`mt-1 text-sm ${theme.text}`}>Wind: {weather.windspeed} km/h | Direction: {weather.winddirection}°</p>
                    </div>

                    {/* Hourly table */}
                </div>
                {renderHourly()}
            </div>
        );
    };

    return (
        <div className="w-full max-w-4xl space-y-6">
            <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-xl p-6 space-y-6">
                <h1 className="text-3xl font-semibold text-center text-gray-800">Weather Now</h1>
                {weather && (
                    <div className="flex justify-center mb-4">
                        <Link to="/7days" state={{ lat: JSON.parse(localStorage.getItem("lastCoords"))?.lat, lon: JSON.parse(localStorage.getItem("lastCoords"))?.lon }} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-lg shadow hover:scale-105 transition transform">
                            Forecast 7 Days
                        </Link>
                    </div>
                )}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !loading && location.trim()) {
                                fetchWeather();
                            }
                        }}
                        placeholder="Enter location"
                        className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                    <button
                        onClick={fetchWeather}
                        className="px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                        disabled={loading || !location.trim()}
                    >
                        {loading ? "Loading..." : "Get"}
                    </button>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {renderWeather()}
            </div>
        </div>
    );
};

export default Weather;
