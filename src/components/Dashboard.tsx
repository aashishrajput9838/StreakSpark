import React, { useState, useEffect } from 'react';
import DashboardHeader from './dashboard/DashboardHeader';
import CalendarWidget from './dashboard/CalendarWidget';
import WeatherWidget from './dashboard/WeatherWidget';
import ShouldDoWidget from './dashboard/ShouldDoWidget';
import TodosWidget from './dashboard/TodosWidget';
import IntegrationsWidget from './dashboard/IntegrationsWidget';
import AnalyticsWidget from './dashboard/AnalyticsWidget';
import RunningCompetitionWidget from './dashboard/RunningCompetitionWidget';
import SyncAppWidget from './dashboard/SyncAppWidget';
import FavoriteHabitsWidget from './dashboard/FavoriteHabitsWidget';
import { useHabits, Habit } from '@/hooks/useHabits';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

const Dashboard = () => {
  const { user } = useAuthContext();
  const { habits, loading, error, createHabit, toggleHabitCompletion } = useHabits();
  const [selectedDay, setSelectedDay] = useState<string>(formatDate(new Date()));

  // Prepare habits organized by date for the calendar tooltip
  const habitsByDate: { [date: string]: Habit[] } = React.useMemo(() => {
    const map: { [date: string]: Habit[] } = {};
    habits.forEach(habit => {
      habit.completedDates.forEach(dateStr => {
        if (!map[dateStr]) {
          map[dateStr] = [];
        }
        map[dateStr].push(habit);
      });
    });
    return map;
  }, [habits]);

  // Handle adding a new habit from the DashboardHeader modal
  const handleAddHabit = async (habitData: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'completedDates' | 'streak' | 'lastCompleted'>) => {
    if (!user) {
      toast.error("You must be logged in to add habits.");
      return;
    }
    try {
      await createHabit(habitData);
      toast.success("Habit added successfully!");
    } catch (err) {
      console.error("Failed to add habit:", err);
      toast.error("Failed to add habit.");
    }
  };

  // Mark a habit as completed for the selected day
  const handleCompleteHabit = async (habitId: string) => {
    if (!user) {
      toast.error("You must be logged in to complete habits.");
      return;
    }
    try {
      await toggleHabitCompletion(habitId, selectedDay);
      toast.success("Habit status updated!");
    } catch (err) {
      console.error("Failed to update habit completion:", err);
      toast.error("Failed to update habit completion.");
    }
  };

  // Get completed days for the current month for CalendarWidget
  const getCompletedDays = (year: number, month: number) => {
    // month: 0-based
    const days: number[] = [];
    habits.forEach(habit => {
      habit.completedDates.forEach(dateStr => {
        const date = new Date(dateStr);
        if (date.getFullYear() === year && date.getMonth() === month) {
          days.push(date.getDate());
        }
      });
    });
    return Array.from(new Set(days));
  };

  // Habits completed on selected day
  const habitsForSelectedDay = habits.filter(habit =>
    habit.completedDates.includes(selectedDay)
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error loading dashboard: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-6 md:col-span-1">
          <DashboardHeader onAddHabit={handleAddHabit} />
          {/* Display habits managed by Firebase here */}
          {habits.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow mt-4">
              <div className="font-semibold mb-2">Your Habits</div>
              <ul className="space-y-2">
                {habits.map(h => {
                  const isCompleted = h.completedDates.includes(selectedDay);
                  return (
                    <li key={h.id} className="flex items-center gap-2">
                      <span className="text-xl">🎯</span> {/* Placeholder icon */}
                      <span className="font-medium">{h.title}</span>
                      <span className="text-xs text-gray-400">{h.frequency}</span>
                      <button
                        className={`ml-auto text-xs border rounded px-2 py-1 ${isCompleted ? 'text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed' : 'text-green-600 border-green-200 hover:bg-green-50'}`}
                        onClick={() => handleCompleteHabit(h.id)}
                        disabled={isCompleted}
                      >
                        {isCompleted ? 'Completed' : 'Mark Complete'}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <CalendarWidget
            completedDays={getCompletedDays}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            habitsByDate={habitsByDate}
          />
          {/* Show habits for selected day */}
          <div className="bg-white rounded-xl p-4 shadow mt-4">
            <div className="font-semibold mb-2">Habits for {selectedDay}</div>
            {habitsForSelectedDay.length > 0 ? (
              <ul className="space-y-2">
                {habitsForSelectedDay.map(h => (
                  <li key={h.id} className="flex items-center gap-2">
                    <span className="text-xl">🎯</span> {/* Placeholder icon */}
                    <span className="font-medium">{h.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-400 text-sm">No habits completed on this day.</div>
            )}
          </div>
          <SyncAppWidget />
        </div>
        {/* Main/center column */}
        <div className="flex flex-col gap-6 md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeatherWidget />
            <TodosWidget />
          </div>
          <ShouldDoWidget />
          <RunningCompetitionWidget />
        </div>
        {/* Right column */}
        <div className="flex flex-col gap-6 md:col-span-1">
          <IntegrationsWidget />
          <AnalyticsWidget />
          <FavoriteHabitsWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
