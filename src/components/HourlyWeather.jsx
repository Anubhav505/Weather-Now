import { weatherDescriptions } from "./WeatherDescriptions"; // use the shared file

const HourlyWeather = ({ hourly }) => {
    if (!hourly) return null;
    const { time, temperature_2m, weathercode } = hourly;

    return (
        <div>
            {/* Responsive grid for hourly forecast */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {time.map((t, index) => {
                    const hour = new Date(t).getHours();
                    const temp = temperature_2m[index];
                    const code = weathercode[index];
                    const desc = weatherDescriptions[code] || { emoji: "🌈", text: "Unknown" };

                    return (
                        <div
                            key={index}
                            className="bg-white/30 backdrop-blur-md rounded-xl p-4 flex flex-col items-center hover:scale-105 transition transform"
                        >
                            <p className="text-lg font-semibold">{hour}:00</p>
                            <p className="text-xl">{temp}°C</p>
                            <p className="text-2xl">{desc.emoji}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HourlyWeather;
