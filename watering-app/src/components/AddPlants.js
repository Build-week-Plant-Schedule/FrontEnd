
export default function AddPlants(props) {

    const {formValue, waterHandler} = props;

    // LAYOUT FOR SINGULAR TIME FORM
    const timeForm = index => {
        return (
            <div key={`time ${index}`} >
                <label>
                    Hour:
                    <input type='number' name='hour' min='1' max='12' />
                </label>
                <label>
                    Minutes:
                    <input type='number' name='minute' min='0' max='59' />
                </label>
            </div>
        )
    } 
    // BUILDS ARRAY WITH LENGTH NUM
    // ARRAY VALUES = INDEX NUM
    // TO RETURN MULTIPLE TIME FORMS IT IS NECESSARY TO HAVE A UNIQUE VALUE TO KEEP TRACK OF THIS
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
            <h1>AddPlants loaded</h1>
            <form>
                <label>
                    Nickname
                    <input type='text' name='nickname'  />
                </label>
                <label>
                    Species Name
                    <input type='text' name='species'  />
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