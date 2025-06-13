import React, { useState } from 'react';
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

const Dashboard = () => {
  const [habits, setHabits] = useState<any[]>([]);

  const handleAddHabit = (habit: any) => {
    setHabits(prev => [...prev, { ...habit, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-6 md:col-span-1">
          <DashboardHeader onAddHabit={handleAddHabit} />
          {/* Show added habits below header for now */}
          {habits.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow mt-4">
              <div className="font-semibold mb-2">Your Habits</div>
              <ul className="space-y-2">
                {habits.map(h => (
                  <li key={h.id} className="flex items-center gap-2">
                    <span className="text-xl">{h.icon}</span>
                    <span className="font-medium">{h.title}</span>
                    <span className="text-xs text-gray-400">{h.category}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <CalendarWidget />
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
