import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthContext } from '@/contexts/AuthContext';
import { addDocument, updateDocument, deleteDocument } from '@/lib/firebase-utils';

export interface Habit {
  id: string;
  title: string;
  name?: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  userId: string;
  createdAt: Date;
  completedDates: string[];
  streak: number;
  lastCompleted?: Date;
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      setHabits([]);
      setLoading(false);
      return;
    }

    const habitsQuery = query(
      collection(db, 'habits'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      habitsQuery,
      (snapshot) => {
        const habitsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          lastCompleted: doc.data().lastCompleted?.toDate(),
          name: doc.data().title,
        })) as Habit[];
        setHabits(habitsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching habits:', error);
        setError('Failed to fetch habits');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const createHabit = async (habitData: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'completedDates' | 'streak' | 'lastCompleted'> & { title: string }) => {
    if (!user) throw new Error('User must be logged in');

    try {
      const newHabit = {
        ...habitData,
        userId: user.uid,
        createdAt: new Date(),
        completedDates: [],
        streak: 0,
      };
      await addDocument('habits', newHabit);
    } catch (error) {
      console.error('Error creating habit:', error);
      throw new Error('Failed to create habit');
    }
  };

  const updateHabit = async (habitId: string, updates: Partial<Habit>) => {
    if (!user) throw new Error('User must be logged in');

    try {
      await updateDocument('habits', habitId, updates);
    } catch (error) {
      console.error('Error updating habit:', error);
      throw new Error('Failed to update habit');
    }
  };

  const deleteHabit = async (habitId: string) => {
    if (!user) throw new Error('User must be logged in');

    try {
      await deleteDocument('habits', habitId);
    } catch (error) {
      console.error('Error deleting habit:', error);
      throw new Error('Failed to delete habit');
    }
  };

  const toggleHabitCompletion = async (habitId: string, date: string) => {
    if (!user) throw new Error('User must be logged in');

    try {
      const habit = habits.find(h => h.id === habitId);
      if (!habit) throw new Error('Habit not found');

      const completedDates = habit.completedDates || [];
      const isCompleted = completedDates.includes(date);
      const newCompletedDates = isCompleted
        ? completedDates.filter(d => d !== date)
        : [...completedDates, date];

      // Calculate streak
      let newStreak = habit.streak;
      if (!isCompleted) {
        // If completing today, increment streak
        if (date === new Date().toISOString().split('T')[0]) {
          newStreak += 1;
        }
      } else {
        // If uncompleting today, decrement streak
        if (date === new Date().toISOString().split('T')[0]) {
          newStreak = Math.max(0, newStreak - 1);
        }
      }

      await updateDocument('habits', habitId, {
        completedDates: newCompletedDates,
        streak: newStreak,
        lastCompleted: isCompleted ? null : new Date(),
      });
    } catch (error) {
      console.error('Error toggling habit completion:', error);
      throw new Error('Failed to toggle habit completion');
    }
  };

  return {
    habits,
    loading,
    error,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
  };
} 