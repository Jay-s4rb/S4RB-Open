import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const data = require('./db.json');

ReactDOM.render(<App data={ data } groupBy="month" />, document.getElementById('root'));
registerServiceWorker();
