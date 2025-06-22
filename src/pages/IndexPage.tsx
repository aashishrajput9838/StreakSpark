import React from 'react';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const defaultUser = {
    name: "Guest",
    routine: "morning",
    personality: ["creative"],
    goals: ["fitness"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-appPalette-purple-950 to-appPalette-purple-700 text-white">
      <Dashboard />
    </div>
  );
};

export default Index;
