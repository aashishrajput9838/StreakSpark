
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OnboardingFlow from '../components/OnboardingFlow';
import Dashboard from '../components/Dashboard';
import { Button } from '@/components/ui/button';

interface UserData {
  name: string;
  routine: string;
  personality: string[];
  goals: string[];
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('onboarding'); // 'onboarding', 'dashboard'
  const [user, setUser] = useState<UserData | null>(null);

  const handleOnboardingComplete = (userData: UserData) => {
    setUser(userData);
    setCurrentScreen('dashboard');
  };

  if (currentScreen === 'onboarding') {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return user ? <Dashboard user={user} /> : null;
};

export default Index;
