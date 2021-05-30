import {useState} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


export default function Signup(props) {

    const {formValue, change, submit, errors} = props;

    const [agree, setAgree] = useState(false)

    const checkboxHandler = () => {
        setAgree(!agree);
      }
    
    const usernameError = () => {if (errors.username) return <span>{errors.username}</span> }

    const phoneNumberError = () => {if (errors.phoneNumber) return <span>{errors.phoneNumber}</span> }

    const passwordError = () => {if (errors.password) return <span>{errors.password}</span> }

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
                     {usernameError()}
                </label>
                <label>
                    Phone Number
                    <input 
                     type='number'
                     name='phoneNumber' 
                     min='0'
                     max='9999999999'
                     value={formValue.phoneNumber} 
                     onChange={change} />
                     {phoneNumberError()}
                </label>
                <label>
                    Password
                    <input 
                     type='text' 
                     name='password' 
                     value={formValue.password} 
                     onChange={change} />
                     {passwordError()}
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
                <button disabled={!agree}>Create New Account</button>
            </form>
        </div>
    )

}