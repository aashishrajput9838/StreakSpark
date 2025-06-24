import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, fetchSignInMethodsForEmail, updateProfile, AuthProvider } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in!");
      navigate('/index'); // Redirect to main landing page after successful login
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential' && email) {
        try {
          const methods = await fetchSignInMethodsForEmail(auth, email);
          if (methods.length === 0) {
            toast.error("Error: No account found with this email address. Please check the email or sign up.");
          } else if (methods.includes('google.com')) {
            toast.error("You originally signed in with Google. Please use the Google sign-in button to log in.");
          } else if (methods.includes('facebook.com')) {
            toast.error("You originally signed in with Facebook. Please use the Facebook sign-in button to log in.");
          } else {
            toast.error("Error: Incorrect password. Please try again.");
          }
        } catch (fetchError) {
          toast.error(error.message); // Fallback to original error if fetch fails
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleSocialSignIn = async (provider: AuthProvider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        // Save user data to Firestore
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
        
        // Clean up the photoURL to get the base image
        const photoURL = user.photoURL ? user.photoURL.split('=')[0] : null;

        await setDoc(userDocRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: photoURL,
        }, { merge: true }); // Use merge to avoid overwriting existing data
      }
      
      toast.success(`Successfully signed in with ${provider.providerId.replace('.com', '')}!`);
      navigate('/index');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-appPalette-dark-background">
      <div className="relative bg-appPalette-dark-card text-appPalette-dark-text rounded-3xl shadow-xl p-8 w-full max-w-md mx-auto flex flex-col items-center">
        {/* Top arrow (back button) */}
        <button className="absolute top-6 left-6 text-appPalette-dark-muted text-2xl hover:text-appPalette-dark-text transition" onClick={() => navigate(-1)}>&#8592;</button>

        {/* Header Section */}
        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold text-appPalette-dark-text mb-2">Sign in with email</h1>
          <p className="text-appPalette-dark-muted text-sm mb-6">Welcome back! Sign in to continue building and tracking your habits.</p>
        </div>

        {/* Form Section */}
        <form className="w-full space-y-4" onSubmit={handleLogin}>
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
            type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-3 pl-10 rounded-xl bg-appPalette-dark-background border border-appPalette-dark-border focus:outline-none focus:ring-2 focus:ring-appPalette-pink text-appPalette-dark-text placeholder-appPalette-dark-muted"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-appPalette-dark-muted">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-2-6h4m4 0h-4m-4 0V9m-6 3h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2z"></path></svg>
            </span>
            {/* Eye icon for password visibility */}
            <span 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-appPalette-dark-muted cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .95-3.112 3.543-5.45 6.848-6.1" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.333 11.972c.034-.16.057-.323.067-.486 0-4.478-3.732-8-8.268-8-1.502 0-2.914.41-4.167 1.125M3 3l18 18" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              )}
            </span>
          </div>

          {/* Forgot Password link */}
          <div className="w-full text-right text-sm">
            <Link to="/signup" className="text-appPalette-pink hover:underline">Don't have an account? Sign up</Link>
          </div>

          {/* Log In Button */}
          <button
            type="submit"
            className="w-full bg-appPalette-purple text-white font-semibold py-3 rounded-xl hover:bg-appPalette-pink transition duration-300 shadow-md"
          >
            Log In
          </button>
        </form>

        {/* Or sign in with separator */}
        <div className="relative w-full my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-appPalette-dark-border border-dashed"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-appPalette-dark-card px-3 text-appPalette-dark-muted">Or sign in with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center space-x-4 w-full">
          <button 
            className="flex items-center justify-center w-12 h-12 rounded-full bg-appPalette-dark-background border border-appPalette-dark-border shadow-sm hover:bg-appPalette-dark-card transition duration-300"
            onClick={() => handleSocialSignIn(new GoogleAuthProvider())}
          >
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-6 h-6" />
          </button>
          <button 
            className="flex items-center justify-center w-12 h-12 rounded-full bg-appPalette-dark-background border border-appPalette-dark-border shadow-sm hover:bg-appPalette-dark-card transition duration-300"
            onClick={() => {
              const provider = new FacebookAuthProvider();
              provider.addScope('email');
              handleSocialSignIn(provider);
            }}
          >
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

export default LoginPage; 