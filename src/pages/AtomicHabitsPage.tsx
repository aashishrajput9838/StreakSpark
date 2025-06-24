import React from 'react';
import PageLayout from '@/components/PageLayout';

const AtomicHabitsPage = () => (
  <PageLayout title="The Power of Atomic Habits">
    <div className="prose prose-invert max-w-2xl mx-auto py-8">
      <h2>How StreakSpark Empowers Atomic Habits</h2>
      <p>
        At StreakSpark, we believe that small, consistent actions are the foundation of lasting change. Our platform is designed to help you build atomic habits—tiny routines that compound into remarkable results over time.
      </p>
      <ul>
        <li><strong>Track Every Step:</strong> Log your daily progress and visualize your streaks to stay motivated.</li>
        <li><strong>Personalized Reminders:</strong> Get nudges at the right time to keep your habits on track.</li>
        <li><strong>Community Support:</strong> Join challenges and connect with others who share your goals.</li>
        <li><strong>AI Insights:</strong> Receive actionable feedback and habit suggestions tailored to your journey.</li>
      </ul>
      <p>
        Whether you want to read more, exercise regularly, or learn a new skill, StreakSpark makes it easy to start small and grow big. Begin your atomic habit journey with us today!
      </p>
    </div>
  </PageLayout>
);

export default AtomicHabitsPage; 