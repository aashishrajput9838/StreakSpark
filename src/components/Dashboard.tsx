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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Dashboard</h1>
            <span className="text-slate-600">/</span>
            <span className="text-slate-500">Schedule</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-300 hover:scale-110 hover:rotate-12">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-300 hover:scale-110">
              <Calendar className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-300 hover:scale-110">
              <TrendingUp className="w-4 h-4" />
            </Button>
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-orange-500/25"></div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-3 space-y-6">
            {/* Greeting Card */}
            <Card className="p-6 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 animate-fade-in group">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">Happy</h2>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">Tuesday</h2>
                <span className="text-2xl animate-bounce">👋</span>
              </div>
              <p className="text-sm text-slate-400 mb-6">30 Dec 2023, 10:03 am</p>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-full border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 group-hover:animate-pulse">
                <Plus className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                New Habits
              </Button>
              <div className="mt-4 text-center">
                <button className="text-sm text-slate-400 hover:text-orange-400 transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-orange-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  Browse Popular Habits
                </button>
              </div>
            </Card>

            {/* Calendar */}
            <Card className="p-6 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-100">December, 2023</h3>
                <Button variant="ghost" size="sm" className="bg-orange-900/30 text-orange-400 rounded-full hover:bg-orange-900/50 transition-all duration-300 hover:scale-110 hover:rotate-12">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-xs text-slate-500 text-center p-2 transition-colors duration-300 hover:text-orange-400">{day}</div>
                ))}
              </div>
              <div className="space-y-1">
                {calendar.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 gap-1">
                    {week.map((day, dayIndex) => (
                      <button
                        key={dayIndex}
                        onClick={() => setSelectedDate(day)}
                        className={`
                          text-sm p-2 rounded-lg text-center transition-all duration-300 hover:scale-110 hover:shadow-lg
                          ${day === selectedDate 
                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/25 scale-110' 
                            : 'text-slate-300 hover:bg-slate-800/50'
                          }
                          ${day === 22 ? 'border border-orange-500 animate-pulse' : ''}
                        `}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-emerald-400 font-medium animate-pulse">
                +3.2% from last month
              </div>
            </Card>
          </div>

          {/* Center Column */}
          <div className="col-span-6 space-y-6">
            {/* Weather and Today's Todos */}
            <div className="grid grid-cols-2 gap-6">
              {/* Weather Widget */}
              <Card className="p-6 bg-gradient-to-br from-amber-600 via-orange-600 to-pink-600 border-0 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 animate-fade-in group" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">Weather</h3>
                  <button 
                    onClick={updateWeather}
                    className="text-sm text-orange-100 hover:text-white transition-all duration-300 hover:scale-110 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                  >
                    Update
                  </button>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="text-5xl mb-2 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">{weatherData.condition}</div>
                    <div className="text-4xl font-bold text-white transition-all duration-300 group-hover:scale-110">{weatherData.temperature}°C</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="transition-all duration-300 hover:scale-105">
                    <div className="text-orange-100">Wind</div>
                    <div className="font-medium text-white">{weatherData.wind}</div>
                  </div>
                  <div className="transition-all duration-300 hover:scale-105">
                    <div className="text-orange-100">Pressure</div>
                    <div className="font-medium text-white">{weatherData.pressure}</div>
                  </div>
                  <div className="transition-all duration-300 hover:scale-105">
                    <div className="text-orange-100">Humidity</div>
                    <div className="font-medium text-white">{weatherData.humidity}</div>
                  </div>
                </div>
              </Card>

              {/* Today's Todos */}
              <Card className="p-6 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-100">Today's Todos</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add todo..."
                      value={newTodoText}
                      onChange={(e) => setNewTodoText(e.target.value)}
                      className="h-8 w-24 text-xs bg-slate-800/50 border-slate-700/50 text-slate-200 transition-all duration-300 focus:scale-105 focus:shadow-lg focus:shadow-orange-500/10"
                      onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    />
                    <Button size="sm" onClick={addTodo} className="h-8 w-8 p-0 bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25">
                      <Plus className="w-3 h-3 transition-transform duration-300 hover:rotate-90" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {todos.map((todo, index) => (
                    <div key={todo.id} className="flex items-center gap-3 group transition-all duration-300 hover:scale-105 hover:bg-slate-800/30 rounded-lg p-2 animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                      <div className="text-lg transition-all duration-300 group-hover:scale-125">{todo.icon}</div>
                      <div className="flex-1">
                        {editingTodo === todo.id ? (
                          <div className="flex gap-2">
                            <Input
                              value={newTodoText}
                              onChange={(e) => setNewTodoText(e.target.value)}
                              className="h-6 text-xs bg-slate-800/50 border-slate-700/50 text-slate-200"
                              onKeyPress={(e) => e.key === 'Enter' && editTodo(todo.id, newTodoText)}
                            />
                            <Button size="sm" onClick={() => editTodo(todo.id, newTodoText)} className="h-6 w-6 p-0 transition-all duration-300 hover:scale-110">
                              <Check className="w-3 h-3" />
                            </Button>
                            <Button size="sm" onClick={() => setEditingTodo(null)} className="h-6 w-6 p-0 transition-all duration-300 hover:scale-110">
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className={`font-medium text-sm transition-all duration-300 ${todo.completed ? 'line-through text-slate-500' : 'text-slate-200 group-hover:text-orange-300'}`}>
                              {todo.title}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <Clock className="w-3 h-3 transition-all duration-300 group-hover:text-orange-400" />
                              <span>{todo.time}</span>
                              <MapPin className="w-3 h-3 transition-all duration-300 group-hover:text-orange-400" />
                              <span>{todo.location}</span>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button
                          size="sm"
                          onClick={() => {
                            setEditingTodo(todo.id);
                            setNewTodoText(todo.title);
                          }}
                          className="h-6 w-6 p-0 bg-slate-800/50 hover:bg-slate-700 transition-all duration-300 hover:scale-110"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => deleteTodo(todo.id)}
                          className="h-6 w-6 p-0 bg-red-800/50 hover:bg-red-700 transition-all duration-300 hover:scale-110"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                          todo.completed 
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' 
                            : 'border-2 border-slate-600 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/25'
                        }`}
                      >
                        {todo.completed && <span className="text-white text-xs animate-bounce">✓</span>}
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Should Do Section */}
            <Card className="p-6 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-100">Should Do!</h3>
                <button className="text-sm text-slate-400 hover:text-purple-400 transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-purple-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">View Details</button>
              </div>
              <div className="space-y-4">
                {shouldDoItems.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-3 group transition-all duration-300 hover:scale-105 hover:bg-slate-800/30 rounded-lg p-3 animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                    <span className="text-2xl transition-all duration-300 group-hover:scale-125">{item.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-slate-200 transition-all duration-300 group-hover:text-purple-300">{item.title}</div>
                      <div className="text-sm text-slate-400">👍 {item.likes.toLocaleString()} love this</div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => likeShouldDoItem(item.id)}
                      className="bg-slate-800/50 hover:bg-purple-700 text-slate-200 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                      👍 Like
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Running Competition */}
            <Card className="p-6 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <h3 className="font-semibold text-slate-100 mb-4">Running Competition</h3>
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="w-4 h-4 text-slate-400 transition-all duration-300 hover:text-blue-400" />
                <span className="text-sm text-slate-300">31 Dec</span>
                <span className="text-sm text-slate-300">20miles</span>
                <Clock className="w-4 h-4 text-slate-400 transition-all duration-300 hover:text-blue-400" />
                <span className="text-sm text-slate-300">09:00</span>
              </div>
              <div className="relative group">
                <div className="bg-gradient-to-r from-blue-900/50 to-emerald-900/50 rounded-lg p-6 h-32 border border-slate-800/50 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-blue-500/10">
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <span className="text-white text-sm">🏃</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-amber-500 rounded-full w-6 h-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110 animate-pulse">
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
            <Card className="p-6 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 animate-fade-in group" style={{ animationDelay: '0.6s' }}>
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg shadow-emerald-500/25">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-100 mb-2">Connect your</h3>
                <h3 className="font-semibold text-slate-100 mb-2">Spotify account</h3>
                <p className="text-sm text-slate-400 mb-4 transition-all duration-300 group-hover:text-slate-300">Empower yourself with habit tracking while enjoying uninterrupted music</p>
                <Button className="w-full bg-slate-800/50 hover:bg-emerald-700 text-slate-100 rounded-lg border border-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25">
                  <Music className="w-4 h-4 mr-2 transition-transform duration-300 hover:rotate-12" />
                  Link Account
                </Button>
              </div>
            </Card>

            {/* Analytics */}
            <Card className="p-6 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/10 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-100">Analytics</h3>
                <button className="text-sm text-slate-400 hover:text-violet-400 transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-violet-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">View Details</button>
              </div>
              
              {/* Positive Habits */}
              <div className="mb-6 group">
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg p-4 mb-3 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25">
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-lg transition-all duration-300 group-hover:scale-125">😊</span>
                    <span className="text-sm">Positive Habits</span>
                  </div>
                  <div className="text-2xl font-bold text-white mt-2 transition-all duration-300 group-hover:scale-110">+58.2%</div>
                </div>
              </div>

              {/* Habits Wrapped 2023 */}
              <div className="mb-6 group">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-4 text-white text-center transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                  <div className="text-lg mb-2 transition-all duration-300 group-hover:scale-125">🎁</div>
                  <div className="font-semibold mb-1">Habits</div>
                  <div className="font-semibold mb-1">Wrapped</div>
                  <div className="text-2xl font-bold mb-3 transition-all duration-300 group-hover:scale-110">2023</div>
                  <Button variant="secondary" size="sm" className="bg-white text-slate-900 hover:bg-slate-100 transition-all duration-300 hover:scale-110 hover:shadow-lg">
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
                      className="h-8 w-24 text-xs bg-slate-800/50 border-slate-700/50 text-slate-200 transition-all duration-300 focus:scale-105 focus:shadow-lg focus:shadow-violet-500/10"
                      onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                    />
                    <Button size="sm" onClick={addHabit} className="h-8 w-8 p-0 bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25">
                      <Plus className="w-3 h-3 transition-transform duration-300 hover:rotate-90" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {favoriteHabits.map((habit, index) => (
                    <div key={habit.id} className="flex items-center gap-3 group transition-all duration-300 hover:scale-105 hover:bg-slate-800/30 rounded-lg p-2 animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                      <div className={`w-8 h-8 ${habit.color} rounded-lg flex items-center justify-center text-white text-xs font-medium transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg`}>
                        {habit.name.slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        {editingHabit === habit.id ? (
                          <div className="flex gap-2">
                            <Input
                              value={newHabitText}
                              onChange={(e) => setNewHabitText(e.target.value)}
                              className="h-6 text-xs bg-slate-800/50 border-slate-700/50 text-slate-200"
                              onKeyPress={(e) => e.key === 'Enter' && editHabit(habit.id, newHabitText)}
                            />
                            <Button size="sm" onClick={() => editHabit(habit.id, newHabitText)} className="h-6 w-6 p-0 transition-all duration-300 hover:scale-110">
                              <Check className="w-3 h-3" />
                            </Button>
                            <Button size="sm" onClick={() => setEditingHabit(null)} className="h-6 w-6 p-0 transition-all duration-300 hover:scale-110">
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="text-sm font-medium text-slate-200 transition-all duration-300 group-hover:text-violet-300">{habit.name}</div>
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-slate-400">{habit.progress}%</div>
                              <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${habit.color} transition-all duration-500 group-hover:animate-pulse`}
                                  style={{ width: `${habit.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button
                          size="sm"
                          onClick={() => updateHabitProgress(habit.id, -5)}
                          className="h-6 w-6 p-0 bg-slate-800/50 hover:bg-slate-700 transition-all duration-300 hover:scale-110"
                        >
                          -
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateHabitProgress(habit.id, 5)}
                          className="h-6 w-6 p-0 bg-slate-800/50 hover:bg-slate-700 transition-all duration-300 hover:scale-110"
                        >
                          +
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setEditingHabit(habit.id);
                            setNewHabitText(habit.name);
                          }}
                          className="h-6 w-6 p-0 bg-slate-800/50 hover:bg-slate-700 transition-all duration-300 hover:scale-110"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => deleteHabit(habit.id)}
                          className="h-6 w-6 p-0 bg-red-800/50 hover:bg-red-700 transition-all duration-300 hover:scale-110"
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