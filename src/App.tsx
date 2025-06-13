import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './components/Dashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TestPage from './pages/TestPage';
import HabitsPage from './pages/HabitsPage';
import DiscoverHabitsPage from './pages/DiscoverHabitsPage';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ProtectedRoute } from './components/ProtectedRoute';
import { FirebaseProvider } from '@/contexts/FirebaseContext';
import { AuthProvider } from '@/contexts/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <FirebaseProvider>
            <AuthProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route
                  path="/habits"
                  element={
                    <ProtectedRoute>
                      <HabitsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/discover-habits"
                  element={
                    <ProtectedRoute>
                      <DiscoverHabitsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/index"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <ProtectedRoute>
                      <AboutPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <ProtectedRoute>
                      <ContactPage />
                    </ProtectedRoute>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </AuthProvider>
          </FirebaseProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
