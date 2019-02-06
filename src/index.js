import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import startServiceWorker from './startServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
startServiceWorker();
//calls the startServiceWorker function to register the service worker