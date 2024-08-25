// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhAk0pXVa4cRMZq8y4X_mCtPvSnmI1D4k",
  authDomain: "storage-57c05.firebaseapp.com",
  projectId: "storage-57c05",
  storageBucket: "storage-57c05.appspot.com",
  messagingSenderId: "461325324880",
  appId: "1:461325324880:web:97e736340aed43e826b755",
  measurementId: "G-7830EH8NZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
