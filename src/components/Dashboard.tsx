
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Search, TrendingUp, MapPin, Clock, Home, BookOpen, Utensils, Dumbbell, Car, Music, MoreHorizontal, Edit2, Trash2, Check, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Dashboard = () => {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(30);
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingHabit, setEditingHabit] = useState<number | null>(null);
  const [newHabitText, setNewHabitText] = useState('');

  const [todos, setTodos] = useState([
    { id: 1, title: 'Study', time: '10:00am', location: 'K-Cafe', icon: '👨‍🎓', completed: false },
    { id: 2, title: 'Groceries', time: '02:00pm', location: 'Heyday Market', icon: '🛒', completed: false },
    { id: 3, title: 'Eat Healthy Food', time: '08:30am', location: 'Home', icon: '🥗', completed: true },
    { id: 4, title: 'Read a book', time: '08:00am', location: 'Library', icon: '📚', completed: true },
    { id: 5, title: 'Swimming for 45min', time: '06:00am', location: 'Gym Pool', icon: '🏊‍♀️', completed: true }
  ]);

  const [favoriteHabits, setFavoriteHabits] = useState([
    { id: 1, name: 'Tennis', progress: 24, color: 'bg-amber-500' },
    { id: 2, name: 'Running', progress: 76, color: 'bg-emerald-500' },
    { id: 3, name: 'Swimming', progress: 45, color: 'bg-blue-500' },
    { id: 4, name: 'Study', progress: 68, color: 'bg-violet-500' },
    { id: 5, name: 'Gym', progress: 32, color: 'bg-pink-500' },
    { id: 6, name: 'Reading', progress: 89, color: 'bg-rose-500' },
    { id: 7, name: 'Design', progress: 56, color: 'bg-indigo-500' }
  ]);

  const [shouldDoItems, setShouldDoItems] = useState([
    { id: 1, title: 'We go jimmm!!', icon: '💪', likes: 2000 },
    { id: 2, title: 'The 5am club', icon: '🏃‍♂️', likes: 5400 }
  ]);

  const [weatherData, setWeatherData] = useState({
    temperature: 12,
    condition: '⛅',
    wind: '2-4 km/h',
    pressure: '102m',
    humidity: '42%'
  });

  const calendar = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31]
  ];

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newTitle: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, title: newTitle } : todo
    ));
    setEditingTodo(null);
    setNewTodoText('');
  };

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo = {
        id: Math.max(...todos.map(t => t.id)) + 1,
        title: newTodoText,
        time: '09:00am',
        location: 'Home',
        icon: '✨',
        completed: false
      };
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    }
  };

  const updateHabitProgress = (id: number, change: number) => {
    setFavoriteHabits(favoriteHabits.map(habit => 
      habit.id === id ? { 
        ...habit, 
        progress: Math.max(0, Math.min(100, habit.progress + change)) 
      } : habit
    ));
  };

  const deleteHabit = (id: number) => {
    setFavoriteHabits(favoriteHabits.filter(habit => habit.id !== id));
  };

  const editHabit = (id: number, newName: string) => {
    setFavoriteHabits(favoriteHabits.map(habit => 
      habit.id === id ? { ...habit, name: newName } : habit
    ));
    setEditingHabit(null);
    setNewHabitText('');
  };

  const addHabit = () => {
    if (newHabitText.trim()) {
      const colors = ['bg-amber-500', 'bg-emerald-500', 'bg-blue-500', 'bg-violet-500', 'bg-pink-500', 'bg-rose-500', 'bg-indigo-500'];
      const newHabit = {
        id: Math.max(...favoriteHabits.map(h => h.id)) + 1,
        name: newHabitText,
        progress: 0,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setFavoriteHabits([...favoriteHabits, newHabit]);
      setNewHabitText('');
    }
  };

  const updateWeather = () => {
    const temperatures = [8, 10, 12, 15, 18, 22];
    const conditions = ['⛅', '☀️', '🌧️', '❄️', '🌤️'];
    setWeatherData({
      ...weatherData,
      temperature: temperatures[Math.floor(Math.random() * temperatures.length)],
      condition: conditions[Math.floor(Math.random() * conditions.length)]
    });
  };

  const likeShouldDoItem = (id: number) => {
    setShouldDoItems(shouldDoItems.map(item => 
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    ));
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-medium text-slate-200">Dashboard</h1>
            <span className="text-slate-600">/</span>
            <span className="text-slate-500">Schedule</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800">
              <Calendar className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800">
              <TrendingUp className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-3 space-y-6">
            {/* Greeting Card */}
            <Card className="p-6 bg-slate-900 border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-slate-100">Happy</h2>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-slate-100">Tuesday</h2>
                <span className="text-2xl">👋</span>
              </div>
              <p className="text-sm text-slate-400 mb-6">30 Dec 2023, 10:03 am</p>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-full border-0">
                <Plus className="w-4 h-4 mr-2" />
                New Habits
              </Button>
              <div className="mt-4 text-center">
                <button className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Browse Popular Habits</button>
              </div>
            </Card>

            {/* Calendar */}
            <Card className="p-6 bg-slate-900 border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-100">December, 2023</h3>
                <Button variant="ghost" size="sm" className="bg-orange-900/30 text-orange-400 rounded-full hover:bg-orange-900/50">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-4">
                <div className="text-xs text-slate-500 text-center p-2">S</div>
                <div className="text-xs text-slate-500 text-center p-2">M</div>
                <div className="text-xs text-slate-500 text-center p-2">T</div>
                <div className="text-xs text-slate-500 text-center p-2">W</div>
                <div className="text-xs text-slate-500 text-center p-2">T</div>
                <div className="text-xs text-slate-500 text-center p-2">F</div>
                <div className="text-xs text-slate-500 text-center p-2">S</div>
              </div>
              <div className="space-y-1">
                {calendar.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 gap-1">
                    {week.map((day, dayIndex) => (
                      <button
                        key={dayIndex}
                        onClick={() => setSelectedDate(day)}
                        className={`
                          text-sm p-2 rounded-lg text-center hover:bg-slate-800 transition-colors
                          ${day === selectedDate ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' : 'text-slate-300'}
                          ${day === 22 ? 'border border-orange-500' : ''}
                        `}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-emerald-400 font-medium">
                +3.2% from last month
              </div>
            </Card>
          </div>

          {/* Center Column */}
          <div className="col-span-6 space-y-6">
            {/* Weather and Today's Todos */}
            <div className="grid grid-cols-2 gap-6">
              {/* Weather Widget */}
              <Card className="p-6 bg-gradient-to-br from-amber-600 to-orange-600 border-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">Weather</h3>
                  <button 
                    onClick={updateWeather}
                    className="text-sm text-orange-100 hover:text-white transition-colors"
                  >
                    Update
                  </button>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{weatherData.condition}</div>
                    <div className="text-3xl font-bold text-white">{weatherData.temperature}°C</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-orange-100">Wind</div>
                    <div className="font-medium text-white">{weatherData.wind}</div>
                  </div>
                  <div>
                    <div className="text-orange-100">Pressure</div>
                    <div className="font-medium text-white">{weatherData.pressure}</div>
                  </div>
                  <div>
                    <div className="text-orange-100">Humidity</div>
                    <div className="font-medium text-white">{weatherData.humidity}</div>
                  </div>
                </div>
              </Card>

              {/* Today's Todos */}
              <Card className="p-6 bg-slate-900 border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-100">Today's Todos</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add todo..."
                      value={newTodoText}
                      onChange={(e) => setNewTodoText(e.target.value)}
                      className="h-8 w-24 text-xs bg-slate-800 border-slate-700 text-slate-200"
                      onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    />
                    <Button size="sm" onClick={addTodo} className="h-8 w-8 p-0 bg-gradient-to-r from-orange-500 to-pink-500">
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {todos.map((todo) => (
                    <div key={todo.id} className="flex items-center gap-3 group">
                      <div className="text-lg">{todo.icon}</div>
                      <div className="flex-1">
                        {editingTodo === todo.id ? (
                          <div className="flex gap-2">
                            <Input
                              value={newTodoText}
                              onChange={(e) => setNewTodoText(e.target.value)}
                              className="h-6 text-xs bg-slate-800 border-slate-700 text-slate-200"
                              onKeyPress={(e) => e.key === 'Enter' && editTodo(todo.id, newTodoText)}
                            />
                            <Button size="sm" onClick={() => editTodo(todo.id, newTodoText)} className="h-6 w-6 p-0">
                              <Check className="w-3 h-3" />
                            </Button>
                            <Button size="sm" onClick={() => setEditingTodo(null)} className="h-6 w-6 p-0">
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className={`font-medium text-sm ${todo.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                              {todo.title}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <Clock className="w-3 h-3" />
                              <span>{todo.time}</span>
                              <MapPin className="w-3 h-3" />
                              <span>{todo.location}</span>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          onClick={() => {
                            setEditingTodo(todo.id);
                            setNewTodoText(todo.title);
                          }}
                          className="h-6 w-6 p-0 bg-slate-800 hover:bg-slate-700"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => deleteTodo(todo.id)}
                          className="h-6 w-6 p-0 bg-red-800 hover:bg-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                          todo.completed 
                            ? 'bg-emerald-500 text-white' 
                            : 'border-2 border-slate-600 hover:border-emerald-500'
                        }`}
                      >
                        {todo.completed && <span className="text-white text-xs">✓</span>}
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Should Do Section */}
            <Card className="p-6 bg-slate-900 border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-100">Should Do!</h3>
                <button className="text-sm text-slate-400 hover:text-slate-200 transition-colors">View Details</button>
              </div>
              <div className="space-y-4">
                {shouldDoItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-slate-200">{item.title}</div>
                      <div className="text-sm text-slate-400">👍 {item.likes.toLocaleString()} love this</div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => likeShouldDoItem(item.id)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200"
                    >
                      👍 Like
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Running Competition */}
            <Card className="p-6 bg-slate-900 border-slate-800">
              <h3 className="font-semibold text-slate-100 mb-4">Running Competition</h3>
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">31 Dec</span>
                <span className="text-sm text-slate-300">20miles</span>
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">09:00</span>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-900/50 to-emerald-900/50 rounded-lg p-6 h-32 border border-slate-800">
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-white text-sm">🏃</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-amber-500 rounded-full w-6 h-6 flex items-center justify-center">
                      <span className="text-white text-xs">⭐</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Starting Point</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-3 space-y-6">
            {/* Connect Spotify */}
            <Card className="p-6 bg-slate-900 border-slate-800">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-100 mb-2">Connect your</h3>
                <h3 className="font-semibold text-slate-100 mb-2">Spotify account</h3>
                <p className="text-sm text-slate-400 mb-4">Empower yourself with habit tracking while enjoying uninterrupted music</p>
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg border border-slate-700">
                  <Music className="w-4 h-4 mr-2" />
                  Link Account
                </Button>
              </div>
            </Card>

            {/* Analytics */}
            <Card className="p-6 bg-slate-900 border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-100">Analytics</h3>
                <button className="text-sm text-slate-400 hover:text-slate-200 transition-colors">View Details</button>
              </div>
              
              {/* Positive Habits */}
              <div className="mb-6">
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg p-4 mb-3">
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-lg">😊</span>
                    <span className="text-sm">Positive Habits</span>
                  </div>
                  <div className="text-2xl font-bold text-white mt-2">+58.2%</div>
                </div>
              </div>

              {/* Habits Wrapped 2023 */}
              <div className="mb-6">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-4 text-white text-center">
                  <div className="text-lg mb-2">🎁</div>
                  <div className="font-semibold mb-1">Habits</div>
                  <div className="font-semibold mb-1">Wrapped</div>
                  <div className="text-2xl font-bold mb-3">2023</div>
                  <Button variant="secondary" size="sm" className="bg-white text-slate-900 hover:bg-slate-100">
                    View
                  </Button>
                </div>
              </div>

              {/* Favorite Habits */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-slate-100">Favorite Habits</h4>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="New habit..."
                      value={newHabitText}
                      onChange={(e) => setNewHabitText(e.target.value)}
                      className="h-8 w-24 text-xs bg-slate-800 border-slate-700 text-slate-200"
                      onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                    />
                    <Button size="sm" onClick={addHabit} className="h-8 w-8 p-0 bg-gradient-to-r from-orange-500 to-pink-500">
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {favoriteHabits.map((habit) => (
                    <div key={habit.id} className="flex items-center gap-3 group">
                      <div className={`w-8 h-8 ${habit.color} rounded-lg flex items-center justify-center text-white text-xs font-medium`}>
                        {habit.name.slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        {editingHabit === habit.id ? (
                          <div className="flex gap-2">
                            <Input
                              value={newHabitText}
                              onChange={(e) => setNewHabitText(e.target.value)}
                              className="h-6 text-xs bg-slate-800 border-slate-700 text-slate-200"
                              onKeyPress={(e) => e.key === 'Enter' && editHabit(habit.id, newHabitText)}
                            />
                            <Button size="sm" onClick={() => editHabit(habit.id, newHabitText)} className="h-6 w-6 p-0">
                              <Check className="w-3 h-3" />
                            </Button>
                            <Button size="sm" onClick={() => setEditingHabit(null)} className="h-6 w-6 p-0">
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="text-sm font-medium text-slate-200">{habit.name}</div>
                            <div className="text-xs text-slate-400">{habit.progress}%</div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          onClick={() => updateHabitProgress(habit.id, -5)}
                          className="h-6 w-6 p-0 bg-slate-800 hover:bg-slate-700"
                        >
                          -
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateHabitProgress(habit.id, 5)}
                          className="h-6 w-6 p-0 bg-slate-800 hover:bg-slate-700"
                        >
                          +
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setEditingHabit(habit.id);
                            setNewHabitText(habit.name);
                          }}
                          className="h-6 w-6 p-0 bg-slate-800 hover:bg-slate-700"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => deleteHabit(habit.id)}
                          className="h-6 w-6 p-0 bg-red-800 hover:bg-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;