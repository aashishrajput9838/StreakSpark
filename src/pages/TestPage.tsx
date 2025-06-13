import { AuthTest } from '@/components/AuthTest';
import { HabitList } from '@/components/HabitList';

export default function TestPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Firebase Integration Test</h1>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Authentication Test</h2>
        <AuthTest />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Habits Test</h2>
        <HabitList />
      </section>
    </div>
  );
} 