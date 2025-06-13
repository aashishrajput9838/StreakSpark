import React from 'react';

const SyncAppWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center gap-4">
      <span className="text-5xl">🧑‍💻</span>
      <div className="font-semibold text-center">Sync anywhere with Hebats Mobile App</div>
      <div className="text-xs text-gray-500 text-center">Download now, sync later!</div>
      <button className="bg-yellow-200 hover:bg-yellow-300 text-yellow-900 font-semibold rounded-lg px-4 py-2 w-full transition">Download App</button>
    </div>
  );
};

export default SyncAppWidget; 