// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Sign Up Function
  function signUp(email, password) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Sign up successful!");
        window.location.href = "profile.html"; // Redirect to profile page
      })
      .catch((error) => {
        alert("Error during sign up: " + error.message);
      });
  }
  
  // Login Function
  function login(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Login successful!");
        window.location.href = "index.html"; // Redirect to homepage
      })
      .catch((error) => {
        alert("Error during login: " + error.message);
      });
  }
  
  // Logout Function
  function logout() {
    auth
      .signOut()
      .then(() => {
        alert("Logout successful!");
        window.location.href = "index.html"; // Redirect to homepage
      })
      .catch((error) => {
        alert("Error during logout: " + error.message);
      });
  }
  
  // Auth State Listener
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      console.log("User is signed in:", user.email);
    } else {
      // User is signed out
      console.log("User is signed out");
      window.location.href = "index.html"; // Redirect to homepage if not logged in
    }
  });
  
  // Logout Button Event Listener
  document.getElementById("logout")?.addEventListener("click", logout);