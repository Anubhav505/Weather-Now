import { 
  WiDaySunny, WiNightClear, WiCloud, WiNightAltCloudy, 
  WiRain, WiSnow, WiThunderstorm, WiFog 
} from "react-icons/wi";

export const weatherIcons = {
    0: { day: <WiDaySunny size={60} />, night: <WiNightClear size={60} /> },
    1: { day: <WiDaySunny size={60} />, night: <WiNightClear size={60} /> },
    2: { day: <WiCloud size={60} />, night: <WiNightAltCloudy size={60} /> },
    3: { day: <WiCloud size={60} />, night: <WiNightAltCloudy size={60} /> },
    45: { day: <WiFog size={60} />, night: <WiFog size={60} /> },
    48: { day: <WiFog size={60} />, night: <WiFog size={60} /> },
    51: { day: <WiRain size={60} />, night: <WiRain size={60} /> },
    53: { day: <WiRain size={60} />, night: <WiRain size={60} /> },
    55: { day: <WiRain size={60} />, night: <WiRain size={60} /> },
    61: { day: <WiRain size={60} />, night: <WiRain size={60} /> },
    63: { day: <WiRain size={60} />, night: <WiRain size={60} /> },
    65: { day: <WiRain size={60} />, night: <WiRain size={60} /> },
    71: { day: <WiSnow size={60} />, night: <WiSnow size={60} /> },
    73: { day: <WiSnow size={60} />, night: <WiSnow size={60} /> },
    75: { day: <WiSnow size={60} />, night: <WiSnow size={60} /> },
    95: { day: <WiThunderstorm size={60} />, night: <WiThunderstorm size={60} /> },
    99: { day: <WiThunderstorm size={60} />, night: <WiThunderstorm size={60} /> },
};
