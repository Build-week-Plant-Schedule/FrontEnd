import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

export default function Login(props) {

    const {formValue, change} = props;

    return (
        // FORM NEEDS ON SUBMIT
        <div>
            <form>
                <label>
                    Username
                    <input type='text' name='username' value={formValue.username} onChange={change} />
                </label>
                <label>
                    Password
                    <input type='text' name='password' value={formValue.password} onChange={change} />
                </label>
                <button>Log in</button>
            </form>
        </div>
    )

}