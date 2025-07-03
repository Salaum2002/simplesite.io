import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase config (same as before)
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

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-uid").textContent = user.uid;
  } else {
    // No user signed in, redirect to login
    window.location.href = "Loginpage.html";
  }
});

// Logout button
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully.");
    window.location.href = "Loginpage.html";
  } catch (error) {
    console.error("Logout error:", error);
    alert("Error: " + error.message);
  }
});
