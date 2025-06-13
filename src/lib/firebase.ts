import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqN8r1pxk359fY58t_HqKIKRLlTJrBf8g",
  authDomain: "streakspark-91b90.firebaseapp.com",
  projectId: "streakspark-91b90",
  storageBucket: "streakspark-91b90.firebasestorage.app",
  messagingSenderId: "824229552272",
  appId: "1:824229552272:web:94449f2e9ecb91d2f0f815",
  measurementId: "G-7XG1YRS3PM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Storage
export const storage = getStorage(app);

// Initialize Analytics
export const analytics = getAnalytics(app);

export default app; 