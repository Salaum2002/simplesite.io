import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBHrpS9uTOtxlfkw14s9YdNQUrk36Vht9k",
  authDomain: "samples-ee8b8.firebaseapp.com",
  projectId: "samples-ee8b8",
  storageBucket: "samples-ee8b8.firebasestorage.app",
  messagingSenderId: "308735818833",
  appId: "1:308735818833:web:43fccfccde291fc0fe0c70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Login handler
const loginForm = document.querySelector('.login-border-box form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "profile.html";
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login error: " + error.message);
    }
  });
}

// Register handler
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Optional: If you still want to save to Firestore, you can save just the email and createdAt.
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString()
      });

      alert("Registration successful!");
      window.location.href = "Loginpage.html";
    } catch (error) {
      console.error("Registration error:", error);
      alert("Error: " + error.message);
    }
  });
}

// Password reset handler

const forgotForm = document.getElementById("forgot-form");
if (forgotForm) {
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("forgot-email").value.trim();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      console.error("Password reset error:", error);
      alert("Error: " + error.message);
    }
  });
}

