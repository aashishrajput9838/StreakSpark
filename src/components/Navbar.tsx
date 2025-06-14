import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <nav className="bg-appPalette-dark-background text-appPalette-dark-text p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">StreakSpark</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/habits" className="hover:text-appPalette-pink">Habits</Link>
              <Link to="/index" className="hover:text-appPalette-pink">Dashboard</Link>
              <Link to="/about" className="hover:text-appPalette-pink">About</Link>
              <Link to="/contact" className="hover:text-appPalette-pink">Contact</Link>
              <button onClick={handleLogout} className="hover:text-appPalette-pink">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-appPalette-pink">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 