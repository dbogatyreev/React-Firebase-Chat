import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const app = initializeApp({
  apiKey: "AIzaSyB7qZEEOiOPXKuvQwcGok7d4DFBE6KhSTw",
  authDomain: "chat-react-f7f4c.firebaseapp.com",
  projectId: "chat-react-f7f4c",
  storageBucket: "chat-react-f7f4c.appspot.com",
  messagingSenderId: "622969561567",
  appId: "1:622969561567:web:42cd8a04c557cce11e646a",
  measurementId: "G-9GTC3L8RNS"
});

const auth = getAuth(app);
const firestore = getFirestore(app);
getAnalytics(app);

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    auth,
    firestore
  }}>
    <App />
  </Context.Provider>
);
