import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Successfully signed up!");
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-appPalette-dark-background">
      <div className="relative bg-appPalette-dark-card text-appPalette-dark-text rounded-3xl shadow-xl p-8 w-full max-w-md mx-auto flex flex-col items-center">
        {/* Top arrow (back button) */}
        <button className="absolute top-6 left-6 text-appPalette-dark-muted text-2xl hover:text-appPalette-dark-text transition" onClick={() => navigate(-1)}>&#8592;</button>

        {/* Header Section */}
        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold text-appPalette-dark-text mb-2">Sign up with email</h1>
          <p className="text-appPalette-dark-muted text-sm mb-6">Create your StreakSpark account to build and track positive habits. For free.</p>
        </div>

        {/* Form Section */}
        <form className="w-full space-y-4" onSubmit={handleSignUp}>
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 pl-10 rounded-xl bg-appPalette-dark-background border border-appPalette-dark-border focus:outline-none focus:ring-2 focus:ring-appPalette-pink text-appPalette-dark-text placeholder-appPalette-dark-muted"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-appPalette-dark-muted">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </span>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 pl-10 rounded-xl bg-appPalette-dark-background border border-appPalette-dark-border focus:outline-none focus:ring-2 focus:ring-appPalette-pink text-appPalette-dark-text placeholder-appPalette-dark-muted"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-appPalette-dark-muted">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-2-6h4m4 0h-4m-4 0V9m-6 3h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2z"></path></svg>
            </span>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-appPalette-dark-muted cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </span>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 pl-10 rounded-xl bg-appPalette-dark-background border border-appPalette-dark-border focus:outline-none focus:ring-2 focus:ring-appPalette-pink text-appPalette-dark-text placeholder-appPalette-dark-muted"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-appPalette-dark-muted">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-2-6h4m4 0h-4m-4 0V9m-6 3h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2z"></path></svg>
            </span>
          </div>

          {/* "Already have an account?" link */}
          <div className="w-full text-right text-sm">
            <Link to="/login" className="text-appPalette-pink hover:underline">Already have an account? Log in</Link>
          </div>

          {/* Get Started Button */}
          <button
            type="submit"
            className="w-full bg-appPalette-purple text-white font-semibold py-3 rounded-xl hover:bg-appPalette-pink transition duration-300 shadow-md"
          >
            Get Started
          </button>
        </form>

        {/* Or sign in with separator */}
        <div className="relative w-full my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-appPalette-dark-border border-dashed"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-appPalette-dark-card px-3 text-appPalette-dark-muted">Or sign up with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center space-x-4 w-full">
          <button className="flex items-center justify-center w-12 h-12 rounded-full bg-appPalette-dark-background border border-appPalette-dark-border shadow-sm hover:bg-appPalette-dark-card transition duration-300">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-6 h-6" />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-full bg-appPalette-dark-background border border-appPalette-dark-border shadow-sm hover:bg-appPalette-dark-card transition duration-300">
            <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" className="w-6 h-6" />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-full bg-appPalette-dark-background border border-appPalette-dark-border shadow-sm hover:bg-appPalette-dark-card transition duration-300">
            <img src="https://img.icons8.com/ios-filled/50/000000/mac-os.png" alt="Apple" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage; 