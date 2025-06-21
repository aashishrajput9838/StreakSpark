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

// New animated gradient background for the "Add New Habit" card
const AddHabitCardBackground = () => (
  <div className="absolute inset-0 opacity-80 overflow-hidden rounded-xl">
    <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-purple-600 via-fuchsia-800 to-indigo-900 animate-[spin_10s_linear_infinite]"></div>
  </div>
);

export function HabitManager() {
  const { habits, loading, error, createHabit, deleteHabit, toggleHabitCompletion } = useHabits();
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitDescription, setNewHabitDescription] = useState('');
  const [newHabitFrequency, setNewHabitFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const todayDateString = format(new Date(), 'yyyy-MM-dd');

  const handleCreateHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    try {
      await createHabit({
        name: newHabitName.trim(),
        description: newHabitDescription.trim(),
        frequency: newHabitFrequency,
      });
      setNewHabitName('');
      setNewHabitDescription('');
      toast.success('Habit created successfully');
    } catch (error) {
      toast.error('Failed to create habit');
    }
  };

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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative" 
      >
        <AddHabitCardBackground />
        <Card className="shadow-xl relative bg-slate-900/80 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-fuchsia-400">Add New Habit</CardTitle>
            <CardDescription className="text-slate-300">Create a new habit to track and build your streak</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateHabit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="habitName" className="text-slate-300">Habit Name</Label>
                <Input
                  id="habitName"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="e.g., Read for 20 minutes"
                  required
                  className="bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-400 focus:ring-fuchsia-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="habitDescription" className="text-slate-300">Description (Optional)</Label>
                <Textarea
                  id="habitDescription"
                  value={newHabitDescription}
                  onChange={(e) => setNewHabitDescription(e.target.value)}
                  placeholder="e.g., To expand my knowledge"
                  className="bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-400 focus:ring-fuchsia-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency" className="text-slate-300">Frequency</Label>
                <Select
                  value={newHabitFrequency}
                  onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setNewHabitFrequency(value)}
                >
                  <SelectTrigger className="bg-slate-800/60 border-slate-700 text-white">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="daily" className="hover:bg-fuchsia-500">Daily</SelectItem>
                    <SelectItem value="weekly" className="hover:bg-fuchsia-500">Weekly</SelectItem>
                    <SelectItem value="monthly" className="hover:bg-fuchsia-500">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white font-bold shadow-lg transition-transform transform hover:scale-105">
                Spark New Habit
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

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
                      <span>{habit.name}</span>
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
