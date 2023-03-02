import React from 'react';
import { Button } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <Button variant='warning'>Admin</Button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Tick-it app
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
