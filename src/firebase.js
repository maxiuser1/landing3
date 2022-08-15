import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBs1fhoVnsZaMn_COV_SfJMFEIX4Kck1tI",
  authDomain: "non-prod-ticketera.firebaseapp.com",
  projectId: "non-prod-ticketera",
  storageBucket: "non-prod-ticketera.appspot.com",
  messagingSenderId: "721036293198",
  appId: "1:721036293198:web:acfb25d6065a9d6a513f1f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);