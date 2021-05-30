import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

export default function UserScreen(props) {

    const {list} = props;

    //  [plantlist
    //      {plant
    //          h2o: [dates]
    //  }]
    //  div
    //      h2 Nickname
    //      p Time of day

    const timeGrabber = plantObj => {
        return plantObj.h2oFrequency.map(date => {
            console.log('in time grabber')
            const hour = date.getHours();
            const minute = date.getMinutes();
            let returnVal = [hour, minute, 'PM']
            // if (hour > 12) return <p>{hour - 12}:{minute} PM</p>
            // if (hour === 12) return <p>{hour}:{minute} PM</p>
            // if (hour === 0) return <p>12:{minute} AM</p>
            // if (hour < 12) return <p>{hour}:{minute} AM</p>

            if (hour > 12) {
                returnVal[0] = hour - 12;
            } else if (hour === 0) {
                returnVal[0] = 12;
                returnVal[2] = 'AM'
            } else if (hour < 12) {
                returnVal[2] = 'AM'
            }

            return returnVal.join(' ');
        })
    }

    const plantCard = list.map(plant => {
        return (
            <div key={plant.nickname} >
                <h2>{plant.nickname}</h2>
                {timeGrabber(plant)}
            </div>
        )
    })

    return (
        <div>
            <Link to='/'>Home</Link>
            <h1>UserScreen Loaded</h1>
            {plantCard}
        </div>
    )

}