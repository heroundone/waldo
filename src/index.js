import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDk0qLhcCz-bTVmgSXGsbwdJmP8xWbm9Q4",
    authDomain: "waldo-fec10.firebaseapp.com",
    projectId: "waldo-fec10",
    storageBucket: "waldo-fec10.appspot.com",
    messagingSenderId: "176893580076",
    appId: "1:176893580076:web:9b030c89e691cc9c0a5289"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export {app, db};
