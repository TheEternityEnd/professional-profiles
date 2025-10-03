// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ Rellena con tus datos de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8zd4EOEIKJWx4C55tqS6xHisoFKmIVP8",
  authDomain: "dianastuff-e8911.firebaseapp.com",
  databaseURL: "https://dianastuff-e8911-default-rtdb.firebaseio.com",
  projectId: "dianastuff-e8911",
  storageBucket: "dianastuff-e8911.firebasestorage.app",
  messagingSenderId: "446791438602",
  appId: "1:446791438602:web:bd522bef76f17c42696af3",
  measurementId: "G-FXL9K9X1P5"
};

const app = initializeApp(firebaseConfig);

// Autenticación
export const auth = getAuth(app);

// Firestore (para guardar perfiles, opcional)
export const db = getFirestore(app);
