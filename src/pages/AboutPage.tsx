import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">About StreakSpark</h1>
      
      <div className="max-w-3xl mx-auto space-y-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            At StreakSpark, we're dedicated to helping people build lasting habits that transform their lives. 
            We believe that small, consistent actions lead to significant changes over time.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Personalized habit tracking and analytics</li>
            <li>AI-powered habit recommendations</li>
            <li>Community support and accountability</li>
            <li>Progress visualization and insights</li>
            <li>Flexible habit scheduling</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700">
            StreakSpark was born from a simple idea: making habit formation accessible and enjoyable for everyone. 
            Our team of habit formation experts and developers came together to create a platform that combines 
            behavioral science with modern technology to help you achieve your goals.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 