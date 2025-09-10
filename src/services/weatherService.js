export const getWeather = async (lat, lon) => {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data = await res.json();
    return data;
};

export const getHourlyForecast = async (lat, lon) => {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode`);
    const data = await res.json();
    return data;
};


export const get7DayForecast = async (lat, lon) => {
    // request weathercode and timezone (timezone=auto helps date parsing on client)
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,windspeed_10m_max&timezone=auto`);
    const data = await res.json();
    return data;
};

