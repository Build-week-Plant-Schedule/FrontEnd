// import logo from './logo.svg';
// import './App.css';

import {Route, Switch, useHistory, Link} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import {useState, useEffect} from 'react';

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


  const [auth, setAuth] = useState('');
  const [signupFormValue, setSignupFormValue] = useState(initSignupForm);
  const [loginFormValue, setLoginFormValue] = useState(initLoginForm);
  const [plantForm, setPlantForm] = useState(initAddPlantForm);
  const [timeFormValue, setTimeFormValue] = useState([initTimeFormValue])
  const [plantList, setPlantList] = useState([])
  const [signupErrors, setSignupErrors] = useState(initSignupForm)
  const [loginErrors, setLoginErrors] = useState(initLoginForm)
  const [plantFormErrors, setPlantFormErrors] = useState(initAddPlantForm);

  let history = useHistory();

  const homeRouter = () => {
    history.push('/')
  }


  const signUpSchema = yup.object().shape({
    username: yup.string().min(5).required(),
    phoneNumber: yup.string().length(10).required(),
    password: yup.string().min(8).required()
  })

  const loginSchema = yup.object().shape({
    username: yup.string().min(5).required(),
    password: yup.string().min(8).required()
  })

  const addPlantSchema = yup.object().shape({
    id: yup.number().integer().positive().min(0).required(),
    nickname: yup.string().min(5).required(),
    species: yup.string().min(5).required(),
    waterPerDay: yup.number().integer().positive().min(1).required(),
    h2oFrequency: yup.array().of(yup.date()).length(1).required()
  })

  const signupFormChangeHandler = e => {
    const {name, value} = e.target;
    yup.reach(signUpSchema, name)
      .validate(value)
      .then(valid => {
        setSignupErrors({...signupErrors, [name]: ''})
      })
      .catch(err => {
        setSignupErrors({...signupErrors, [name]: err.errors[0]})
      })
    setSignupFormValue({...signupFormValue, [name]: value})
  }

  const signupSubmitHelper = e => {
    e.preventDefault();
    setAuth('1');
      // axios.post('', signupFormValue)
    setSignupFormValue(initSignupForm);
    homeRouter();
  }

  const signupFormSubmit = e => {
    signupErrors.username === initSignupForm.username &&
    signupErrors.phoneNumber === initSignupForm.phoneNumber &&
    signupErrors.password === initSignupForm.password ?
      signupSubmitHelper(e) :
      e.preventDefault()
  }

  const loginFormChangeHandler = e => {
    const {name, value} = e.target; 
    yup.reach(loginSchema, name)
      .validate(value)
      .then(valid => {
        setLoginErrors({...loginErrors, [name]: ''})
      })
      .catch(err => {
        setLoginErrors({...loginErrors, [name]: err.errors[0]})
      })
    setLoginFormValue({...loginFormValue, [name]: value})
  }

  const loginSubmitHelper = e => {
    e.preventDefault();
    setAuth('1');
    // axios.post('', loginFormValue)
    setLoginFormValue(initLoginForm);
    homeRouter();
  }

  const loginFormSubmit = e => {
    loginErrors.username === initLoginForm.username &&
    loginErrors.password === initLoginForm.password ?
      loginSubmitHelper(e) :
      e.preventDefault();
  }

  const addPlantChangeHandler = e => {
    const {name, value} = e.target;

    yup.reach(addPlantSchema, name)
      .validate(value)
      .then(valid => {
        setPlantFormErrors({...plantFormErrors, [name]: initAddPlantForm[name]})
      })
      .catch(err => {
        setPlantFormErrors({...plantFormErrors, [name]: err.errors[0]})
      })

    setPlantForm({...plantForm, id: plantList.length})
    setPlantForm({...plantForm, [name]: value});
  }

  const waterNumberChanger = e => {
    e.preventDefault();
    if (e.target.name === 'add') {
      setPlantForm({...plantForm, waterPerDay: plantForm.waterPerDay + 1});
      setTimeFormValue([...timeFormValue, initTimeFormValue]);
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

  const h2oArrayCreater = state => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const dateOfMonth = date.getDate()
    return state.map(cb => {
      const hour = cb.checked ? parseInt(cb.hour) + 12 : cb.hour;
      return new Date(year, month, dateOfMonth, hour, cb.minute )
    })
  }

  const plantFormTimeSetter = time => {
    const plantFormCopy = plantForm;
    plantFormCopy.h2oFrequency = time;
    plantFormCopy.id = plantFormCopy.species
    setPlantForm(plantFormCopy);
  }

  const plantListSetter = () => {
    const plantListCopy = plantList;
    plantListCopy.push(plantForm);
    setPlantList(plantListCopy);
  }

  const plantSubmitHelper = e => {
    e.preventDefault();
    const times = h2oArrayCreater(timeFormValue);
    plantFormTimeSetter(times)
    // axios.post('', plantForm)
    plantListSetter()
    setPlantForm(initAddPlantForm);
    setTimeFormValue([initTimeFormValue])

  }

  const addPlantSubmit = e => {
    plantFormErrors.nickname === initAddPlantForm.nickname &&
      plantFormErrors.species === initAddPlantForm.species ?
        plantSubmitHelper(e) :
        e.preventDefault();
  }

  const plantListSplicer = e => {
    e.preventDefault();
    const {name} = e.target;
    const deleteIndex = plantList.map((plant, index) => {
      if (name !== plant.id) {
        return index;
      }
    })
    const newPlantList = plantList.splice(deleteIndex, 1);
    setPlantList(newPlantList);
  }

  const userPlantDelete = e => {
    plantList.length > 1 ? plantListSplicer(e) : setPlantList([]);
  }

  return (
    <div>
        <Switch>
          <Route exact path='/'>
            <Home auth={auth} />
          </Route>
          <Route exact path='/Login'>
                <Login
                formValue={loginFormValue}
                change={loginFormChangeHandler}
                submit={loginFormSubmit}
                errors={loginErrors} />
          </Route>
          <Route exact path='/Signup'>
                <Signup
                formValue={signupFormValue}
                change={signupFormChangeHandler}
                submit={signupFormSubmit}
                errors={signupErrors} />
          </Route>
          <Route exact path='/UserScreen'>
                <UserScreen 
                list={plantList}
                deleteButton={userPlantDelete}/>
          </Route>
          <Route exact path='/AddPlants'>
                <AddPlants
                formValue={plantForm}
                change={addPlantChangeHandler}
                timeChange={timeFormValueChangeHandler}
                waterHandler={waterNumberChanger}
                checkValue={timeFormValue}
                submit={addPlantSubmit} 
                errors={plantFormErrors}/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;
