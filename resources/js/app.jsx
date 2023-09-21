import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Router from './components/Router';

// import Home from './Home';

ReactDOM.createRoot(document.getElementById('app')).render(
    <Router />
);
