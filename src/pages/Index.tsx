
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OnboardingFlow from '../components/OnboardingFlow';
import Dashboard from '../components/Dashboard';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('onboarding'); // 'onboarding', 'dashboard'
  const [user, setUser] = useState(null);

  const handleOnboardingComplete = (userData) => {
    setUser(userData);
    setCurrentScreen('dashboard');
  };

  if (currentScreen === 'onboarding') {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return <Dashboard user={user} />;
};

export default Index;
