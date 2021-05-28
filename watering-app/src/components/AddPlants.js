import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

export default function AddPlants(props) {

    const {formValue, waterHandler, change, timeChange, checkValue} = props;

    const timeForm = index => {
        return (
            <div key={`time ${index}`} >
                <label>
                    Hour:
                    <input type='number' name='hour' min='1' max='12' id={index} onChange={timeChange} />
                </label>
                <label>
                    Minutes:
                    <input type='number' name='minute' min='0' max='59' id={index} onChange={timeChange} />
                </label>
                <label>
                    Click if time is PM
                    {console.log(checkValue[index].checked)}
                    <input type='checkbox' name='half' value='pm' id={index} onChange={timeChange} checked={checkValue[index].checked} />
                </label>
            </div>
        )
    } 

    const arrayBuilder = num => {
        return Array.apply(null, Array(num)).map(function (cb, index) {return index})
    }
    // MAP OVER ARRAY OF CORRECT SIZE AND RETURN TIME FORM FOR EACH
    const h2oFormHandler = num => {
       return arrayBuilder(num).map(cb => {
           return timeForm(cb);
        });
    }

    return (
        <div>
            <Link to='/'>Home</Link>
            <h1>AddPlants loaded</h1>
            <form>
                <label>
                    Nickname
                    <input type='text' name='nickname' value={formValue.nickname} onChange={change} />
                </label>
                <label>
                    Species Name
                    <input type='text' name='species' value={formValue.species} onChange={change} />
                </label>
                <div>
                    <label>
                        Add Time to Water
                        {/* CALL TIME FORM HANDLER WITH THE VALUE IN WATERPERDAY */}
                        {h2oFormHandler(formValue.waterPerDay)}
                        <button name='remove' onClick={waterHandler} >Remove time</button>
                        <button name='add' onClick={waterHandler} >Add time</button>
                    </label>
                </div>
            </form>
        </div>
        

    )

}