// import logo from './logo.svg';
// import './App.css';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import {useState} from 'react';

import Home from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import UserScreen from './components/UserScreen';

function App() {

  // GETS SET WHEN USER LOGS IN
  // CAN WORK WITH LIKE BOOLEAN
  // NOT SURE WHAT THE AUTH WILL LOOK LIKE
  // PASS THIS TO HOMEPAGE
  const [auth, setAuth] = useState('');

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/Login'>
                <Login />
          </Route>
          <Route exact path='/Signup'>
                <Signup />
          </Route>
          <Route exact path='/UserScreen'>
                <UserScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
