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
import YouTubeMusicPlayer from './YouTubeMusicPlayer';
import FriendsLeaderboardWidget from './dashboard/FriendsLeaderboardWidget';
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, collection, onSnapshot, runTransaction, query, orderBy, addDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';

interface UserProfile {
  displayName: string;
  photoURL: string;
}

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  icon?: string;
  createdAt?: any;
}

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
  const { user, logout } = useAuthContext();
  const { habits, createHabit, updateHabit, deleteHabit: deleteHabitFromHook } = useHabits();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingHabit, setEditingHabit] = useState<string | null>(null);
  const [newHabitText, setNewHabitText] = useState('');
  const [editingHabitText, setEditingHabitText] = useState('');
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
  const [loadingHabits, setLoadingHabits] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const db = getFirestore();

  const changeMonth = (direction: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const calendarDays = [];
    let week: (number | null)[] = [];

    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      if (week.length === 7) {
        calendarDays.push(week);
        week = [];
      }
      week.push(day);
    }

    // Add empty cells for the remaining days of the week
    while (week.length < 7) {
      week.push(null);
    }
    calendarDays.push(week);

    return calendarDays;
  };

  const favoriteHabits = habits.filter(habit => habit.isFavorite);

  const [shouldDoItems, setShouldDoItems] = useState([
    { id: 1, title: 'We go jimmm!!', icon: '💪', likes: 0 },
    { id: 2, title: 'The 5am club', icon: '🏃‍♂️', likes: 0 }
  ]);
  const [userLikes, setUserLikes] = useState<{ [itemId: number]: boolean }>({});

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setUserProfile(doc.data() as UserProfile);
        } else {
          console.log("User profile not found in Firestore");
        }
        setLoadingProfile(false);
      });
      return () => unsubscribe();
    } else {
      setLoadingProfile(false);
    }
  }, [user, db]);

  const fetchWeather = () => {
    setLoadingWeather(true);
    setWeatherError(null);
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
          setWeatherError("Failed to load weather data");
        } finally {
          setLoadingWeather(false);
        }
      }, (error) => {
        console.error("Error getting location", error);
        setLoadingWeather(false);
        setWeatherError("Location access denied. Please enable location services.");
      });
    } else {
      setLoadingWeather(false);
      setWeatherError("Geolocation is not supported by this browser.");
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
    // Check for the Spotify token when the component mounts
    const token = localStorage.getItem('spotifyAccessToken');
    if (token) {
      setSpotifyToken(token);
    }
  }, []);

  const [competitions, setCompetitions] = useState<Competition[]>([
    { id: 1, name: 'Running Competition', date: '31 Dec', distance: '20miles', time: '09:00', startPoint: 'Starting Point' }
  ]);

  const calendar = generateCalendar(currentDate);

  useEffect(() => {
    if (!user) {
      setTodos([]);
      return;
    }
    const todosCollectionRef = collection(db, 'users', user.uid, 'todos');
    const q = query(todosCollectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userTodos: Todo[] = [];
      querySnapshot.forEach((doc) => {
        userTodos.push({ id: doc.id, ...doc.data() } as Todo);
      });
      setTodos(userTodos);
    });

    return () => unsubscribe();
  }, [user]);

  const toggleTodo = async (id: string) => {
    if (!user) return;
    const todoDocRef = doc(db, 'users', user.uid, 'todos', id);
    const todoToToggle = todos.find(t => t.id === id);
    if (todoToToggle) {
      await updateDoc(todoDocRef, {
        completed: !todoToToggle.completed
      });
    }
  };

  const deleteTodo = async (id: string) => {
    if (!user) return;
    const todoDocRef = doc(db, 'users', user.uid, 'todos', id);
    await deleteDoc(todoDocRef);
  };

  const editTodo = async (id: string, newTitle: string) => {
    if (!user) return;
    if (newTitle.trim()) {
      const todoDocRef = doc(db, 'users', user.uid, 'todos', id);
      await updateDoc(todoDocRef, {
        title: newTitle.trim()
      });
    }
    setEditingTodo(null);
    setNewTodoText('');
  };

  const addTodo = async () => {
    if (newTodoText.trim() && user) {
      const todosCollectionRef = collection(db, 'users', user.uid, 'todos');
      await addDoc(todosCollectionRef, {
        title: newTodoText.trim(),
        completed: false,
        icon: '✨',
        createdAt: serverTimestamp(),
      });
      setNewTodoText('');
    }
  };

  const deleteHabit = async (id: string) => {
    setLoadingHabits(true);
    try {
      await deleteHabitFromHook(id);
      toast({
        title: "Success!",
        description: "Habit deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting habit:', error);
      toast({
        title: "Error",
        description: "Failed to delete habit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingHabits(false);
    }
  };

  const editHabit = async (id: string, newName: string) => {
    if (newName.trim()) {
      setLoadingHabits(true);
      try {
        await updateHabit(id, { title: newName.trim() });
        setEditingHabit(null);
        setEditingHabitText('');
        toast({
          title: "Success!",
          description: "Habit updated successfully.",
        });
      } catch (error) {
        console.error('Error updating habit:', error);
        toast({
          title: "Error",
          description: "Failed to update habit. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoadingHabits(false);
      }
    }
  };

  const addHabit = async () => {
    if (newHabitText.trim()) {
      setLoadingHabits(true);
      try {
        await createHabit({
          title: newHabitText.trim(),
          frequency: 'daily',
          isFavorite: true,
        });
        setNewHabitText('');
        toast({
          title: "Success!",
          description: "New habit created successfully.",
        });
      } catch (error) {
        console.error('Error creating habit:', error);
        toast({
          title: "Error",
          description: "Failed to create habit. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoadingHabits(false);
      }
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

  useEffect(() => {
    // Fetch like counts and user-like status from Firestore
    const unsubLikes = shouldDoItems.map(item => {
      const itemRef = doc(db, 'shouldDoLikes', String(item.id));
      const userLikeRef = doc(db, 'shouldDoLikes', String(item.id), 'users', user?.uid || 'anon');
      // Listen for like count changes
      const unsubItem = onSnapshot(itemRef, (docSnap) => {
        if (docSnap.exists()) {
          setShouldDoItems(prev => prev.map(i => i.id === item.id ? { ...i, likes: docSnap.data().likeCount || 0 } : i));
        }
      });
      // Listen for user like status
      const unsubUser = onSnapshot(userLikeRef, (docSnap) => {
        setUserLikes(prev => ({ ...prev, [item.id]: docSnap.exists() }));
      });
      return () => { unsubItem(); unsubUser(); };
    });
    return () => { unsubLikes.forEach(unsub => unsub()); };
  }, [user]);

  const likeShouldDoItem = async (id: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to like an item.",
        variant: "destructive",
      });
      return;
    }

    const itemDocRef = doc(db, 'shouldDoLikes', String(id));
    const userLikeRef = doc(db, 'shouldDoLikes', String(id), 'users', user.uid);

    try {
      await runTransaction(db, async (transaction) => {
        const userLikeDoc = await transaction.get(userLikeRef);
        if (userLikeDoc.exists()) {
          // Throw a custom error to be caught outside the transaction
          throw new Error("ALREADY_LIKED");
        }

        const itemDoc = await transaction.get(itemDocRef);
        if (!itemDoc.exists()) {
          transaction.set(itemDocRef, { likeCount: 1 });
        } else {
          transaction.update(itemDocRef, { likeCount: increment(1) });
        }
        transaction.set(userLikeRef, { likedAt: new Date() });
      });

      // If the transaction succeeds, provide success feedback
      toast({
        title: "Success!",
        description: "You've liked this item.",
      });
      // Immediately update the UI to disable the button
      setUserLikes(prev => ({ ...prev, [id]: true }));

    } catch (error: any) {
      if (error.message === "ALREADY_LIKED") {
        toast({
          title: "Already Liked",
          description: "You have already liked this item.",
        });
        // Ensure the button is disabled if the user has already liked it
        setUserLikes(prev => ({ ...prev, [id]: true }));
      } else {
        console.error("Error liking item:", error);
        toast({
          title: "Error",
          description: "Could not like the item. Please try again.",
          variant: "destructive",
        });
      }
    }
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
              {user ? (
                <>
                  Good morning, <span className="text-purple-400">
                    {userProfile?.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'User'}
                  </span>
                </>
              ) : (
                <>
                  Welcome to <span className="text-purple-400">StreakSpark</span>
                </>
              )}
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
            {user ? (
              <div className="flex items-center gap-4">
                {loadingProfile ? (
                  <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
                ) : user ? (
              <div className="flex items-center gap-2">
                    {userProfile?.photoURL ? (
                  <img 
                        src={userProfile.photoURL} 
                    alt="User Profile" 
                    className="w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 hover:ring-2 hover:ring-purple-500 shadow-lg"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-purple-500/25">
                    <span className="text-white text-sm font-medium">
                          {userProfile?.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
                    <div className="text-left hidden md:block">
                      <p className="text-sm font-semibold text-gray-200">
                        {userProfile?.displayName || user.email}
                      </p>
                      <p className="text-xs text-gray-400">Pro Member</p>
                    </div>
                  </div>
                ) : (
                  <Button onClick={() => navigate('/login')}>Login</Button>
                )}
              </div>
            ) : (
              <Button 
                onClick={() => navigate('/login')} 
                className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Sign In
              </Button>
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{monthYear}</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => changeMonth(-1)} className="w-8 h-8 rounded-full hover:bg-appPalette-dark-background">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => changeMonth(1)} className="w-8 h-8 rounded-full hover:bg-appPalette-dark-background">
                    <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-xs text-appPalette-dark-muted">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day}>{day}</div>)}
              </div>
              <div className="mt-2 grid grid-cols-7 gap-y-2 text-center text-sm">
                {calendar.flat().map((day, index) => (
                  <div key={index} className={`p-1 flex justify-center items-center h-8 ${day ? 'cursor-pointer' : ''}`}>
                    {day && (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                          ${day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear() ? 'bg-appPalette-purple text-white font-bold shadow-lg' : ''}
                          ${day === selectedDate ? 'ring-2 ring-appPalette-purple' : ''}
                          hover:bg-appPalette-purple/20
                        `}
                        onClick={() => day && setSelectedDate(day)}
                      >
                        {day}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm">
                <p className="text-green-400">+3.2% from last month</p>
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
                  ) : weatherError ? (
                    <div className="text-center p-8">
                      <div className="text-4xl mb-2">🌤️</div>
                      <div className="text-sm text-slate-400 mb-2">{weatherError}</div>
                      <Button onClick={fetchWeather} size="sm" className="bg-sky-600 hover:bg-sky-700 text-white">
                        Retry
                      </Button>
                    </div>
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
                        <p className={`transition-colors duration-300 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                        {editingTodo === todo.id ? (
                            <Input
                              type="text"
                              value={newTodoText}
                              onChange={(e) => setNewTodoText(e.target.value)}
                              onBlur={() => editTodo(todo.id, newTodoText)}
                              onKeyDown={(e) => e.key === 'Enter' && editTodo(todo.id, newTodoText)}
                              className="bg-gray-800 border-none focus:ring-2 focus:ring-purple-500"
                              autoFocus
                            />
                          ) : (
                            todo.title
                          )}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{new Date(todo.createdAt?.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          <MapPin className="w-3 h-3 mr-1 ml-3" />
                          <span>Nowhere</span>
                            </div>
                            </div>
                      <div className="flex items-center space-x-2">
                        {editingTodo === todo.id ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => {
                                setEditingTodo(null);
                                setNewTodoText(todo.title);
                              }}
                              className="h-6 w-6 p-0 bg-slate-800/50 hover:bg-slate-700 transition-all duration-300 hover:scale-110"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
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
                      disabled={userLikes[item.id]}
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
              <YouTubeMusicPlayer />
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
                    <Button size="sm" onClick={addHabit} disabled={loadingHabits} className="h-8 w-8 p-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed">
                      {loadingHabits ? (
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Plus className="w-3 h-3 transition-transform duration-300 hover:rotate-90" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {favoriteHabits.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">🌟</div>
                      <p className="text-slate-400 text-sm">No favorite habits yet. Create your first habit!</p>
                    </div>
                  ) : (
                    favoriteHabits.map((habit, index) => (
                      <motion.div variants={itemVariants} key={habit.id} className="flex items-center gap-3 group transition-all duration-300 hover:scale-105 hover:bg-slate-800/30 rounded-lg p-2">
                        <div className={`w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center text-white text-xs font-medium transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg`}>
                          {habit.title.slice(0, 2)}
                        </div>
                        <div className="flex-1">
                          {editingHabit === habit.id ? (
                            <div className="flex gap-2">
                              <Input
                                value={editingHabitText}
                                onChange={(e) => setEditingHabitText(e.target.value)}
                                className="h-6 text-xs bg-slate-800/50 border-slate-700/50 text-slate-200"
                                onKeyPress={(e) => e.key === 'Enter' && editHabit(habit.id, editingHabitText)}
                              />
                              <Button size="sm" onClick={() => editHabit(habit.id, editingHabitText)} className="h-6 w-6 p-0 transition-all duration-300 hover:scale-110">
                                <Check className="w-3 h-3" />
                              </Button>
                              <Button size="sm" onClick={() => {
                                setEditingHabit(null);
                                setEditingHabitText('');
                              }} className="h-6 w-6 p-0 transition-all duration-300 hover:scale-110">
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
                              setEditingHabitText(habit.title);
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
                    ))
                  )}
                </div>
              </div>
            </Card>

            {/* Friends Leaderboard */}
            <Card className="p-6 bg-slate-900/50 backdrop-blur-sm border-pink-400/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-100">Friends Leaderboard</h3>
                <button className="text-sm text-slate-400 hover:text-pink-400 transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-pink-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">View Details</button>
              </div>
              <FriendsLeaderboardWidget />
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;