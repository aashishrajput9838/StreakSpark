import { AuthTest } from '@/components/AuthTest';
import { HabitList } from '@/components/HabitList';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-appPalette-dark-background text-appPalette-dark-text p-4">
      <div className="container mx-auto py-8 space-y-8">
        <h1 className="text-3xl font-bold text-appPalette-dark-text">Firebase Integration Test</h1>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-appPalette-dark-text">Authentication Test</h2>
          <AuthTest />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-appPalette-dark-text">Habits Test</h2>
          <HabitList />
        </section>
      </div>
    </div>
  );
} 