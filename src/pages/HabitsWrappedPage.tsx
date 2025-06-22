import React from 'react';
import { useHabits } from '@/hooks/useHabits';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Crown, Target, Zap, TrendingUp } from 'lucide-react';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00c49f'];

export default function HabitsWrappedPage() {
  const { habits, loading } = useHabits();

  if (loading) {
    return <div className="text-center text-lg">Generating your Habits Wrapped...</div>;
  }

  const mostConsistentHabit = habits.length > 0
    ? habits.reduce((prev, current) => {
        const prevStreak = prev.streak || 0;
        const currentStreak = current.streak || 0;
        return prevStreak > currentStreak ? prev : current;
      })
    : null;

  if (habits.length === 0) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8 flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-bold mb-4">No Habit Data Yet!</h1>
            <p className="text-xl text-purple-300">Start tracking your habits to see your 2023 Wrapped summary.</p>
        </div>
    );
  }

  const totalCompletions = habits.reduce((acc, habit) => acc + (habit.completedDates?.length || 0), 0);
  const longestStreak = Math.max(0, ...habits.map(h => h.streak || 0));

  const completionsByFrequency = habits.reduce((acc, habit) => {
    const freq = habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1);
    acc[freq] = (acc[freq] || 0) + (habit.completedDates?.length || 0);
    return acc;
  }, {} as Record<string, number>);
  
  const frequencyData = Object.entries(completionsByFrequency).map(([name, value]) => ({ name, value }));

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2">Your Habits Wrapped</h1>
          <p className="text-2xl text-purple-300">A look back at your year of growth!</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <motion.div variants={itemVariants}>
                <Card className="bg-slate-800/50 border-purple-400/30 text-center p-6 h-full">
                    <CardHeader>
                        <Zap className="w-12 h-12 mx-auto text-yellow-400 mb-2"/>
                        <CardTitle className="text-xl">Total Completions</CardTitle>
                    </CardHeader>
                    <CardContent className="text-4xl font-bold">{totalCompletions}</CardContent>
                </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
                <Card className="bg-slate-800/50 border-purple-400/30 text-center p-6 h-full">
                    <CardHeader>
                        <TrendingUp className="w-12 h-12 mx-auto text-green-400 mb-2"/>
                        <CardTitle className="text-xl">Longest Streak</CardTitle>
                    </CardHeader>
                    <CardContent className="text-4xl font-bold">{longestStreak} days</CardContent>
                </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
                <Card className="bg-slate-800/50 border-purple-400/30 text-center p-6 h-full">
                    <CardHeader>
                        <Crown className="w-12 h-12 mx-auto text-amber-400 mb-2"/>
                        <CardTitle className="text-xl">Most Consistent</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">{mostConsistentHabit?.title || 'N/A'}</CardContent>
                </Card>
            </motion.div>
        </div>

        <motion.div variants={itemVariants}>
            <Card className="bg-slate-800/50 border-purple-400/30 p-6">
                <CardHeader>
                    <CardTitle className="text-2xl text-center mb-4">Habit Frequency Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={frequencyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                                {frequencyData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: 'rgba(30, 41, 59, 0.8)',
                                    borderColor: '#4c1d95'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </motion.div>
      </motion.div>
    </div>
  );
} 