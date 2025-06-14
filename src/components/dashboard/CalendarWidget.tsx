import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Habit } from '@/hooks/useHabits';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarWidgetProps {
  completedDays: (year: number, month: number) => number[];
  selectedDay: string;
  setSelectedDay: (date: string) => void;
  habitsByDate: { [date: string]: Habit[] };
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ completedDays, selectedDay, setSelectedDay, habitsByDate }) => {
  const today = new Date();
  const [viewDate, setViewDate] = React.useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.toLocaleString('default', { month: 'long' });
  const currentDay = today.getDate();
  const isCurrentMonth =
    today.getFullYear() === viewDate.getFullYear() && today.getMonth() === viewDate.getMonth();
  const isFutureMonth =
    viewDate.getFullYear() > today.getFullYear() ||
    (viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() > today.getMonth());

  // Get the first day of the month (0=Sunday, 1=Monday, ...)
  const firstDay = new Date(year, viewDate.getMonth(), 1).getDay();
  // Get the number of days in the month
  const daysInMonth = new Date(year, viewDate.getMonth() + 1, 0).getDate();

  // Create an array for the calendar grid
  const daysArray = [];
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null); // Empty slots for days before the 1st
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  const handlePrevMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    if (!isFutureMonth) {
      setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }
  };

  // Get completed days for the current view month
  const completed = completedDays(year, viewDate.getMonth());

  // Helper to format date as YYYY-MM-DD
  const formatDate = (d: number) => {
    return `${year}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  };

  return (
    <div className="bg-appPalette-dark-card rounded-xl p-6 shadow flex flex-col gap-4 text-appPalette-dark-text">
      <div className="flex items-center justify-between mb-2">
        <button onClick={handlePrevMonth} className="text-xl px-2 hover:text-appPalette-orange">&#8592;</button>
        <div className="font-semibold">{month}, {year}</div>
        <button
          onClick={handleNextMonth}
          className={`text-xl px-2 ${isFutureMonth ? 'text-appPalette-dark-muted cursor-not-allowed' : 'hover:text-appPalette-orange'}`}
          disabled={isFutureMonth}
        >
          &#8594;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-appPalette-dark-muted mb-1">
        {WEEKDAYS.map(w => <div key={w}>{w}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {daysArray.map((day, idx) => {
          const formattedDate = day ? formatDate(day) : '';
          const habitsOnThisDay = habitsByDate[formattedDate] || [];
          const isDayCompleted = completed.includes(day);

          return day ? (
            <Tooltip key={idx} delayDuration={300}>
              <TooltipTrigger asChild>
                <div
                  onClick={() => setSelectedDay(formattedDate)}
                  className={`relative rounded-full w-7 h-7 flex items-center justify-center cursor-pointer
                    ${isCurrentMonth && day === currentDay && viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear() ? 'bg-appPalette-orange text-white font-bold' : ''}
                    ${selectedDay === formattedDate ? 'ring-2 ring-appPalette-pink' : ''}
                    hover:bg-appPalette-purple`}
                >
                  {day}
                  {/* Mark completed days with a green dot */}
                  {isDayCompleted && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-appPalette-blue rounded-full border border-appPalette-dark-background"></span>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-appPalette-dark-card text-appPalette-dark-text border-appPalette-dark-border">
                {habitsOnThisDay.length > 0 ? (
                  <div className="space-y-1">
                    <p className="font-semibold">Habits for {formattedDate}:</p>
                    {habitsOnThisDay.map(habit => (
                      <p key={habit.id} className="text-sm">• {habit.name}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-appPalette-dark-muted">No habits completed</p>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <div key={idx} />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWidget; 