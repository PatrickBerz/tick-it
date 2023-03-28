import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigator from './components/navigator'
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SeasonPass } from './components/seasonPass';
import { Home } from './components/home';
import { AdminLogin } from './components/adminLogin';
import { SeatSelection } from './components/seatSelection';
import { CheckOut } from './components/checkOut';
import { OrderConfirmation } from './components/orderConfirmation';
import {AdminPage} from './components/adminPage';

const App = () => 
  <Router>
    <div className="App">
      <Navigator/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/adminLogin' element={<AdminLogin/>}/>
          <Route path='/seasonPass' element={<SeasonPass/>}/>
          <Route path='/adminPage' element={<AdminPage/>}/>
          <Route path='/seatSelection' element={<SeatSelection/>}/>
          <Route path='/checkOut' element={<CheckOut/>}/>
          <Route path='/orderConfirmation' element={<OrderConfirmation/>}/>
      </Routes>
    </div>
  </Router>

export default App;
