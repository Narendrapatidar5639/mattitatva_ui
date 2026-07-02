// src/auth/firebaseClient.ts
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";

// Aapke Firebase Console Web App settings ka configuration block
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// 1. Google Auth Core Trigger
export const signInWithGoogleClient = async (): Promise<string> => {
  const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();
  return idToken;
};

// 2. Direct Email Signup Trigger
export const signUpWithEmailClient = async (email: string, pk: string): Promise<string> => {
  const result = await createUserWithEmailAndPassword(auth, email, pk);
  const idToken = await result.user.getIdToken();
  return idToken;
};

// 3. Direct Email Login Trigger
export const signInWithEmailClient = async (email: string, pk: string): Promise<string> => {
  const result = await signInWithEmailAndPassword(auth, email, pk);
  const idToken = await result.user.getIdToken();
  return idToken;
};

// 4. Reset Password Trigger
export const sendPasswordResetClient = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};