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
    password: '',
  }

  const initLoginForm = {
      username: '',
      password: ''
  }

  const initAddPlantForm = {
    // ID SHOULD BE GENERATED ON SUBMIT
    id: 0,
    nickname: '',
    species: '',
    // KEEPS TRACK OF NUMBER OF TIME INPUTS
    // CRUCIAL TO RENDERING MULTIPLE TIME FORMS
    waterPerDay: 1,
    // I THINK THIS SHOULD BE AN ARRAY?
    // THAT WAY MULTIPLE TIMES/DATES CAN BE ADDED UNDER ONE HEADER
    h2oFrequency: []
  }

  // GETS SET WHEN USER LOGS IN
  // CAN WORK WITH LIKE BOOLEAN
  // NOT SURE WHAT THE AUTH WILL LOOK LIKE
  // PASSED TO HOMEPAGE

  const [auth, setAuth] = useState('1');

  const [signupFormValue, setSignupFormValue] = useState(initSignupForm);

  const [loginFormValue, setLoginFormValue] = useState(initLoginForm);

  const [plantForm, setPlantForm] = useState(initAddPlantForm);

  const [plantList, setPlantList] = useState([])

  const signupFormChangeHandler = e => {
    const {name, value} = e.target;
    setSignupFormValue({...signupFormValue, [name]: value})
    console.log(signupFormValue)
  }

  // NEED SUBMIT HANDLER FOR SIGNUP FORM

  const loginFormChangeHandler = e => {
    const {name, value} = e.target; 
    setLoginFormValue({...loginFormValue, [name]: value})
    console.log(loginFormValue);
  }

  // NEED SUBMIT HANDLER FOR LOGIN FORM

  // NEED CHANGE HANDLER FOR ADDPLANT FORM

  // INCREASE/DECREMENT WATERPERDAY IN PLANTFORM STATE
  // ATTACHES TO BUTTON NAME ADD AND REMOVE
  const waterNumberChanger = e => {
    e.preventDefault();
    if (e.target.name === 'add') {
      setPlantForm({...plantForm, waterPerDay: plantForm.waterPerDay + 1})
    } else if (plantForm.waterPerDay !== 1) {
      setPlantForm({...plantForm, waterPerDay: plantForm.waterPerDay - 1})
    }
  }

  // NEED SUBMIT HANDLER FOR ADDPLANT FORM

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home auth={auth} />
          </Route>
          <Route exact path='/Login'>
                <Login formValue={loginFormValue} change={loginFormChangeHandler} />
          </Route>
          <Route exact path='/Signup'>
                <Signup formValue={signupFormValue} change={signupFormChangeHandler} />
          </Route>
          <Route exact path='/UserScreen'>
                <UserScreen />
          </Route>
          <Route exact path='/AddPlants'>
                <AddPlants formValue={plantForm} waterHandler={waterNumberChanger} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
