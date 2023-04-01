// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const config = require('config')


// Initialize Firebase

const app = initializeApp(config.firebaseConfig);

export default app;