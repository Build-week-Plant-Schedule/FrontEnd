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
    // ID GENERATED BASED OFF PLANTLIST
    // WHEN NEW FORM IS LOADED
    id: 0,
    nickname: '',
    species: '',
    waterPerDay: 1,
    h2oFrequency: []
  }

  const initTimeFormValue = {
    hour: 0,
    minute: 0,
    checked: false
  }

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

  const timeFormSchema = yup.object().shape({
    hour: yup.number().min().max().required(),
    minute: yup.number().min().max().required(),
    half: yup.boolean().required()
  })

  // WHEN NEW FORM IS OPENED GENERATE ID BASED ON PLANTLIST
  const addPlantSchema = yup.object().shape({
    id: yup.number().integer().positive().min(0).required(),
    nickname: yup.string().required(),
    species: yup.string().required(),
    waterPerDay: yup.number().integer().positive().min(1).required(),
    h2oFrequency: yup.array().of(yup.date()).length(1).required()
  })

  const signupFormChangeHandler = e => {
    const {name, value} = e.target;
    setSignupFormValue({...signupFormValue, [name]: value})
    console.log(signupFormValue)
  }

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

  const loginFormSubmit = e => {
    e.preventDefault();
    // axios.post('', loginFormValue)
    setLoginFormValue(initLoginForm);
  }

  const addPlantChangeHandler = e => {
    const {name, value} = e.target;
    setPlantForm({...plantForm, id: plantList.length})
    setPlantForm({...plantForm, [name]: value});
    console.log(plantForm);
  }

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
    // UNIT 3 WILL HANDLE
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
    arr[id] = newArrIndex;
    setTimeFormValue(arr);

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
