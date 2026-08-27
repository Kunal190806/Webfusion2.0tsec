import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCrvgL_VTajLadg1pm53287h8Kb3vRinU",
  authDomain: "campuscircular-349f2.firebaseapp.com",
  projectId: "campuscircular-349f2",
  storageBucket: "campuscircular-349f2.firebasestorage.app",
  messagingSenderId: "895530352140",
  appId: "1:895530352140:web:f95ccb1cedc0267f2d3829",
  measurementId: "G-30BG2FJY6C"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
