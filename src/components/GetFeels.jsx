export const getFeels = (temperature, weathercode) => {
    const feels = [];
    if (temperature >= 40) feels.push("Scorching 🔥");
    else if (temperature >= 35) feels.push("Too hot 🔥");
    else if (temperature >= 30) feels.push("Hot ☀️");
    else if (temperature >= 25) feels.push("Warm 🌤️");
    else if (temperature >= 20) feels.push("Mild 😊");
    else if (temperature >= 15) feels.push("Cool 🍃");
    else if (temperature >= 5) feels.push("Cold ❄️");
    else feels.push("Freezing ❄️");

    if ([51, 53, 55, 61, 63, 65].includes(weathercode)) feels.push("Humid 💧");
    if ([45, 48].includes(weathercode)) feels.push("Foggy 🌫️");
    if ([95, 99].includes(weathercode)) feels.push("Stormy ⚡");
    if ([71, 73, 75].includes(weathercode)) feels.push("Damp ❄️");
    if ([2, 3].includes(weathercode)) feels.push("Cloudy ☁️");
    if ([0, 1].includes(weathercode) && temperature >= 30) feels.push("Sticky 🥵");
    return feels;
};