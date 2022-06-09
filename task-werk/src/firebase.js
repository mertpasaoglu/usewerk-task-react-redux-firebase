import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs, onSnapshot, addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyAddMwAwKrf-iApvowneoOzurEf8NIE6Bw",
    authDomain: "todo-case-werk.firebaseapp.com",
    projectId: "todo-case-werk",
    storageBucket: "todo-case-werk.appspot.com",
    messagingSenderId: "313582496037",
    appId: "1:313582496037:web:974f7f0c4c66cffb8dd2cc"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export { db };

  const productsRef = collection(db, "products");

export const useProductsListener = () => {
  useEffect(() => {
    return onSnapshot(productsRef, snapshot => {
      console.log(snapshot.docs);
    })
  }, []);
}

export const addProduct = () => {
  addDoc(productsRef, {

  })
}

const colRef = collection(db, "todos");

getDocs(colRef).then((snapshot) => {
  let todos = [];
  snapshot.docs.forEach((doc) => {
    todos.push({ ...doc.data(), id: doc.id });
  });
});

const auth = getAuth();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}