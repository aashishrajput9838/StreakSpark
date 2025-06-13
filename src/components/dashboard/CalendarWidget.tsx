import React from 'react';

const CalendarWidget: React.FC = () => {
  // Mock calendar days
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = 30;

  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
      <div className="font-semibold mb-2">December, 2023</div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {days.map(day => (
          <div
            key={day}
            className={`rounded-full w-7 h-7 flex items-center justify-center ${day === today ? 'bg-orange-200 text-orange-900 font-bold' : 'hover:bg-gray-100'} cursor-pointer`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="text-green-600 text-xs mt-2 font-semibold">+3.2% from last month</div>
    </div>
  );
};

export default CalendarWidget; 