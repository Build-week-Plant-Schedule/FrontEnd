
import {Link} from 'react-router-dom'

export default function Login(props) {

    const {formValue, change, submit, errors} = props;

    const usernameError = () => {if (errors.username) return <span>{errors.username}</span> }

    const passwordError = () => {if (errors.password) return <span>{errors.password}</span> }

    return (
        <div>
            <Link to='/'>Home</Link>
            <form onSubmit={submit} >
                <label>
                    Username
                    <input type='text' name='username' value={formValue.username} onChange={change} />
                    {usernameError()}
                </label>
                <label>
                    Password
                    <input type='text' name='password' value={formValue.password} onChange={change} />
                    {passwordError()}
                </label>
                <button>Log in</button>
            </form>
        </div>
    )

}