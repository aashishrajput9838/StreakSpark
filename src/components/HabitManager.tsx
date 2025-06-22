import { useState } from 'react';
import { useHabits } from '@/hooks/useHabits';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

export function HabitManager() {
  const { habits, loading, error, deleteHabit, toggleHabitCompletion } = useHabits();
  
  const todayDateString = format(new Date(), 'yyyy-MM-dd');

  const handleDeleteHabit = async (habitId: string) => {
    try {
      await deleteHabit(habitId);
      toast.success('Habit deleted successfully');
    } catch (error) {
      toast.error('Failed to delete habit');
    }
  };

  const handleToggleCompletion = async (habitId: string) => {
    try {
      await toggleHabitCompletion(habitId, todayDateString);
    } catch (error) {
      toast.error('Failed to update habit completion');
    }
  };

  if (loading) return <div className="text-center text-lg">Loading habits...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">Today's Habits</h2>
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <AnimatePresence>
            {habits.map((habit) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-md border border-gray-300">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{habit.title}</span>
                      <span className="text-sm text-muted-foreground">Streak: {habit.streak}</span>
                    </CardTitle>
                    {habit.description && (
                      <CardDescription>{habit.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Frequency: {habit.frequency}</p>
                        {habit.lastCompleted && (
                          <p className="text-sm text-muted-foreground">
                            Last completed: {format(habit.lastCompleted, 'PPP')}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={habit.completedDates?.includes(todayDateString) ? "default" : "outline"}
                          onClick={() => handleToggleCompletion(habit.id)}
                          className={habit.completedDates?.includes(todayDateString) ? 'bg-green-500 hover:bg-green-600' : ''}
                        >
                          {habit.completedDates?.includes(todayDateString)
                            ? 'Completed'
                            : "Mark Complete"}
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteHabit(habit.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
