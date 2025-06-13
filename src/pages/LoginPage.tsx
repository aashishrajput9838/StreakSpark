import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Successfully logged in!");
      navigate('/index'); // Redirect to main landing page after successful login
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(180deg, #ADD8E6 0%, #E0FFFF 100%)', // Light blue gradient for background
    }}>
      <div className="relative bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-md mx-auto flex flex-col items-center">
        {/* Top arrow (back button) */}
        <button className="absolute top-6 left-6 text-gray-500 text-2xl hover:text-gray-700 transition" onClick={() => navigate(-1)}>&#8592;</button>

        {/* Header Section */}
        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign in with email</h1>
          <p className="text-gray-600 text-sm mb-6">Welcome back! Sign in to continue building and tracking your habits.</p>
        </div>

        {/* Form Section */}
        <form className="w-full space-y-4" onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="relative">
          <input 
            type="email" 
              placeholder="Email"
              className="w-full px-4 py-3 pl-10 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              required
          />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </span>
        </div>

          {/* Password Input */}
          <div className="relative">
          <input 
            type="password" 
              placeholder="Password"
              className="w-full px-4 py-3 pl-10 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-2-6h4m4 0h-4m-4 0V9m-6 3h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2z"></path></svg>
            </span>
            {/* Eye icon for password visibility - won't implement functionality now, just the icon */}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </span>
          </div>

          {/* Forgot Password link */}
          <div className="w-full text-right text-sm">
            <Link to="/signup" className="text-blue-600 hover:underline">Don't have an account? Sign up</Link>
          </div>

          {/* Log In Button */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-semibold py-3 rounded-xl hover:bg-gray-700 transition duration-300 shadow-md"
          >
            Log In
          </button>
        </form>

        {/* Or sign in with separator */}
        <div className="relative w-full my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 border-dashed"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-gray-500">Or sign in with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center space-x-4 w-full">
          <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition duration-300">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-6 h-6" />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition duration-300">
            <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" className="w-6 h-6" />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition duration-300">
            <img src="https://img.icons8.com/ios-filled/50/000000/mac-os.png" alt="Apple" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 