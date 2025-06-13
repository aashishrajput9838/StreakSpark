import React from 'react';

const WeatherWidget: React.FC = () => {
  return (
    <div className="bg-yellow-50 rounded-xl p-6 shadow flex flex-col gap-2 items-center">
      <div className="flex items-center gap-2">
        <span className="text-4xl">☀️</span>
        <span className="text-3xl font-bold">12°C</span>
      </div>
      <div className="flex gap-4 text-xs text-gray-600 mt-2">
        <span>Wind 2-4 km/h</span>
        <span>Pressure 1021m</span>
        <span>Humidity 42%</span>
      </div>
      <img src="https://img.icons8.com/color/96/000000/umbrella.png" alt="umbrella" className="w-20 mx-auto mt-2" />
    </div>
  );
};

export default WeatherWidget; 