import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {init as firebaseInit} from './javascripts/firebase'

firebaseInit();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
