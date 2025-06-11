// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDROLyfXRR1hTYuk6CIqUjiKzjSAKuHUd4",
  authDomain: "roadamerica-bf693.firebaseapp.com",
  projectId: "roadamerica-bf693",
  storageBucket: "roadamerica-bf693.firebasestorage.app",
  messagingSenderId: "486776424935",
  appId: "1:486776424935:web:afe9becbd5863756085542",
  measurementId: "G-TBDX4NMBK7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
