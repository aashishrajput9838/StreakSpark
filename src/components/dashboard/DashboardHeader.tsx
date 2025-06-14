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
    <div className="bg-appPalette-dark-card rounded-xl p-6 shadow flex flex-col gap-4 text-appPalette-dark-text">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <span>Happy {day} 👋</span>
      </div>
      <div className="text-appPalette-dark-muted text-sm">{date}, {time}</div>
      <button className="bg-appPalette-orange hover:bg-appPalette-pink text-white font-semibold rounded-lg px-4 py-2 w-full transition" onClick={() => setModalOpen(true)}>+ New Habits</button>
      <button 
        className="bg-transparent border border-appPalette-orange text-appPalette-orange font-semibold rounded-lg px-4 py-2 w-full mt-2 hover:bg-appPalette-orange hover:text-white transition"
        onClick={() => navigate('/discover-habits')}
      >
        Browse Popular Habits
      </button>
      <AddHabitModal open={modalOpen} onClose={() => setModalOpen(false)} onAddHabit={onAddHabit} />
    </div>
  );
};

export default DashboardHeader; 