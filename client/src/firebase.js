import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-266b3.firebaseapp.com",
  projectId: "realestate-266b3",
  storageBucket: "realestate-266b3.appspot.com",
  messagingSenderId: "532548042528",
  appId: "1:532548042528:web:982f8f518f62778669e145",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
