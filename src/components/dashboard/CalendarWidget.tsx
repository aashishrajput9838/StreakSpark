import React from 'react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarWidgetProps {
  completedDays: (year: number, month: number) => number[];
  selectedDay: string;
  setSelectedDay: (date: string) => void;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ completedDays, selectedDay, setSelectedDay }) => {
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
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <button onClick={handlePrevMonth} className="text-xl px-2 hover:text-orange-600">&#8592;</button>
        <div className="font-semibold">{month}, {year}</div>
        <button
          onClick={handleNextMonth}
          className={`text-xl px-2 ${isFutureMonth ? 'text-gray-300 cursor-not-allowed' : 'hover:text-orange-600'}`}
          disabled={isFutureMonth}
        >
          &#8594;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-1">
        {WEEKDAYS.map(w => <div key={w}>{w}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {daysArray.map((day, idx) =>
          day ? (
            <div
              key={idx}
              onClick={() => setSelectedDay(formatDate(day))}
              className={`relative rounded-full w-7 h-7 flex items-center justify-center cursor-pointer
                ${isCurrentMonth && day === currentDay && viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear() ? 'bg-orange-200 text-orange-900 font-bold' : ''}
                ${selectedDay === formatDate(day) ? 'ring-2 ring-orange-400' : ''}
                hover:bg-gray-100`}
            >
              {day}
              {/* Mark completed days with a green dot */}
              {completed.includes(day) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
              )}
            </div>
          ) : (
            <div key={idx} />
          )
        )}
      </div>
      <div className="text-green-600 text-xs mt-2 font-semibold">+3.2% from last month</div>
    </div>
  );
};

export default CalendarWidget; 