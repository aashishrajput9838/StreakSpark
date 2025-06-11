
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus, Settings, Users, Bot, Flame, Target, Calendar } from 'lucide-react';
import HabitDiscovery from './HabitDiscovery';
import { Habit } from '../data/habitLibrary';

interface DashboardProps {
  user: {
    name: string;
    routine: string;
    personality: string[];
    goals: string[];
  };
}

interface UserHabit extends Habit {
  streak: number;
  completedToday: boolean;
  totalCompletions: number;
  dateAdded: string;
}

const Dashboard = ({ user }: DashboardProps) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'discovery'>('dashboard');
  const [userHabits, setUserHabits] = useState<UserHabit[]>([
    {
      id: 'gratitude-coffee',
      title: 'One gratitude with morning coffee',
      description: 'Think of one thing you\'re grateful for while having your first sip',
      category: 'mindfulness',
      difficulty: 'easy',
      timeEstimate: '30 sec',
      scienceExplanation: 'Gratitude practice rewires the brain for positivity and reduces stress',
      icon: '☕',
      tags: ['morning', 'gratitude', 'coffee'],
      streak: 3,
      completedToday: false,
      totalCompletions: 8,
      dateAdded: '2024-06-08'
    },
    {
      id: 'teeth-squats',
      title: 'Squat while brushing teeth',
      description: 'Do gentle squats while brushing your teeth for 2 minutes',
      category: 'fitness',
      difficulty: 'easy',
      timeEstimate: '2 min',
      scienceExplanation: 'Combining routine activities with exercise creates automatic habit formation',
      icon: '🦷',
      tags: ['morning', 'exercise', 'multitasking'],
      streak: 5,
      completedToday: true,
      totalCompletions: 12,
      dateAdded: '2024-06-05'
    },
    {
      id: 'doodle-lunch',
      title: '3-minute doodle after lunch',
      description: 'Spend 3 minutes drawing anything that comes to mind',
      category: 'creativity',
      difficulty: 'easy',
      timeEstimate: '3 min',
      scienceExplanation: 'Creative expression activates the default mode network in the brain',
      icon: '✏️',
      tags: ['drawing', 'lunch', 'creativity'],
      streak: 1,
      completedToday: false,
      totalCompletions: 3,
      dateAdded: '2024-06-09'
    }
  ]);

  const handleAddHabit = (habit: Habit) => {
    const newUserHabit: UserHabit = {
      ...habit,
      streak: 0,
      completedToday: false,
      totalCompletions: 0,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setUserHabits([...userHabits, newUserHabit]);
    setCurrentView('dashboard');
  };

  const toggleHabitCompletion = (habitId: string) => {
    setUserHabits(habits => habits.map(habit => {
      if (habit.id === habitId) {
        const wasCompleted = habit.completedToday;
        return {
          ...habit,
          completedToday: !wasCompleted,
          streak: wasCompleted ? Math.max(0, habit.streak - 1) : habit.streak + 1,
          totalCompletions: wasCompleted ? habit.totalCompletions - 1 : habit.totalCompletions + 1
        };
      }
      return habit;
    }));
  };

  const totalStreak = userHabits.reduce((sum, habit) => sum + habit.streak, 0);
  const completedToday = userHabits.filter(habit => habit.completedToday).length;
  const completionRate = userHabits.length > 0 ? (completedToday / userHabits.length) * 100 : 0;

  if (currentView === 'discovery') {
    return (
      <HabitDiscovery
        onAddHabit={handleAddHabit}
        onBack={() => setCurrentView('dashboard')}
        userPreferences={user}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">
                Good {user.routine === 'morning' ? 'morning' : user.routine === 'evening' ? 'evening' : 'day'}, {user.name}! 👋
              </h1>
              <p className="text-sm text-muted-foreground">
                {completedToday}/{userHabits.length} habits completed today
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Progress Overview */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Today's Progress</h2>
              <div className="flex items-center gap-1 text-orange-500">
                <Flame className="w-4 h-4" />
                <span className="font-bold">{totalStreak}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completion Rate</span>
                <span className="font-medium">{Math.round(completionRate)}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{totalStreak}</div>
                <div className="text-xs text-muted-foreground">Total Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{completedToday}</div>
                <div className="text-xs text-muted-foreground">Done Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{userHabits.length}</div>
                <div className="text-xs text-muted-foreground">Active Habits</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Today's Habits */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Today's Micro-Habits</h2>
            <Button
              onClick={() => setCurrentView('discovery')}
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>

          {userHabits.map((habit) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="habit-card"
            >
              <Card className={`p-4 bg-white/80 backdrop-blur-sm border-l-4 transition-all ${
                habit.completedToday 
                  ? 'border-l-green-500 bg-green-50/50' 
                  : 'border-l-primary hover:shadow-md'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{habit.icon}</span>
                    <div className="flex-1">
                      <h3 className={`font-medium ${habit.completedToday ? 'line-through text-muted-foreground' : ''}`}>
                        {habit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {habit.timeEstimate} • {habit.streak} day streak
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {habit.streak > 0 && (
                      <div className="flex items-center gap-1 text-orange-500">
                        <Flame className="w-3 h-3" />
                        <span className="text-sm font-medium">{habit.streak}</span>
                      </div>
                    )}
                    <Button
                      onClick={() => toggleHabitCompletion(habit.id)}
                      variant={habit.completedToday ? "default" : "outline"}
                      size="sm"
                      className={habit.completedToday ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {habit.completedToday ? "✅" : "○"}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {userHabits.length === 0 && (
            <Card className="p-8 bg-white/80 backdrop-blur-sm text-center">
              <div className="space-y-3">
                <Target className="w-12 h-12 mx-auto text-muted-foreground" />
                <h3 className="font-medium">No habits yet!</h3>
                <p className="text-sm text-muted-foreground">
                  Let's discover some perfect micro-habits for you
                </p>
                <Button
                  onClick={() => setCurrentView('discovery')}
                  className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Discover Habits
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-white/20 p-4">
          <div className="max-w-md mx-auto">
            <div className="flex justify-around">
              <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2">
                <Target className="w-5 h-5" />
                <span className="text-xs">Habits</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2">
                <Users className="w-5 h-5" />
                <span className="text-xs">Friends</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2">
                <Bot className="w-5 h-5" />
                <span className="text-xs">AI Coach</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2">
                <Calendar className="w-5 h-5" />
                <span className="text-xs">Progress</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Spacer for bottom navigation */}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default Dashboard;
