import React from 'react';
import HabitDiscovery from '@/components/HabitDiscovery';
import { useNavigate } from 'react-router-dom';
import { useHabits } from '@/hooks/useHabits';
import { toast } from 'sonner';

const DiscoverHabitsPage: React.FC = () => {
  const navigate = useNavigate();
  const { createHabit } = useHabits();

  const handleAddHabit = async (habitData: any) => {
    try {
      await createHabit(habitData);
      toast.success("Habit added successfully!");
    } catch (err) {
      console.error("Failed to add habit:", err);
      toast.error("Failed to add habit.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <HabitDiscovery onAddHabit={handleAddHabit} onBack={handleBack} />
      </div>
    </div>
  );
};

export default DiscoverHabitsPage; 