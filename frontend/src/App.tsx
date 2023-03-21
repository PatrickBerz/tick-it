import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigator from './components/navigator'
import './styles.css';
import { BrowserRouter as Router } from 'react-router-dom';


const App = () => 
  <Router>
    <div className="App">
      <Navigator/>
    </div>
  </Router>

export default App;
