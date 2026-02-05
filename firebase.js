// public/js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBs0S1BQooufu3DTVpPASvZGOB8OSShh-I",
  authDomain: "blogging-website-61bf3.firebaseapp.com",
  projectId: "blogging-website-61bf3",
  storageBucket: "blogging-website-61bf3.firebasestorage.app",
  messagingSenderId: "601479708093",
  appId: "1:601479708093:web:6d0faa19900d304f2966d4",
  measurementId: "G-BYNMD2BKSK"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
