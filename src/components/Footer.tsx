import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="text-xl font-bold mb-4">StreakSpark</div>
        <div className="text-sm">© 2023 StreakSpark. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer; 