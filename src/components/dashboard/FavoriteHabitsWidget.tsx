import React from 'react';

const FavoriteHabitsWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
      <div className="font-semibold mb-2">Favorite Habits</div>
      <div className="flex gap-2 items-end h-24">
        {/* Mock bar chart */}
        <div className="bg-orange-200 w-6 h-16 rounded-t-lg flex items-end justify-center"><span className="text-xs">Tennis</span></div>
        <div className="bg-gray-200 w-6 h-10 rounded-t-lg flex items-end justify-center"><span className="text-xs">Study</span></div>
        <div className="bg-gray-200 w-6 h-8 rounded-t-lg flex items-end justify-center"><span className="text-xs">Reading</span></div>
        <div className="bg-gray-200 w-6 h-6 rounded-t-lg flex items-end justify-center"><span className="text-xs">Gym</span></div>
      </div>
    </div>
  );
};

export default FavoriteHabitsWidget; 