
import {Link} from "react-router-dom"

export default function Home(props) {

    const {auth} = props;

    const newUsers = <>
        <Link to='/Login'>Login</Link>
        <Link to='/Signup'>Sign up</Link>
    </> 

    const returningUser = <>
        <Link to='UserScreen'>User Screen</Link>
        <Link to='AddPlants'>Add Plants</Link>
    </>

    const linkHandler = auth ? returningUser : newUsers;

    return (
        <div>
            <h1>Home loaded</h1>
            {linkHandler}
        </div>
    )

}