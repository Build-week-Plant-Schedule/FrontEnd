
export default function AddPlants(props) {

    const {formValue} = props;

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

    const arrayBuilder = num => {
        return Array.apply(null, Array(num)).map(function (cb, index) {return index})
    }

    const h2oFormHandler = num => {
       return arrayBuilder(num).map(cb => {
           return timeForm(cb);
        });
    }

    console.log(h2oFormHandler(3));

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
                        {h2oFormHandler(formValue.waterPerDay)}
                    </label>
                </div>
            </form>
        </div>
        

    )

}