// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDj69SLxRNm3b9JrvITpdmbWe8lE1DwYyA",
  authDomain: "asik-project786.firebaseapp.com",
  projectId: "asik-project786",
  storageBucket: "asik-project786.firebasestorage.app",
  messagingSenderId: "549785583760",
  appId: "1:549785583760:web:a6dc7f0b085c6a1aea1815",
  measurementId: "G-J8QCVQC9QB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;