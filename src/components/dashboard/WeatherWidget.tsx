import React, { useState, useEffect } from 'react';

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = '6f922779b4f44e3c954192454251306'; // Updated API Key
  const API_URL = 'https://api.weatherapi.com/v1'; // WeatherAPI.com URL

  const fetchWeather = async (query: string) => { // Modified to accept a query string (city name or lat,lon)
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URL}/current.json?key=${API_KEY}&q=${query}&aqi=no`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWeather(data);
    } catch (err: any) {
      console.error("Failed to fetch weather:", err);
      setError("Failed to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Use lat,lon for query
          fetchWeather(`${position.coords.latitude},${position.coords.longitude}`);
        },
        (err) => {
          console.warn(`Geolocation error(${err.code}): ${err.message}`);
          fetchWeather('Delhi'); // Fallback to Delhi
        }
      );
    } else {
      fetchWeather('Delhi'); // Fallback to Delhi if geolocation is not supported
    }
  }, []);

  const getWeatherIcon = (weatherCode: number) => {
    // A simplified mapping for demonstration based on OpenWeatherMap common codes
    // You might want to expand this for more specific icons
    if (weatherCode >= 200 && weatherCode < 600) return '🌧️'; // Rain, Thunderstorm, Drizzle
    if (weatherCode >= 600 && weatherCode < 700) return '❄️'; // Snow
    if (weatherCode >= 700 && weatherCode < 800) return '🌫️'; // Atmosphere (Mist, Smoke, Haze, Dust, Fog, Sand, Ash, Squall, Tornado)
    if (weatherCode === 800) return '☀️'; // Clear sky
    if (weatherCode > 800) return '☁️'; // Clouds
    return '❓'; // Default unknown
  };

  if (loading) {
    return (
      <div className="bg-yellow-50 rounded-xl p-6 shadow flex flex-col gap-2 items-center">
        Loading weather...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-yellow-50 rounded-xl p-6 shadow flex flex-col gap-2 items-center text-red-500">
        {error}
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-yellow-50 rounded-xl p-6 shadow flex flex-col gap-2 items-center">
        Weather data not available.
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 rounded-xl p-6 shadow flex flex-col gap-2 items-center">
      <div className="text-xl font-semibold text-gray-800 mb-2">{weather.location.name}</div>
      <div className="flex items-center gap-2">
        <img src={weather.current.condition.icon} alt={weather.current.condition.text} className="w-10 h-10" />
        <span className="text-3xl font-bold">{Math.round(weather.current.temp_c)}°C</span>
      </div>
      <div className="text-lg font-semibold text-gray-800">{weather.current.condition.text}</div>
      <div className="flex gap-4 text-xs text-gray-600 mt-2">
        <span>Wind {weather.current.wind_kph.toFixed(1)} km/h</span>
        <span>Humidity {weather.current.humidity}%</span>
      </div>
      {/* Conditionally render umbrella if it's raining/drizzling/thunderstorm - based on WeatherAPI condition text */}
      {(weather.current.condition.text.toLowerCase().includes('rain') ||
        weather.current.condition.text.toLowerCase().includes('drizzle') ||
        weather.current.condition.text.toLowerCase().includes('thunder')) && (
        <img src="https://img.icons8.com/color/96/000000/umbrella.png" alt="umbrella" className="w-20 mx-auto mt-2" />
      )}
    </div>
  );
};

export default WeatherWidget; 