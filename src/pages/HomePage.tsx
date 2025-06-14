import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Redirect logged-in users to the dashboard
  React.useEffect(() => {
    if (user) {
      navigate('/index');
    }
  }, [user, navigate]);

  // If user is logged in, return null or a loading spinner while redirecting
  if (user) {
    return <div className="min-h-screen flex items-center justify-center text-appPalette-dark-text">Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-appPalette-dark-background text-appPalette-dark-text relative overflow-hidden flex flex-col justify-between">
      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center flex-grow p-4 md:p-8 lg:p-16 max-w-7xl mx-auto">
        {/* Left Section: Text Content */}
        <div className="flex flex-col gap-6 text-left relative z-10 md:w-1/2 p-4">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mt-10 md:mt-0">
            Unlock Lasting Habits You Thought Was Out of Reach – <br className="hidden md:block"/>Now Just One Click Away!
          </h1>
          <Link 
            to="/signup" 
            className="bg-appPalette-purple text-white font-semibold px-8 py-3 rounded-full text-lg shadow-lg hover:bg-appPalette-pink transition duration-300 flex items-center gap-2 w-fit"
          >
            Start Tracking Habits <span className="text-2xl ml-2">›</span>
          </Link>
          {/* Removed 'David' text as it doesn't fit generic app context */}
        </div>

        {/* Right Section: Circular Graphic */}
        <div className="md:w-1/2 relative flex items-center justify-center h-[500px] mt-10 md:mt-0">
          {/* Central Circle */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-appPalette-dark-card bg-opacity-10 backdrop-filter backdrop-blur-lg flex items-center justify-center flex-col p-4 shadow-xl z-20 border border-appPalette-dark-border border-opacity-20">
            <span className="text-4xl font-bold">20k+</span>
            <span className="text-lg text-appPalette-dark-muted">Users Strong!</span>
          </div>

          {/* Outer Circles (placeholders) - positioned absolutely */}
          <div className="absolute w-20 h-20 rounded-full overflow-hidden border-2 border-appPalette-dark-border border-opacity-30 top-10 left-10 transform translate-x-[-50%] translate-y-[-50%] z-20 shadow-md bg-appPalette-dark-card bg-opacity-20 flex items-center justify-center"></div>
          <div className="absolute w-16 h-16 rounded-full overflow-hidden border-2 border-appPalette-dark-border border-opacity-30 top-40 right-10 transform translate-x-[50%] translate-y-[-50%] z-20 shadow-md bg-appPalette-dark-card bg-opacity-20 flex items-center justify-center"></div>
          <div className="absolute w-18 h-18 rounded-full overflow-hidden border-2 border-appPalette-dark-border border-opacity-30 bottom-20 left-20 transform translate-x-[-50%] translate-y-[50%] z-20 shadow-md bg-appPalette-dark-card bg-opacity-20 flex items-center justify-center"></div>
          <div className="absolute w-14 h-14 rounded-full overflow-hidden border-2 border-appPalette-dark-border border-opacity-30 bottom-10 right-40 transform translate-x-[50%] translate-y-[50%] z-20 shadow-md bg-appPalette-dark-card bg-opacity-20 flex items-center justify-center"></div>

          {/* Subtle Glows/Orb effects */}
          <div className="absolute w-40 h-40 bg-appPalette-purple rounded-full blur-3xl opacity-30 top-20 left-0 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute w-52 h-52 bg-appPalette-pink rounded-full blur-3xl opacity-30 bottom-0 right-0 transform translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>

      {/* Bottom Section: Partner Logos */}
      <div className="p-8 flex justify-center items-center gap-12 flex-wrap relative z-10 bg-appPalette-dark-card bg-opacity-20 py-10">
        <span className="text-appPalette-dark-muted text-lg font-semibold">Dreamure</span>
        <span className="text-appPalette-dark-muted text-lg font-semibold">SWITCH.WIN</span>
        <span className="text-appPalette-dark-muted text-lg font-semibold">sphere</span>
        <span className="text-appPalette-dark-muted text-lg font-semibold">PinSpace</span>
        <span className="text-appPalette-dark-muted text-lg font-semibold">Visionix</span>
      </div>
    </div>
  );
};

export default HomePage; 