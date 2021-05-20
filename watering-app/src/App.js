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
import AddPlants from './components/AddPlants';

function App() {

  const initSignupForm = {
    username: '',
    phoneNumber: '',
    password: ''
  }

  const initLoginForm = {
    // NOT SURE WHETHER TO HAVE USERS LOGIN WITH USERNAME OF PHONE NUMBER
      password: ''
  }

  // GETS SET WHEN USER LOGS IN
  // CAN WORK WITH LIKE BOOLEAN
  // NOT SURE WHAT THE AUTH WILL LOOK LIKE
  // PASS THIS TO HOMEPAGE
  const [auth, setAuth] = useState('');

  const [signupFormValue, setSignupFormValue] = useState(initSignupForm);

  const [loginFormValue, setLoginFormValue] = useState(initLoginForm);

  const signupFormChangeHandler = e => {
    const {name, value} = e.target;
    setSignupFormValue({...signupFormValue, [name]: value})
    console.log(signupFormValue)
  }

  // NEED SUBMIT HANDLER FOR SIGNUP FORM

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home auth={auth} />
          </Route>
          <Route exact path='/Login'>
                <Login />
          </Route>
          <Route exact path='/Signup'>
                <Signup formValue={signupFormValue} change={signupFormChangeHandler} />
          </Route>
          <Route exact path='/UserScreen'>
                <UserScreen />
          </Route>
          <Route exact path='/AddPlants'>
                <AddPlants />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
