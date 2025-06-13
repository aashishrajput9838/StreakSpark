import { useState } from 'react';
import { useHabits } from '@/hooks/useHabits';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export function HabitList() {
  const { habits, loading, error, createHabit, updateHabit, deleteHabit, toggleHabitCompletion } = useHabits();
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitFrequency, setNewHabitFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const handleCreateHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    try {
      await createHabit({
        name: newHabitName.trim(),
        frequency: newHabitFrequency,
      });
      setNewHabitName('');
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
    const today = new Date().toISOString().split('T')[0];
    try {
      await toggleHabitCompletion(habitId, today);
    } catch (error) {
      toast.error('Failed to update habit completion');
    }
  };

  if (loading) {
    return <div>Loading habits...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Habit</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateHabit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="habitName">Habit Name</Label>
              <Input
                id="habitName"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                placeholder="Enter habit name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                value={newHabitFrequency}
                onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setNewHabitFrequency(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Add Habit</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {habits.map((habit) => (
          <Card key={habit.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <h3 className="font-medium">{habit.name}</h3>
                <p className="text-sm text-gray-500">Frequency: {habit.frequency}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleToggleCompletion(habit.id)}
                >
                  {habit.completedDates?.includes(new Date().toISOString().split('T')[0])
                    ? 'Completed'
                    : 'Mark Complete'}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteHabit(habit.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 