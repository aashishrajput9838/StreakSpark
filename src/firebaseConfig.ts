import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDqN8r1pxk359fY58t_HqKIKRLlTJrBf8g",
  authDomain: "streakspark-91b90.firebaseapp.com",
  projectId: "streakspark-91b90",
  storageBucket: "streakspark-91b90.firebasestorage.app",
  messagingSenderId: "824229552272",
  appId: "1:824229552272:web:94449f2e9ecb91d2f0f815",
  measurementId: "G-7XG1YRS3PM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; 