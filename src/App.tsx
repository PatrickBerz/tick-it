import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigator from './components/navigator'
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SeasonPass } from './components/seasonPass';
import { Home } from './components/home';
import { AdminLogin } from './components/adminLogin';

const App = () => 
  <Router>
    <div className="App">
      <Navigator/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/adminLogin' element={<AdminLogin/>}/>
          <Route path='/seasonPass' element={<SeasonPass/>}/>
      </Routes>
    </div>
  </Router>

export default App;
