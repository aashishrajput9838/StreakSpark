import React, { useState } from 'react';

const mockTodos = [
  { icon: '📚', label: 'Study', time: '10:00am', place: 'K-Cafe', done: false },
  { icon: '🛒', label: 'Groceries', time: '02:00pm', place: 'Hayday Market', done: false },
  { icon: '🥦', label: 'Eat Healthy Food', time: '08:30am', place: 'Home', done: true },
  { icon: '📕', label: 'Read a book', time: '08:00am', place: 'Library', done: true },
  { icon: '🏊‍♂️', label: 'Swimming for 45min', time: '06:00am', place: 'Gym Pool', done: false },
];

const TodosWidget: React.FC = () => {
  const [todos, setTodos] = useState(mockTodos);
  const toggleDone = (idx: number) => {
    setTodos(todos => todos.map((t, i) => i === idx ? { ...t, done: !t.done } : t));
  };
  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
      <div className="font-semibold mb-2">Today's Todos</div>
      {todos.map((todo, i) => (
        <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">{todo.icon}</span>
            <span>{todo.label}</span>
            <span className="text-xs text-gray-400">{todo.time}</span>
            <span className="text-xs text-gray-400">{todo.place}</span>
          </div>
          <input type="checkbox" checked={todo.done} onChange={() => toggleDone(i)} className="accent-green-500 w-4 h-4" />
        </div>
      ))}
    </div>
  );
};

export default TodosWidget; 