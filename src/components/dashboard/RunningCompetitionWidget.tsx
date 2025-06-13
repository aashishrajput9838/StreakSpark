import React from 'react';

const RunningCompetitionWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
      <div className="font-semibold mb-2">Running Competition</div>
      <div className="flex items-center gap-2 text-sm">
        <span>31 Dec</span>
        <span>•</span>
        <span>20 miles</span>
        <span>•</span>
        <span>09:00</span>
      </div>
      <img src="https://img.icons8.com/color/96/000000/map.png" alt="map" className="w-full rounded-lg mt-2" />
      <button className="bg-orange-200 hover:bg-orange-300 text-orange-900 font-semibold rounded-lg px-4 py-2 w-full transition mt-2">Join Event</button>
    </div>
  );
};

export default RunningCompetitionWidget; 