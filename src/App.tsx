import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import logo from './logo-tran.png';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <Button variant='danger'>Admin</Button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Tick-it app
        </p>
        
      </header>
    </div>
  );
}

export default App;
