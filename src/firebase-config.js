import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getDatabase, ref, child, get, set } from "firebase/database";const firebaseConfig = {
    apiKey: "AIzaSyCaY8eV8FZoVBAXUe2VMZZcdzv0DBZKDoI",
    authDomain: "pdd-app-4fdf5.firebaseapp.com",
    projectId: "pdd-app-4fdf5",
    storageBucket: "pdd-app-4fdf5.appspot.com",
    messagingSenderId: "136855883498",
    appId: "1:136855883498:web:300fa9cf84d1051b1c9193",
    measurementId: "G-RVS6PLJDYF",
    databaseURL: "https://pdd-app-4fdf5-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const realtimeDB = ref(getDatabase())
