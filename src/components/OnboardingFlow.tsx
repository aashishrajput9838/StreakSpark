import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Heart, Target, Users, Zap } from 'lucide-react';

const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    routine: '',
    personality: [],
    goals: []
  });

  const steps = [
    {
      title: "Welcome to StreakSpark! ✨",
      subtitle: "Your personal micro-habit matchmaker 🎯",
      description: "Transform your life one tiny habit at a time. We make habit-building actually fun!",
      icon: <Sparkles className="w-16 h-16 text-primary" />
    },
    {
      title: "We're Different! 🦄",
      subtitle: "Not your boring old habit tracker",
      description: "We suggest weird, science-backed micro-habits that actually stick. Think 'brush teeth while doing squats' level creative!",
      icon: <Heart className="w-16 h-16 text-primary" />
    },
    {
      title: "Let's Get Personal 🔍",
      subtitle: "We'll ask a few things to personalize your habits",
      description: "The more we know about you, the better we can spark your perfect habit streak!",
      icon: <Target className="w-16 h-16 text-primary" />
    },
    {
      title: "What's your name?",
      subtitle: "Let's make this personal! 👋",
      isForm: true,
      formType: 'name'
    },
    {
      title: "When do you like to build habits?",
      subtitle: "Choose your power hour ⚡",
      isForm: true,
      formType: 'routine',
      options: [
        { id: 'morning', label: 'Morning Person 🌅', emoji: '🌅' },
        { id: 'evening', label: 'Night Owl 🦉', emoji: '🦉' },
        { id: 'random', label: 'Random Sparks ⚡', emoji: '⚡' }
      ]
    },
    {
      title: "What describes you best?",
      subtitle: "Pick your vibe (choose multiple!) ✨",
      isForm: true,
      formType: 'personality',
      options: [
        { id: 'creative', label: 'Creative Soul', emoji: '🎨' },
        { id: 'analytical', label: 'Data Lover', emoji: '📊' },
        { id: 'social', label: 'People Person', emoji: '👥' },
        { id: 'adventurous', label: 'Adventure Seeker', emoji: '🌟' },
        { id: 'peaceful', label: 'Zen Master', emoji: '🧘' }
      ]
    },
    {
      title: "What areas spark your interest?",
      subtitle: "Let's focus your habit magic! 🎯",
      isForm: true,
      formType: 'goals',
      options: [
        { id: 'fitness', label: 'Movement & Energy', emoji: '💪' },
        { id: 'mindfulness', label: 'Peace & Clarity', emoji: '🧘' },
        { id: 'learning', label: 'Growth & Skills', emoji: '📚' },
        { id: 'social', label: 'Connection & Love', emoji: '❤️' },
        { id: 'creativity', label: 'Art & Expression', emoji: '🎨' }
      ]
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(userData);
    }
  };

  const handleFormInput = (value) => {
    const step = steps[currentStep];
    if (step.formType === 'name') {
      setUserData({ ...userData, name: value });
    } else if (step.formType === 'routine') {
      setUserData({ ...userData, routine: value });
    } else if (step.formType === 'personality') {
      const newPersonality = userData.personality.includes(value)
        ? userData.personality.filter(p => p !== value)
        : [...userData.personality, value];
      setUserData({ ...userData, personality: newPersonality });
    } else if (step.formType === 'goals') {
      const newGoals = userData.goals.includes(value)
        ? userData.goals.filter(g => g !== value)
        : [...userData.goals, value];
      setUserData({ ...userData, goals: newGoals });
    }
  };

  const canProceed = () => {
    const step = steps[currentStep];
    if (!step.isForm) return true;
    if (step.formType === 'name') return userData.name.trim().length > 0;
    if (step.formType === 'routine') return userData.routine !== '';
    if (step.formType === 'personality') return userData.personality.length > 0;
    if (step.formType === 'goals') return userData.goals.length > 0;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 bg-white/50" />
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {Math.round(progress)}% complete
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <div className="text-center space-y-6">
                {/* Icon */}
                {steps[currentStep].icon && (
                  <div className="flex justify-center">
                    {steps[currentStep].icon}
                  </div>
                )}

                {/* Title & Subtitle */}
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-foreground">
                    {steps[currentStep].title}
                  </h1>
                  <h2 className="text-lg text-muted-foreground">
                    {steps[currentStep].subtitle}
                  </h2>
                </div>

                {/* Description or Form */}
                {steps[currentStep].description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {steps[currentStep].description}
                  </p>
                )}

                {steps[currentStep].isForm && (
                  <div className="space-y-4">
                    {steps[currentStep].formType === 'name' && (
                      <Input
                        placeholder="Enter your name..."
                        value={userData.name}
                        onChange={(e) => handleFormInput(e.target.value)}
                        className="text-center text-lg border-2 border-primary/20 focus:border-primary"
                      />
                    )}

                    {steps[currentStep].options && (
                      <div className="grid gap-3">
                        {steps[currentStep].options.map((option) => {
                          const isSelected = 
                            steps[currentStep].formType === 'routine' 
                              ? userData.routine === option.id
                              : steps[currentStep].formType === 'personality'
                              ? userData.personality.includes(option.id)
                              : userData.goals.includes(option.id);

                          return (
                            <Button
                              key={option.id}
                              variant={isSelected ? "default" : "outline"}
                              onClick={() => handleFormInput(option.id)}
                              className={`w-full p-4 h-auto text-left justify-start ${
                                isSelected 
                                  ? 'bg-primary hover:bg-primary/90' 
                                  : 'bg-white/50 hover:bg-white/80 border-2 border-primary/20'
                              }`}
                            >
                              <span className="text-xl mr-3">{option.emoji}</span>
                              <span className="font-medium">{option.label}</span>
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Next Button */}
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="w-full py-3 text-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {currentStep === steps.length - 1 ? "Start My Journey! 🚀" : "Continue ✨"}
                </Button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Skip option for non-essential steps */}
        {currentStep > 2 && currentStep < steps.length - 1 && (
          <div className="text-center mt-4">
            <Button
              variant="ghost"
              onClick={nextStep}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip for now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;
