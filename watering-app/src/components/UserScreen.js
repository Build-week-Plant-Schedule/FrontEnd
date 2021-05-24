import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

export default function UserScreen(props) {


    return (
        <div>
            <Link to='/'>Home</Link>
            <h1>UserScreen Loaded</h1>
        </div>
    )

}