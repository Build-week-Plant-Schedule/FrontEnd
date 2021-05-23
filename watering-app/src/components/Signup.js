
export default function Signup(props) {

    const {formValue, change, submit} = props;

    return (
        <div>
            {/* FORM NEEDS ONSUBMIT */}
            <form onSubmit={submit} >
                <label>
                    Username
                    <input type='text' name='username' value={formValue.username} onChange={change} />
                </label>
                <label>
                    Phone Number
                    <input type='text' name='phoneNumber' value={formValue.phoneNumber} onChange={change} />
                </label>
                <label>
                    Password
                    <input type='text' name='password' value={formValue.password} onChange={change} />
                </label>
                <button>Create New Account</button>
            </form>
        </div>
    )

}