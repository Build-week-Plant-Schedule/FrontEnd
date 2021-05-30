import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

export default function AddPlants(props) {

    const {formValue, waterHandler, change, timeChange, checkValue, submit, errors} = props;

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

    const nicknameError = () => {if (errors.nickname) return <span>{errors.nickname}</span>}

    const speciesError = () => {if (errors.species) return <span>{errors.species}</span>}


    return (
        <div>
            <Link to='/'>Home</Link>
            <form onSubmit={submit} >
                <label>
                    Nickname
                    <input type='text' name='nickname' value={formValue.nickname} onChange={change} />
                    {nicknameError()}
                </label>
                <label>
                    Species Name
                    <input type='text' name='species' value={formValue.species} onChange={change} />
                    {speciesError()};
                </label>
                <div>
                    <label>
                        Add Time to Water
                        <button name='add' onClick={waterHandler} >Add time</button>
                        <button name='remove' onClick={waterHandler} >Remove time</button>
                        {h2oFormHandler(formValue.waterPerDay)}
                    </label>
                </div>
                <button>Add Plant</button>
            </form>
        </div>
        

    )

}