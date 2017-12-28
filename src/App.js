import React, { Component } from 'react';
import './App.css';
import JsonTable from './JsonTable';

const data = require('./db.json');

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Complaints Per Million Units</h1>
        </header>
        <JsonTable data={ data } />
      </div>
    );
  }
}

export default App;
