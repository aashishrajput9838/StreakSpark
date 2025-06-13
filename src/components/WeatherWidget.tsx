import { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  };
}

const WeatherWidget = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '6f922779b4f44e3c954192454251306';
  const API_URL = 'https://api.weatherapi.com/v1';

  const fetchWeather = async (searchLocation: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_URL}/current.json`, {
        params: {
          key: API_KEY,
          q: searchLocation,
          aqi: 'no'
        }
      });
      setWeather(response.data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeather(location);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Weather Forecast</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-2">
          {error}
        </div>
      )}

      {weather && !loading && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold">{weather.location.name}</h3>
              <p className="text-gray-600">{weather.location.country}</p>
            </div>
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
              className="w-16 h-16"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg shadow">
              <p className="text-gray-600">Temperature</p>
              <p className="text-2xl font-bold">{weather.current.temp_c}°C</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <p className="text-gray-600">Condition</p>
              <p className="text-lg font-semibold">{weather.current.condition.text}</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <p className="text-gray-600">Humidity</p>
              <p className="text-2xl font-bold">{weather.current.humidity}%</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <p className="text-gray-600">Wind Speed</p>
              <p className="text-2xl font-bold">{weather.current.wind_kph} km/h</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget; 