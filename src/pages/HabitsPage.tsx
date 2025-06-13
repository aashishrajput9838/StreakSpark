import { HabitManager } from '@/components/HabitManager';

export default function HabitsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Habits</h1>
      <HabitManager />
    </div>
  );
} 