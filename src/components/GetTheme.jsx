export const getTheme = (code, isDay) => {
    if ([0, 1].includes(code)) return { bg: isDay ? "bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500" : "bg-gradient-to-br from-gray-700 via-gray-900 to-black", text: isDay ? "text-yellow-900" : "text-gray-200" };
    if ([2, 3].includes(code)) return { bg: isDay ? "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600" : "bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800", text: isDay ? "text-gray-900" : "text-gray-200" };
    if ([45, 48].includes(code)) return { bg: isDay ? "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-500" : "bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700", text: isDay ? "text-gray-800" : "text-gray-200" };
    if ([51, 53, 55, 61, 63, 65].includes(code)) return { bg: isDay ? "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700" : "bg-gradient-to-br from-blue-900 via-indigo-900 to-gray-800", text: isDay ? "text-blue-100" : "text-gray-200" };
    if ([71, 73, 75].includes(code)) return { bg: isDay ? "bg-gradient-to-br from-blue-100 via-gray-200 to-gray-300" : "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900", text: isDay ? "text-gray-800" : "text-gray-200" };
    if ([95, 99].includes(code)) return { bg: isDay ? "bg-gradient-to-br from-purple-600 via-indigo-700 to-gray-800" : "bg-gradient-to-br from-gray-800 via-gray-900 to-black", text: isDay ? "text-white" : "text-gray-200" };
    return { bg: isDay ? "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600" : "bg-gradient-to-br from-gray-800 via-gray-900 to-black", text: "text-white" };
};