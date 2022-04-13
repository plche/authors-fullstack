import {Link} from 'react-router-dom';

const Login = props => {

    return (
        <div>
            <form onSubmit={props.loginUser}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Login</button>
                {/*<div>
                    {errorMsg}
                </div>*/}
            </form>
            <div>
                Still don't have an account?
            </div>
            <Link to="/register">Register</Link>
        </div>
    );
}

export default Login;