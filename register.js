<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB8om9xhjCE_9Q5daaqHf1pv84vO8ZqrFM",
    authDomain: "medinow-557fa.firebaseapp.com",
    projectId: "medinow-557fa",
    storageBucket: "medinow-557fa.firebasestorage.app",
    messagingSenderId: "584931945599",
    appId: "1:584931945599:web:dfe3836b06af5c53a5e34a",
    measurementId: "G-Q5R1DKQ6R7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
