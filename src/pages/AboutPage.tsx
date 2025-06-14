import React from 'react';
import { Twitter, Instagram, Linkedin, Mouse } from 'lucide-react'; // Assuming these icons are available

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center pt-8 pb-16 relative">
      {/* Top Bar (simulated from image) */}
      {/* REMOVED HEADER SECTION */}

      {/* Main Content Area */}
      <div className="w-full max-w-7xl bg-gray-900 rounded-lg shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left Column - Image */}
        <div className="bg-gray-800 flex items-center justify-center p-8">
          <img 
            src="https://via.placeholder.com/400x500/1a202c/ffffff?text=Your+Image" 
            alt="About Me" 
            className="w-full h-auto object-cover max-h-[500px] shadow-lg rounded-lg"
          />
        </div>

        {/* Right Column - About Me Text */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">ABOUT STREAKSPARK</h1>
          <h2 className="text-lg font-semibold text-appPalette-purple-300 uppercase tracking-wide mb-6">Your Habit Tracking Companion</h2>
          
          <section className="space-y-6 text-gray-300 leading-relaxed mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p>
                At StreakSpark, we're dedicated to helping people build lasting habits that transform their lives. 
                We believe that small, consistent actions lead to significant changes over time.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">What We Offer</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Personalized habit tracking and analytics</li>
                <li>AI-powered habit recommendations</li>
                <li>Community support and accountability</li>
                <li>Progress visualization and insights</li>
                <li>Flexible habit scheduling</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Our Story</h3>
              <p>
                StreakSpark was born from a simple idea: making habit formation accessible and enjoyable for everyone. 
                Our team of habit formation experts and developers came together to create a platform that combines 
                behavioral science with modern technology to help you achieve your goals.
              </p>
            </div>
          </section>

          {/* Social Icons */}
          <div className="flex space-x-4 mb-8">
            {/* Behance - Using a div with placeholder text/background for now */}
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-lg font-bold hover:bg-gray-700 transition-colors duration-200">
              Bē
            </a>
            {/* Dribbble - Using a div with placeholder text/background for now */}
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-lg font-bold hover:bg-gray-700 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dribbble"><circle cx="12" cy="12" r="10"/><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10c1.03-0.01 2.06-0.19 3-0.54a11 11 0 0 0 5-5c0-1.03-0.18-2.06-0.53-3l-2.03-2.03a11 11 0 0 0-3-0.53V12c0-2.21-1.79-4-4-4S8 9.79 8 12s1.79 4 4 4c1.02 0 1.95-0.38 2.68-1.05a1.5 1.5 0 0 0 0-2.12c-0.73-0.67-1.66-1.05-2.68-1.05v-2.05z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-200">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-200">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-200">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator Icon */}
      <div className="mt-12 mb-8">
        <Mouse size={32} className="text-gray-400 animate-bounce" />
      </div>

      {/* Bottom Bar (simulated from image) */}
      {/* REMOVED FOOTER SECTION */}
    </div>
  );
};

export default AboutPage; 