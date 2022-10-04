import React from 'react'

// eslint-disable-next-line
import firebase from 'firebase/compat/app';
import * as ReactDOM  from 'react-dom/client'
import { initializeApp } from "firebase/app";
import App from './App'
import { Provider } from 'react-redux'
import store from './store/store'

export const firebaseConfig = {
    apiKey: "AIzaSyCSOh8DI-dYg1uf_GSHqoOWciXbDQdBtWo",
    authDomain: "cordit-messenger.firebaseapp.com",
    projectId: "cordit-messenger",
    storageBucket: "cordit-messenger.appspot.com",
    messagingSenderId: "789713358438",
    appId: "1:789713358438:web:f90a4f633563462e75e7a7",
    measurementId: "G-7GMVD30ZML"
};
// eslint-disable-next-line
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

window.store = store;

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(
    <Provider store={store}>
        <App/> 
    </Provider>
);
