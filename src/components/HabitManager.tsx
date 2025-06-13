import { useState } from 'react';
import { useHabits } from '@/hooks/useHabits';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

export function HabitManager() {
  const { habits, loading, error, createHabit, updateHabit, deleteHabit, toggleHabitCompletion } = useHabits();
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitDescription, setNewHabitDescription] = useState('');
  const [newHabitFrequency, setNewHabitFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

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

  const handleToggleCompletion = async (habitId: string, date: string) => {
    try {
      await toggleHabitCompletion(habitId, date);
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
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Habit</CardTitle>
          <CardDescription>Create a new habit to track</CardDescription>
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
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="habitDescription">Description (Optional)</Label>
              <Textarea
                id="habitDescription"
                value={newHabitDescription}
                onChange={(e) => setNewHabitDescription(e.target.value)}
                placeholder="Enter habit description"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to mark habits</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          {habits.map((habit) => (
            <Card key={habit.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{habit.name}</span>
                  <span className="text-sm text-muted-foreground">
                    Streak: {habit.streak}
                  </span>
                </CardTitle>
                {habit.description && (
                  <CardDescription>{habit.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Frequency: {habit.frequency}
                    </p>
                    {habit.lastCompleted && (
                      <p className="text-sm text-muted-foreground">
                        Last completed: {format(habit.lastCompleted, 'PPP')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedDate && (
                      <Button
                        variant="outline"
                        onClick={() => handleToggleCompletion(
                          habit.id,
                          format(selectedDate, 'yyyy-MM-dd')
                        )}
                      >
                        {habit.completedDates?.includes(format(selectedDate, 'yyyy-MM-dd'))
                          ? 'Mark Incomplete'
                          : 'Mark Complete'}
                      </Button>
                    )}
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
          ))}
        </div>
      </div>
    </div>
  );
} 