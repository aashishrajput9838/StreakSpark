import React, { useState } from 'react';
import { useHabits } from '@/hooks/useHabits';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface AddHabitModalProps {
  open: boolean;
  onClose: () => void;
}

const AddHabitCardBackground = () => (
    <div className="absolute inset-0 opacity-80 overflow-hidden rounded-xl">
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-purple-600 via-fuchsia-800 to-indigo-900 animate-[spin_10s_linear_infinite]"></div>
    </div>
  );

const AddHabitModal: React.FC<AddHabitModalProps> = ({ open, onClose }) => {
  const { createHabit } = useHabits();
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitDescription, setNewHabitDescription] = useState('');
  const [newHabitFrequency, setNewHabitFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  if (!open) return null;

  const handleCreateHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    try {
      await createHabit({
        title: newHabitName.trim(),
        description: newHabitDescription.trim(),
        frequency: newHabitFrequency,
      });
      setNewHabitName('');
      setNewHabitDescription('');
      toast.success('Habit created successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to create habit');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
        <div className="relative" onClick={(e) => e.stopPropagation()}>
            <AddHabitCardBackground />
            <div className="relative bg-slate-900/80 backdrop-blur-sm border-white/20 text-white rounded-xl shadow-lg p-8 w-full max-w-md">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl">&times;</button>
                <h2 className="text-2xl font-bold mb-2 text-fuchsia-400">Add New Habit</h2>
                <p className="text-slate-300 mb-6">Create a new habit to track and build your streak.</p>
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
            </div>
        </div>
    </div>
  );
};

export default AddHabitModal;
