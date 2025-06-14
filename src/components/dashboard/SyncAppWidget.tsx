import React from 'react';

const SyncAppWidget: React.FC = () => {
  return (
    <div className="bg-appPalette-dark-card rounded-xl p-6 shadow flex flex-col items-center gap-4 text-appPalette-dark-text">
      <span className="text-5xl">🧑‍💻</span>
      <div className="font-semibold text-center">Sync anywhere with Hebats Mobile App</div>
      <div className="text-xs text-appPalette-dark-muted text-center">Download now, sync later!</div>
      <button className="bg-appPalette-orange hover:bg-appPalette-pink text-white font-semibold rounded-lg px-4 py-2 w-full transition">Download App</button>
    </div>
  );
};

export default SyncAppWidget; 