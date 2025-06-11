
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  Settings, 
  MessageCircle,
  CheckCircle,
  SkipForward,
  Coffee,
  Moon
} from 'lucide-react';

const Dashboard = ({ user }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [todaysHabits, setTodaysHabits] = useState([
    {
      id: 1,
      title: "3-min doodle after lunch",
      description: "Boost creativity and reduce afternoon stress",
      emoji: "🎨",
      completed: false,
      streak: 5,
      science: "Studies show creative breaks improve focus by 41%"
    },
    {
      id: 2,
      title: "Stand on one leg while brushing",
      description: "Improve balance and make boring tasks fun",
      emoji: "🦷",
      completed: true,
      streak: 12,
      science: "Balance exercises prevent falls and boost brain function"
    },
    {
      id: 3,
      title: "Send one gratitude text",
      description: "Strengthen relationships with micro-appreciation",
      emoji: "💝",
      completed: false,
      streak: 3,
      science: "Expressing gratitude increases happiness by 23%"
    }
  ]);

  const [showAICoach, setShowAICoach] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      type: 'bot',
      text: `Hey ${user?.name || 'Superstar'}! 🌟 You're doing amazing with your habits! Your balance streak is on fire! 🔥`
    }
  ]);

  const completedToday = todaysHabits.filter(h => h.completed).length;
  const totalStreak = todaysHabits.reduce((sum, habit) => sum + habit.streak, 0);

  const markHabitComplete = (id) => {
    setTodaysHabits(habits => 
      habits.map(habit => 
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const skipHabit = (id) => {
    // In real app, this would log the skip and maybe suggest alternatives
    console.log(`Skipped habit ${id}`);
  };

  if (showAICoach) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="p-4 max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pt-4">
            <Button
              variant="ghost"
              onClick={() => setShowAICoach(false)}
              className="text-muted-foreground"
            >
              ← Back
            </Button>
            <h1 className="text-xl font-bold">AI Coach 🤖</h1>
            <div />
          </div>

          {/* Chat Interface */}
          <div className="space-y-4 h-96 overflow-y-auto mb-4">
            {aiMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white/80 text-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start bg-white/50"
              onClick={() => setAiMessages([...aiMessages, 
                { type: 'user', text: "How's my streak?" },
                { type: 'bot', text: `You're crushing it! 🔥 Total streak power: ${totalStreak} days. Your balance habit is especially strong at 12 days!` }
              ])}
            >
              💪 How's my streak?
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-white/50"
              onClick={() => setAiMessages([...aiMessages,
                { type: 'user', text: "Motivate me!" },
                { type: 'bot', text: "You're already proving that small steps lead to big changes! 🌟 Every micro-habit is building the amazing person you're becoming. Keep sparking! ✨" }
              ])}
            >
              ✨ Motivate me!
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-white/50"
              onClick={() => setAiMessages([...aiMessages,
                { type: 'user', text: "Suggest a new habit" },
                { type: 'bot', text: "Based on your love for creativity, how about: 'Take a photo of something beautiful during your commute'? 📸 It combines mindfulness with artistic expression!" }
              ])}
            >
              💡 Suggest a new habit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="p-4 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Hello, {user?.name || 'Habit Hero'}! 👋
            </h1>
            <p className="text-muted-foreground">Ready to spark some habits?</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentView('settings')}
            className="bg-white/50"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-0">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{completedToday}/{todaysHabits.length}</div>
              <div className="text-sm text-muted-foreground">Today's Habits</div>
            </div>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-0">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalStreak}</div>
              <div className="text-sm text-muted-foreground">Total Streaks</div>
            </div>
          </Card>
        </div>

        {/* Today's Habits */}
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-semibold text-foreground">Today's Micro-Habits ✨</h2>
          
          {todaysHabits.map((habit) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <Card className={`p-4 bg-white/80 backdrop-blur-sm border-0 transition-all ${
                habit.completed ? 'bg-green-50 border-green-200' : ''
              }`}>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{habit.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-medium ${habit.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {habit.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        🔥 {habit.streak}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {habit.description}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => markHabitComplete(habit.id)}
                        className={habit.completed 
                          ? "bg-green-500 hover:bg-green-600" 
                          : "bg-primary hover:bg-primary/90"
                        }
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {habit.completed ? 'Done!' : 'Mark Done'}
                      </Button>
                      {!habit.completed && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => skipHabit(habit.id)}
                          className="bg-white/50"
                        >
                          <SkipForward className="w-4 h-4 mr-1" />
                          Skip
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t p-4">
          <div className="max-w-md mx-auto flex justify-around">
            <Button variant="ghost" size="sm" className="flex-col space-y-1">
              <Calendar className="w-5 h-5" />
              <span className="text-xs">Habits</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col space-y-1">
              <Users className="w-5 h-5" />
              <span className="text-xs">Friends</span>
            </Button>
            <Button
              onClick={() => setShowAICoach(true)}
              className="relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full w-12 h-12"
            >
              <MessageCircle className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse" />
            </Button>
            <Button variant="ghost" size="sm" className="flex-col space-y-1">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs">Discover</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-col space-y-1"
              onClick={() => setCurrentView('settings')}
            >
              <Settings className="w-5 h-5" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>

        {/* Floating Motivation */}
        {completedToday === todaysHabits.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <Card className="p-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-center border-0">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="font-bold text-lg">All habits complete!</h3>
              <p className="text-green-100">You're on fire today! 🔥</p>
            </Card>
          </motion.div>
        )}

        <div className="h-20" /> {/* Spacer for bottom nav */}
      </div>
    </div>
  );
};

export default Dashboard;
