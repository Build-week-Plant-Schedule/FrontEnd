import {useState} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


export default function Signup(props) {

    const {formValue, change, submit} = props;

    const [agree, setAgree] = useState(false)

    const checkboxHandler = () => {
        setAgree(!agree);
      }
    
      const btnHandler = () => {
        alert('The button is clickable!')
      }

    return (
        <div>
            <Link to='/'>Home</Link>
            <form onSubmit={submit} >
                <label>
                    Username
                    <input
                     type='text' 
                     name='username' 
                     value={formValue.username} 
                     onChange={change} />
                </label>
                <label>
                    Phone Number
                    <input 
                     type='text'
                     name='phoneNumber' 
                     value={formValue.phoneNumber} 
                     onChange={change} />
                </label>
                <label>
                    Password
                    <input 
                     type='text' 
                     name='password' 
                     value={formValue.password} 
                     onChange={change} />
                </label>
                <label>
                    Terms of Service
                    <input
                    type='checkbox'
                    name='termsofService'
                    value={formValue.termsofService}
                    onChange={checkboxHandler}
                    />
                </label>
                <button disabled={!agree} onClick={btnHandler}>Create New Account</button>
            </form>
        </div>
    )

}