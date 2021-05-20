
import {Link} from "react-router-dom"

export default function Home(props) {


    return (
        <div>
            <h1>Home loaded</h1>
            <Link to='/Login'>Login</Link>
            <Link to='/Signup'>Sign up</Link>
            <Link to='UserScreen'>User Screen</Link>
        </div>
    )

}