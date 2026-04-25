import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_esDEOJwllffkzAjMljokIwGYGiKooS4",
  authDomain: "sahayata-5aa25.firebaseapp.com",
  projectId: "sahayata-5aa25",
  storageBucket: "sahayata-5aa25.firebasestorage.app",
  messagingSenderId: "971122199624",
  appId: "1:971122199624:web:03164ee681bbd93c67dc7d",
  measurementId: "G-ES9M5PRG16"
};

const app = initializeApp(firebaseConfig);

getAnalytics(app);

export const auth = getAuth(app);

export default app;