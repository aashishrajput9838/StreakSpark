import React from 'react';

const AnalyticsWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">😎</span>
        <span className="font-semibold">Positive Habits</span>
        <span className="ml-auto text-green-600 font-bold">+58.2%</span>
      </div>
      <div className="bg-gray-100 rounded-lg p-4 text-center mt-2">
        <div className="font-semibold mb-1">Habits Wrapped 2023</div>
        <button className="bg-black text-white rounded-lg px-4 py-2 font-semibold">View</button>
      </div>
      <div className="mt-4">
        <div className="font-semibold mb-2">Favorite Habits</div>
        <div className="flex gap-2 items-end h-24">
          {/* Mock bar chart */}
          <div className="bg-orange-200 w-6 h-16 rounded-t-lg flex items-end justify-center"><span className="text-xs">Tennis</span></div>
          <div className="bg-gray-200 w-6 h-10 rounded-t-lg flex items-end justify-center"><span className="text-xs">Study</span></div>
          <div className="bg-gray-200 w-6 h-8 rounded-t-lg flex items-end justify-center"><span className="text-xs">Reading</span></div>
          <div className="bg-gray-200 w-6 h-6 rounded-t-lg flex items-end justify-center"><span className="text-xs">Gym</span></div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget; 