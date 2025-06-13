import React from 'react';

const IntegrationsWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4 items-center">
      <div className="flex items-center gap-2 w-full">
        <img src="https://img.icons8.com/color/48/spotify--v1.png" alt="Spotify" className="w-8 h-8" />
        <div className="flex-1">
          <div className="font-semibold">Connect your Spotify account</div>
          <div className="text-xs text-gray-500">Empower yourself with habit tracking while enjoying uninterrupted music</div>
        </div>
      </div>
      <button className="bg-black text-white rounded-lg px-4 py-2 w-full font-semibold">Link Account</button>
      <button className="bg-red-100 text-red-700 rounded-lg px-4 py-2 w-full font-semibold mt-2">More Integrations<br /><span className="text-xs">23+ apps</span></button>
    </div>
  );
};

export default IntegrationsWidget; 