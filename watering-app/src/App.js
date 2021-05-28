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
    h2oFrequency: []
  }

  const initTimeFormValue = {
    hour: 0,
    minute: 0,
    checked: false
  }

  // GETS SET WHEN USER LOGS IN
  // CAN WORK WITH LIKE BOOLEAN
  // NOT SURE WHAT THE AUTH WILL LOOK LIKE
  // PASSED TO HOMEPAGE

  const [auth, setAuth] = useState('1');

  const [signupFormValue, setSignupFormValue] = useState(initSignupForm);

  const [loginFormValue, setLoginFormValue] = useState(initLoginForm);

  const [plantForm, setPlantForm] = useState(initAddPlantForm);

  const [timeFormValue, setTimeFormValue] = useState([initTimeFormValue])

  const [plantList, setPlantList] = useState([])

  const signUpSchema = yup.object().shape({
    username: yup.string().required(),
    phoneNumber: yup.number().positive().integer().min(10).max(10).required(),
    password: yup.string().required()
  })

  const loginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
  })

  const signupFormChangeHandler = e => {
    const {name, value} = e.target;
    setSignupFormValue({...signupFormValue, [name]: value})
    console.log(signupFormValue)
  }

  // NEED SUBMIT HANDLER FOR SIGNUP FORM
  const signupFormSubmit = e => {
    e.preventDefault();
    // axios.post('', signupFormValue)
    setSignupFormValue(initSignupForm);
  }

  const loginFormChangeHandler = e => {
    const {name, value} = e.target; 
    setLoginFormValue({...loginFormValue, [name]: value})
    console.log(loginFormValue);
  }

  // NEED SUBMIT HANDLER FOR LOGIN FORM
  const loginFormSubmit = e => {
    e.preventDefault();
    // axios.post('', loginFormValue)
    setLoginFormValue(initLoginForm);
  }

  // NEED CHANGE HANDLER FOR ADDPLANT FORM
  const addPlantChangeHandler = e => {
    const {name, value} = e.target;
    setPlantForm({...plantForm, [name]: value});
    console.log(plantForm);
  }

  // INCREASE/DECREMENT WATERPERDAY IN PLANTFORM STATE
  // ATTACHES TO BUTTON NAME ADD AND REMOVE
  const waterNumberChanger = e => {
    e.preventDefault();
    if (e.target.name === 'add') {
      setPlantForm({...plantForm, waterPerDay: plantForm.waterPerDay + 1});
      setTimeFormValue([...timeFormValue, initTimeFormValue]);
      console.log(timeFormValue);
    } else if (plantForm.waterPerDay !== 1) {
      setPlantForm({...plantForm, waterPerDay: plantForm.waterPerDay - 1})
      let newTimeState = timeFormValue
      newTimeState.pop();
      setTimeFormValue(newTimeState);
    }
  }

  const halfCheckboxHandler = (name, value, array) => {
    // CHECKBOX NEEDS CHECKED
    // THIS DOUBLE SYNCHS THE CHECK VALUE ON INDEX 1 & 2 AGAIN
    // AND CHECKVALUES DO NOT UPDATE UNTIL NEW FORM IS ADDED OR REMOVED
    if (name === 'half') {
      array.checked = !array.checked;
      return array;
    } else {
      return {...array, [name]: value}
    }
    
  }

  

  const timeFormValueChangeHandler = e => {
    const {name, value, id} = e.target;

    let arr = timeFormValue;
    let arrIndex = arr[id]
    let newArrIndex = halfCheckboxHandler(name, value, arrIndex);
    // let newArrIndex = {...arrIndex, [name]: value};
    console.log(newArrIndex);
    arr[id] = newArrIndex;
    setTimeFormValue(arr);

    // halfCheckboxHandler(e.target);

    console.log(timeFormValue)

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
                <Login formValue={loginFormValue} change={loginFormChangeHandler} submit={loginFormSubmit} />
          </Route>
          <Route exact path='/Signup'>
                <Signup formValue={signupFormValue} change={signupFormChangeHandler} submit={signupFormSubmit} />
          </Route>
          <Route exact path='/UserScreen'>
                <UserScreen />
          </Route>
          <Route exact path='/AddPlants'>
                <AddPlants formValue={plantForm} change={addPlantChangeHandler} timeChange={timeFormValueChangeHandler} waterHandler={waterNumberChanger} checkValue={timeFormValue} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
