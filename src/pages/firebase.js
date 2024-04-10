import { initializeApp } from "firebase/app";
import { getAuth } from'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzl7D8fHHrI4O476nk5LQ3ZBPREgvYqFQ",
  authDomain: "test-2d520.firebaseapp.com",
  projectId: "test-2d520",
  storageBucket: "test-2d520.appspot.com",
  messagingSenderId: "1046228513408",
  appId: "1:1046228513408:web:02a2309db9d6faa7b62c65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export default app