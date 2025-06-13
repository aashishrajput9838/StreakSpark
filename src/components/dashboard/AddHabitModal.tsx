import React, { useState } from 'react';

interface AddHabitModalProps {
  open: boolean;
  onClose: () => void;
  onAddHabit: (habit: any) => void;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({ open, onClose, onAddHabit }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    timeEstimate: '',
    icon: '🎯',
  });

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.category || !form.timeEstimate) {
      alert('Please fill in all fields');
      return;
    }
    onAddHabit(form);
    setForm({ title: '', description: '', category: '', timeEstimate: '', icon: '🎯' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <h2 className="text-xl font-bold mb-4">Add New Habit</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Enter habit title" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Describe your habit" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Select category</option>
              <option value="fitness">Fitness</option>
              <option value="mindfulness">Mindfulness</option>
              <option value="learning">Learning</option>
              <option value="productivity">Productivity</option>
              <option value="social">Social</option>
              <option value="creativity">Creativity</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time Estimate</label>
            <select name="timeEstimate" value={form.timeEstimate} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Select time estimate</option>
              <option value="30 sec">30 seconds</option>
              <option value="1 min">1 minute</option>
              <option value="2 min">2 minutes</option>
              <option value="3 min">3 minutes</option>
              <option value="5 min">5 minutes</option>
              <option value="10 min">10 minutes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Icon</label>
            <input name="icon" value={form.icon} onChange={handleChange} className="w-16 border rounded px-3 py-2 text-center text-2xl" maxLength={2} />
          </div>
          <button type="submit" className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg px-4 py-2 transition">Add Habit</button>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal; 