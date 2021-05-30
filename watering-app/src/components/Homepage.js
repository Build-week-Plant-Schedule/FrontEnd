
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
            <h1>Welcome, to the Watering App</h1>
            <p>Watering App seeks to give you all the tools necessary to never over or under water your plants again! Simply sign up for the service, add a new plant, with the times to water included, and let the app do the rest of the work</p>
            {linkHandler}
        </div>
    )

}