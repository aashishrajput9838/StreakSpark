import React from 'react';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const defaultUser = {
    name: "Guest",
    routine: "morning",
    personality: ["creative"],
    goals: ["fitness"],
  };

  return <Dashboard user={defaultUser} />;
};

export default Index;
