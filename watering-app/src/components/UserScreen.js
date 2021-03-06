import {Link} from 'react-router-dom';

export default function UserScreen(props) {

    const {list, deleteButton} = props;

    const timeGrabber = plantObj => {
        return plantObj.h2oFrequency.map(date => {
            const hour = date.getHours();
            const minute = date.getMinutes();
            let returnVal = [hour, minute, 'PM']

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
                <button name={plant.species} onClick={deleteButton} >Delete</button>
            </div>
        )
    })

    return (
        <div>
            <Link to='/'>Home</Link>
            <p>When you have added plants the time to water them will appear here!</p>
            {plantCard}
        </div>
    )

}