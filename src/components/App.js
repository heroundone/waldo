import '../styles/App.css';
import {app, db} from './../index'
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore"; 
import { useEffect } from 'react';
import WaldoSnow from './WaldoSnow';

function App() {


  return (
    <div className="App">
      <WaldoSnow />
    </div>
  );
}

export default App;
