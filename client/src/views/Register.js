import {Link} from "react-router-dom";

const Register = props => {
    return (
        <div>
            <form onSubmit={props.registerUser}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" />
                </div>
                <button type="submit">Register</button>
                {/*<div>
                    {errorMsg}
                </div>*/}
            </form>
            <div>
                Back to login
            </div>
            <Link to="/login">Login</Link>
        </div>
    );
}

export default Register;
