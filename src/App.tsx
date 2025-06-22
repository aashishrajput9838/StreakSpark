import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './components/Dashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TestPage from './pages/TestPage';
import HabitsPage from './pages/HabitsPage';
import DiscoverHabitsPage from './pages/DiscoverHabitsPage';
import FeaturesPage from "./pages/FeaturesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import GoalsPage from "./pages/GoalsPage";
import BlogPage from "./pages/BlogPage";
import CareersPage from "./pages/CareersPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import FaqPage from "./pages/FaqPage";
import IndexPage from "./pages/IndexPage";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ProtectedRoute } from './components/ProtectedRoute';
import { FirebaseProvider } from '@/contexts/FirebaseContext';
import { AuthProvider } from '@/contexts/AuthContext';
import MainLayout from "./components/MainLayout";
import ScrollToTop from "./components/ScrollToTop";

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
              <ScrollToTop />
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/test" element={<TestPage />} />
                  <Route path="/features" element={<ProtectedRoute><FeaturesPage /></ProtectedRoute>} />
                  <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
                  <Route path="/goals" element={<ProtectedRoute><GoalsPage /></ProtectedRoute>} />
                  <Route path="/blog" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
                  <Route path="/careers" element={<ProtectedRoute><CareersPage /></ProtectedRoute>} />
                  <Route path="/help" element={<ProtectedRoute><HelpCenterPage /></ProtectedRoute>} />
                  <Route path="/privacy" element={<ProtectedRoute><PrivacyPolicyPage /></ProtectedRoute>} />
                  <Route path="/terms" element={<ProtectedRoute><TermsOfServicePage /></ProtectedRoute>} />
                  <Route path="/faq" element={<ProtectedRoute><FaqPage /></ProtectedRoute>} />
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
                        <IndexPage />
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
                </Route>
                {/* Routes without MainLayout can be placed here */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </FirebaseProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
