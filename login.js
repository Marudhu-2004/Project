import { auth } from './firebase.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    window.location.href = "/editor"; // redirect to blog editor
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("signupBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created! You can now log in.");
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("googleBtn").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    alert("Google login successful!");
    window.location.href = "/editor";
  } catch (error) {
    alert(error.message);
  }
});
