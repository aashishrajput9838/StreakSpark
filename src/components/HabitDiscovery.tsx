import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, ArrowLeft, Filter, Sparkles } from 'lucide-react';
import { habitLibrary, habitCategories, Habit } from '../data/habitLibrary';

interface HabitDiscoveryProps {
  onAddHabit: (habit: Habit) => void;
  onBack: () => void;
  userPreferences?: {
    personality: string[];
    goals: string[];
    routine: string;
  };
}

const HabitDiscovery = ({ onAddHabit, onBack, userPreferences }: HabitDiscoveryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  const filteredHabits = habitLibrary.filter(habit => {
    const matchesSearch = habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         habit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         habit.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || habit.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getPersonalizedSuggestions = () => {
    if (!userPreferences) return [];
    
    return habitLibrary.filter(habit => {
      // Match habits to user goals
      const matchesGoals = userPreferences.goals.some(goal => 
        habit.category === goal || habit.tags.includes(goal)
      );
      
      // Match habits to user routine preference
      const matchesRoutine = userPreferences.routine === 'random' || 
                            habit.tags.includes(userPreferences.routine) ||
                            (userPreferences.routine === 'morning' && habit.tags.includes('morning')) ||
                            (userPreferences.routine === 'evening' && habit.tags.includes('evening'));
      
      return matchesGoals || matchesRoutine;
    }).slice(0, 3);
  };

  const personalizedSuggestions = getPersonalizedSuggestions();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedHabit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedHabit(null)}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Habit Details</h1>
            <div className="w-9" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="text-4xl mb-2">{selectedHabit.icon}</div>
                <h2 className="text-xl font-bold">{selectedHabit.title}</h2>
                <p className="text-muted-foreground">{selectedHabit.description}</p>
                
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge className={getDifficultyColor(selectedHabit.difficulty)}>
                    {selectedHabit.difficulty}
                  </Badge>
                  <Badge variant="outline">
                    {selectedHabit.timeEstimate}
                  </Badge>
                  <Badge className={
                    habitCategories.find(cat => cat.id === selectedHabit.category)?.color || 'bg-gray-100'
                  }>
                    {habitCategories.find(cat => cat.id === selectedHabit.category)?.name}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Why this works
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {selectedHabit.scienceExplanation}
              </p>
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={() => setSelectedHabit(null)}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  onAddHabit(selectedHabit);
                  setSelectedHabit(null);
                }}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Add Habit
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Discover Habits</h1>
          <div className="w-9" />
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search habits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 backdrop-blur-sm border-0 shadow-sm"
          />
        </div>

        {/* Personalized Suggestions */}
        {personalizedSuggestions.length > 0 && !searchTerm && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Perfect for you
            </h2>
            <div className="space-y-3">
              {personalizedSuggestions.map((habit) => (
                <Card
                  key={habit.id}
                  className="p-4 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedHabit(habit)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{habit.icon}</span>
                      <div>
                        <h3 className="font-medium">{habit.title}</h3>
                        <p className="text-sm text-muted-foreground">{habit.timeEstimate}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              size="sm"
              className="whitespace-nowrap"
            >
              All
            </Button>
            {habitCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                size="sm"
                className="whitespace-nowrap"
              >
                {category.emoji} {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Habits Grid */}
        <div className="space-y-3">
          {filteredHabits.map((habit) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className="p-4 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedHabit(habit)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{habit.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-medium">{habit.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {habit.description}
                      </p>
                      <div className="flex gap-1 mt-2">
                        <Badge className={getDifficultyColor(habit.difficulty)}>
                          {habit.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          {habit.timeEstimate}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredHabits.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No habits found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitDiscovery;
