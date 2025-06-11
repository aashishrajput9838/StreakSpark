import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to StreakSpark</h1>
      <p className="text-lg mb-4">
        StreakSpark is your personal habit tracker designed to help you build and maintain positive habits. 
        Track your progress, set goals, and stay motivated with our intuitive interface.
      </p>
      <p className="text-lg">
        Get started today and transform your habits into lasting changes!
      </p>
    </div>
  );
};

export default HomePage; 