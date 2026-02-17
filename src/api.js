import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'df89ac043a6461546b1a8f6dfd65cc42';
const BASE_URL = 'https://api.weatherstack.com';

// Weatherstack units: m = metric, f = Fahrenheit
function toWeatherstackUnit(unit) {
  return unit === 'metric' ? 'm' : 'f';
}

/**
 * Current Weather - Available on all plans
 * https://api.weatherstack.com/current?access_key=...&query=Bangalore
 */
const axiosConfig = { validateStatus: () => true };

function handleResponse(res) {
  const data = res.data;
  if (data?.error) {
    throw new Error(data.error.info || data.error.type || 'API error');
  }
  return data;
}

export async function fetchCurrentWeather(query, units = 'metric') {
  const res = await axios.get(`${BASE_URL}/current`, {
    ...axiosConfig,
    params: {
      access_key: API_KEY,
      query,
      units: toWeatherstackUnit(units),
    },
  });
  return handleResponse(res);
}


