import React, { useState, useEffect } from 'react';
import { motion, Variants, Transition } from 'framer-motion';
import { Calendar, ChevronRight, Plus, Search, TrendingUp, MapPin, Clock, Home, BookOpen, Utensils, Dumbbell, Car, Music, MoreHorizontal, Edit2, Trash2, Check, X, User, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/contexts/AuthContext';
import AddCompetitionModal from './dashboard/AddCompetitionModal';
import AddHabitModal from './dashboard/AddHabitModal';
import { Competition } from '@/types';
import { useHabits, Habit } from '@/hooks/useHabits';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import LoginWithSpotify from './LoginWithSpotify';
import SpotifyPlayer from './SpotifyPlayer';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
    },
  },
};

const adminUids = ['nL1uSGOcefbt22abnYDD04bn1Ta2']; 

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { habits, createHabit, updateHabit, deleteHabit: deleteHabitFromHook } = useHabits();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingHabit, setEditingHabit] = useState<string | null>(null);
  const [newHabitText, setNewHabitText] = useState('');
  const [weatherData, setWeatherData] = useState<{
    temperature: number;
    condition: string;
    wind: string;
    pressure: string;
    humidity: string;
    city: string;
  } | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [isAddCompetitionModalOpen, setIsAddCompetitionModalOpen] = useState(false);
  const [isAddHabitModalOpen, setIsAddHabitModalOpen] = useState(false);
  const [competitionToEdit, setCompetitionToEdit] = useState<Competition | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [competitionToDelete, setCompetitionToDelete] = useState<number | null>(null);
  const [spotifyToken, setSpotifyToken] = useState<string | null>(null);
  const { toast } = useToast();

  const favoriteHabits = habits.filter(habit => habit.isFavorite);

  useEffect(() => {
    // Check for the Spotify token when the component mounts
    const token = localStorage.getItem('spotifyAccessToken');
    if (token) {
      setSpotifyToken(token);
    }
  }, []);

  const fetchWeather = () => {
    setLoadingWeather(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,weather_code`);
          const weatherApiData = await weatherResponse.json();

          const geoResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const geoData = await geoResponse.json();

          setWeatherData({
            temperature: Math.round(weatherApiData.current.temperature_2m),
            condition: getWeatherIcon(weatherApiData.current.weather_code),
            wind: `${weatherApiData.current.wind_speed_10m.toFixed(1)} km/h`,
            pressure: `${Math.round(weatherApiData.current.pressure_msl)} hPa`,
            humidity: `${weatherApiData.current.relative_humidity_2m}%`,
            city: geoData.city || geoData.locality || 'Unknown Location'
          });
        } catch (error) {
          console.error("Failed to fetch weather data", error);
        } finally {
          setLoadingWeather(false);
        }
      }, (error) => {
        console.error("Error getting location", error);
        setLoadingWeather(false);
        alert("Could not get your location for weather updates. Please enable location services.");
      });
    } else {
      setLoadingWeather(false);
      alert("Geolocation is not supported by this browser.");
    }
  };
  
  const getWeatherIcon = (code: number) => {
    if (code === 0) return '☀️'; // Clear sky
    if (code >= 1 && code <= 3) return '⛅️'; // Mainly clear, partly cloudy, and overcast
    if (code >= 45 && code <= 48) return '🌫️'; // Fog
    if (code >= 51 && code <= 67) return '🌧️'; // Drizzle, Rain
    if (code >= 71 && code <= 77) return '❄️'; // Snow
    if (code >= 80 && code <= 82) return '🌦️'; // Rain showers
    if (code >= 85 && code <= 86) return '🌨️'; // Snow showers
    if (code >= 95 && code <= 99) return '⛈️'; // Thunderstorm
    return '...';
  };

  useEffect(() => {
    fetchWeather();
    const timerId = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timerId);
  }, []);

  const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('en-US', { month: 'short' })} ${currentDate.getFullYear()}`;
  const fullDateTime = `${formattedDate}, ${formattedTime}`;
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const [todos, setTodos] = useState([
    { id: 1, title: 'Study', time: '10:00am', location: 'K-Cafe', icon: '👨‍🎓', completed: false },
    { id: 2, title: 'Groceries', time: '02:00pm', location: 'Heyday Market', icon: '🛒', completed: false },
    { id: 3, title: 'Eat Healthy Food', time: '08:30am', location: 'Home', icon: '🥗', completed: true },
    { id: 4, title: 'Read a book', time: '08:00am', location: 'Library', icon: '📚', completed: true },
    { id: 5, title: 'Swimming for 45min', time: '06:00am', location: 'Gym Pool', icon: '🏊‍♀️', completed: true }
  ]);

  const [shouldDoItems, setShouldDoItems] = useState([
    { id: 1, title: 'We go jimmm!!', icon: '💪', likes: 2000 },
    { id: 2, title: 'The 5am club', icon: '🏃‍♂️', likes: 5400 }
  ]);

  const [competitions, setCompetitions] = useState<Competition[]>([
    { id: 1, name: 'Running Competition', date: '31 Dec', distance: '20miles', time: '09:00', startPoint: 'Starting Point' }
  ]);

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

  const deleteHabit = async (id: string) => {
    await deleteHabitFromHook(id);
  };

  const editHabit = async (id: string, newName: string) => {
    await updateHabit(id, { title: newName });
    setEditingHabit(null);
    setNewHabitText('');
  };

  const addHabit = async () => {
    if (newHabitText.trim()) {
      await createHabit({
        title: newHabitText,
        frequency: 'daily',
        isFavorite: true,
      });
      setNewHabitText('');
    }
  };

  const handleAddCompetition = (newCompetitionData: Omit<Competition, 'id'>) => {
    const newCompetition: Competition = {
      id: competitions.length > 0 ? Math.max(...competitions.map(c => c.id)) + 1 : 1,
      ...newCompetitionData
    };
    setCompetitions(prev => [...prev, newCompetition]);
  };

  const handleEditCompetition = (updatedCompetition: Competition) => {
    setCompetitions(competitions.map(c => c.id === updatedCompetition.id ? updatedCompetition : c));
  };

  const handleDeleteCompetition = () => {
    if (competitionToDelete !== null) {
      setCompetitions(competitions.filter(c => c.id !== competitionToDelete));
      setCompetitionToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const openDeleteConfirmation = (id: number) => {
    setCompetitionToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const openEditCompetitionModal = (competition: Competition) => {
    setCompetitionToEdit(competition);
    setIsAddCompetitionModalOpen(true);
  };

  const openAddCompetitionModal = () => {
    setCompetitionToEdit(null);
    setIsAddCompetitionModalOpen(true);
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
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden text-white"
    >
      <AddCompetitionModal 
        isOpen={isAddCompetitionModalOpen}
        onClose={() => setIsAddCompetitionModalOpen(false)}
        onAddCompetition={handleAddCompetition}
        onEditCompetition={handleEditCompetition}
        competitionToEdit={competitionToEdit}
      />
      <AddHabitModal 
        open={isAddHabitModalOpen}
        onClose={() => setIsAddHabitModalOpen(false)}
      />
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-900/80 backdrop-blur-sm border-red-500/30 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              This action cannot be undone. This will permanently delete the competition
              and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={handleDeleteCompetition} className="bg-red-600 hover:bg-red-700 text-white">
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-fuchsia-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-sky-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-100">
              Good morning, <span className="text-purple-400">{user?.displayName?.split(' ')[0] || 'Guest'}</span>
            </h1>
            <motion.span 
              className="text-4xl"
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            >
              👋
            </motion.span>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-full transition-all duration-300 hover:scale-110">
              <Calendar className="w-5 h-5" />
            </Button>
            {user && user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="User Profile" 
                className="w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 hover:ring-2 hover:ring-purple-500 shadow-lg"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-purple-500/25">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
          </motion.div>
        </div>

        <motion.div variants={containerVariants} className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-3 space-y-6">
            {/* Greeting Card */}
            <Card className="p-6 bg-slate-900/50 backdrop-blur-sm border-purple-400/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 group">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">Happy</h2>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">{dayOfWeek}</h2>
                <motion.span 
                  className="text-2xl"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 15, -10, 15, 0] }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                >
                  👋
                </motion.span>
              </div>
              <p className="text-sm text-slate-400 mb-6">{fullDateTime}</p>
              <Button onClick={() => setIsAddHabitModalOpen(true)} className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white rounded-full border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group-hover:animate-pulse">
                <Plus className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                New Habits
              </Button>
              <div className="mt-4 text-center">
                <button className="text-sm text-slate-400 hover:text-purple-400 transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-purple-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  Browse Popular Habits
                </button>
              </div>
            </Card>

            {/* Calendar */}
            <Card className="p-6 bg-slate-900/50 backdrop-blur-sm border-sky-400/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-100">{monthYear}</h3>
                <Button variant="ghost" size="sm" className="bg-sky-900/30 text-sky-400 rounded-full hover:bg-sky-900/50 transition-all duration-300 hover:scale-110 hover:rotate-12">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-xs text-slate-500 text-center p-2 transition-colors duration-300 hover:text-sky-400">{day}</div>
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
                            ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg shadow-sky-500/25 scale-110' 
                            : 'text-slate-300 hover:bg-slate-800/50'
                          }
                          ${day === 22 ? 'border border-sky-500 animate-pulse' : ''}
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
          </motion.div>

          {/* Center Column */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-6 space-y-6">
            {/* Weather and Today's Todos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weather Card */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-gradient-to-br from-blue-400/20 via-blue-500/20 to-cyan-400/20 border-sky-400/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-slate-100">{weatherData?.city || 'Weather'}</h3>
                    <Button onClick={fetchWeather} variant="ghost" size="sm" className="text-sky-300 hover:bg-sky-900/50 hover:text-sky-200 transition-colors duration-300 rounded-full">
                      {loadingWeather ? 'Updating...' : 'Update'}
                    </Button>
                  </div>
                  {loadingWeather ? (
                    <div className="text-center p-8 text-slate-400">Loading weather...</div>
                  ) : weatherData ? (
                    <div className="text-center">
                      <div className="text-6xl mb-2">{weatherData.condition}</div>
                      <div className="text-5xl font-bold mb-4">{weatherData.temperature}°C</div>
                      <div className="flex justify-around text-sm text-slate-300">
                        <div>
                          <p className="text-slate-400 text-xs">Wind</p>
                          <p>{weatherData.wind}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Pressure</p>
                          <p>{weatherData.pressure}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Humidity</p>
                          <p>{weatherData.humidity}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8 text-slate-400">Could not load weather data.</div>
                  )}
                </Card>
              </motion.div>

              {/* Today's Todos */}
              <Card className="p-6 bg-slate-900/50 backdrop-blur-sm border-blue-400/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-100">Today's Todos</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add todo..."
                      value={newTodoText}
                      onChange={(e) => setNewTodoText(e.target.value)}
                      className="h-8 w-24 text-xs bg-slate-800/50 border-slate-700/50 text-slate-200 transition-all duration-300 focus:scale-105 focus:shadow-lg focus:shadow-blue-500/10"
                      onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    />
                    <Button size="sm" onClick={addTodo} className="h-8 w-8 p-0 bg-gradient-to-r from-blue-500 to-sky-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25">
                      <Plus className="w-3 h-3 transition-transform duration-300 hover:rotate-90" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {todos.map((todo, index) => (
                    <motion.div variants={itemVariants} key={todo.id} className="flex items-center gap-3 group transition-all duration-300 hover:scale-105 hover:bg-slate-800/30 rounded-lg p-2">
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
                            <div className={`font-medium text-sm transition-all duration-300 ${todo.completed ? 'line-through text-slate-500' : 'text-slate-200 group-hover:text-blue-300'}`}>
                              {todo.title}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <Clock className="w-3 h-3 transition-all duration-300 group-hover:text-blue-400" />
                              <span>{todo.time}</span>
                              <MapPin className="w-3 h-3 transition-all duration-300 group-hover:text-blue-400" />
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
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Should Do Section */}
            <Card className="p-6 bg-slate-900/50 backdrop-blur-sm border-pink-400/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-100">Should Do!</h3>
                <button className="text-sm text-slate-400 hover:text-pink-400 transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-pink-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">View Details</button>
              </div>
              <div className="space-y-4">
                {shouldDoItems.map((item, index) => (
                  <motion.div variants={itemVariants} key={item.id} className="flex items-center gap-3 group transition-all duration-300 hover:scale-105 hover:bg-slate-800/30 rounded-lg p-3">
                    <span className="text-2xl transition-all duration-300 group-hover:scale-125">{item.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-slate-200 transition-all duration-300 group-hover:text-pink-300">{item.title}</div>
                      <div className="text-sm text-slate-400">👍 {item.likes.toLocaleString()} love this</div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => likeShouldDoItem(item.id)}
                      className="bg-slate-800/50 hover:bg-pink-700 text-slate-200 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25"
                    >
                      👍 Like
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Nearby Competitions */}
            <Card className="p-6 bg-slate-900/50 backdrop-blur-sm border-purple-400/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-100">Nearby Competitions</h3>
                {user && adminUids.includes(user.uid) && (
                  <Button size="sm" onClick={openAddCompetitionModal} className="bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Competition
                  </Button>
                )}
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {competitions.map((competition) => (
                  <motion.div variants={itemVariants} key={competition.id} className="relative group p-4 rounded-lg transition-all duration-300 hover:bg-slate-800/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-slate-200 mb-3 group-hover:text-purple-300 transition-colors duration-300">{competition.name}</h4>
                        <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                          <div className="flex items-center gap-2 transition-all duration-300 group-hover:text-purple-400">
                            <Calendar className="w-4 h-4" />
                            <span>{competition.date}</span>
                          </div>
                          <div className="flex items-center gap-2 transition-all duration-300 group-hover:text-purple-400">
                            <TrendingUp className="w-4 h-4" />
                            <span>{competition.distance}</span>
                          </div>
                          <div className="flex items-center gap-2 transition-all duration-300 group-hover:text-purple-400">
                            <Clock className="w-4 h-4" />
                            <span>{competition.time}</span>
                          </div>
                        </div>
                      </div>
                      {user && adminUids.includes(user.uid) && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => openEditCompetitionModal(competition)} className="h-8 w-8 p-0 bg-slate-800/50 hover:bg-slate-700 transition-all duration-300 hover:scale-110">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" onClick={() => openDeleteConfirmation(competition.id)} className="h-8 w-8 p-0 bg-red-800/50 hover:bg-red-700 transition-all duration-300 hover:scale-110">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <div className="bg-gradient-to-r from-blue-900/50 to-emerald-900/50 rounded-lg p-6 h-32 border border-slate-800/50 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-blue-500/10">
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                          <span className="text-white text-sm">🏃</span>
                        </div>
                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                          <div className="bg-amber-500 rounded-full w-6 h-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110 animate-pulse">
                            <span className="text-white text-xs">⭐</span>
                          </div>
                          <div className="text-xs text-slate-300 mt-1">{competition.startPoint}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-3 space-y-6">
            {/* Connect Spotify */}
            <Card className="p-6 bg-slate-900/50 backdrop-blur-sm border-emerald-400/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 group">
              {spotifyToken ? <SpotifyPlayer /> : <LoginWithSpotify />}
            </Card>

            {/* Virtual AI Coach */}
            <Card className="p-6 bg-slate-900/50 backdrop-blur-sm border-violet-400/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-100">Virtual AI Coach</h3>
                <button className="text-sm text-slate-400 hover:text-violet-400 transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-violet-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">View Details</button>
              </div>
              
              <div className="group">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-4 text-white text-center transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                  <div className="text-lg mb-2 transition-all duration-300 group-hover:scale-125">🤖</div>
                  <div className="font-semibold mb-1">Get personalized advice</div>
                  <div className="text-sm text-slate-300 mb-3">Your AI assistant is here to help you build better habits and achieve your goals.</div>
                  <Button variant="secondary" size="sm" className="bg-white text-slate-900 hover:bg-slate-100 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                    Get Advice
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
                    <Button size="sm" onClick={addHabit} className="h-8 w-8 p-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25">
                      <Plus className="w-3 h-3 transition-transform duration-300 hover:rotate-90" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {favoriteHabits.map((habit, index) => (
                    <motion.div variants={itemVariants} key={habit.id} className="flex items-center gap-3 group transition-all duration-300 hover:scale-105 hover:bg-slate-800/30 rounded-lg p-2">
                      <div className={`w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center text-white text-xs font-medium transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg`}>
                        {habit.title.slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        {editingHabit === habit.id ? (
                          <div className="flex gap-2">
                            <Input
                              value={newHabitText}
                              onChange= {(e) => setNewHabitText(e.target.value)}
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
                            <div className="text-sm font-medium text-slate-200 transition-all duration-300 group-hover:text-violet-300">{habit.title}</div>
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-slate-400">Streak: {habit.streak}</div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button
                          size="sm"
                          onClick={() => {
                            setEditingHabit(habit.id);
                            setNewHabitText(habit.title);
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
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;