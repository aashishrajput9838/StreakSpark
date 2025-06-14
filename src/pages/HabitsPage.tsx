import { HabitManager } from '@/components/HabitManager';

export default function HabitsPage() {
  return (
    <div className="min-h-screen bg-appPalette-dark-background text-appPalette-dark-text py-8">
      <h1 className="text-3xl font-bold mb-6 text-appPalette-dark-text">My Habits</h1>
      <HabitManager />
    </div>
  );
} 