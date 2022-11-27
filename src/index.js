import React from 'react';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'macro-css'


import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
  </React.StrictMode>
);


