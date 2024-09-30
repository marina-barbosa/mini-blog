
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6ScwoKhdKiEawHkAfRD-XsSaYPLkpI7Q",
  authDomain: "mini-blog-4c865.firebaseapp.com",
  projectId: "mini-blog-4c865",
  storageBucket: "mini-blog-4c865.appspot.com",
  messagingSenderId: "193346347808",
  appId: "1:193346347808:web:2bdfe6ac716fc4593ded45"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;