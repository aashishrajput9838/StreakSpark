import React, { useState } from 'react';
import AddHabitModal from './AddHabitModal';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  onAddHabit: (habit: any) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onAddHabit }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' });
  const date = today.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const time = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <span>Happy {day} 👋</span>
      </div>
      <div className="text-gray-500 text-sm">{date}, {time}</div>
      <button className="bg-orange-200 hover:bg-orange-300 text-orange-900 font-semibold rounded-lg px-4 py-2 w-full transition" onClick={() => setModalOpen(true)}>+ New Habits</button>
      <button 
        className="bg-white border border-orange-200 text-orange-700 font-semibold rounded-lg px-4 py-2 w-full mt-2 hover:bg-orange-50 transition"
        onClick={() => navigate('/discover-habits')}
      >
        Browse Popular Habits
      </button>
      <AddHabitModal open={modalOpen} onClose={() => setModalOpen(false)} onAddHabit={onAddHabit} />
    </div>
  );
};

export default DashboardHeader; 