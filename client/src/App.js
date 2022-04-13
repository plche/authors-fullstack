import {Link, Route, Switch, withRouter} from "react-router-dom";
import './App.css';
import Main from "./views/Main";
import Detail from "./views/Detail";
import Update from "./views/Update";
import Create from "./views/Create";
import Register from "./views/Register";
import Login from "./views/Login";
import {useState} from "react";
import axios from "axios";

const App = props => {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const registerUser = event => {
        event.preventDefault();
        const newUser = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value
        }

        axios.post('http://localhost:8000/api/users/register', newUser)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                setErrorMsg('');
                props.history.push('/');
            })
            .catch(err => setErrorMsg(err.response.statusText));
    }

    const loginUser = event => {
        event.preventDefault();

        const user = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        axios.post('http://localhost:8000/api/users/login', user)
            .then(response => {
                setEmail(user.email);
                console.log("Login:17: response.data =", response.data);
                localStorage.setItem('token', response.data.token);
                setErrorMsg('');
                props.history.push('/');
            })
            .catch(err => setErrorMsg(err.response.statusText));
    }

    const authorize = () => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        axios.post('http://localhost:8000/users/authorize', {}, config)
            .then(response => setEmail(response.data.email))
            .catch(err => {
                console.log("App:63: err.response.statusText =", err.response.statusText);
                // redirect to...?
            });
    }

    return (
        <div className="App">
            <h1>Favorite authors</h1>
            <Switch>
                <Route path='/register' render={routeProps => <Register registerUser={registerUser}
                                                                        {...routeProps} />} />
                <Route path='/login' render={routeProps => <Login loginUser={loginUser}
                                                                  {...routeProps} />} />
                <Route path='/:id/edit' render={routeProps => {
                    authorize();
                    if (email !== '') return (<Update {...routeProps} />)
                    else return (<div>You need to <Link to='/login'>login</Link> first...</div>)
                }} />
                <Route path='/new' render={routeProps => {
                    authorize();
                    if (email !== '') return (<Create {...routeProps} />)
                    else return (<div>You need to <Link to='/login'>login</Link> first...</div>)
                }} />
                <Route path='/:id' render={routeProps => {
                    authorize();
                    if (email !== '') return (<Detail {...routeProps} />)
                    else return (<div>You need to <Link to='/login'>login</Link> first...</div>)
                }} />
                <Route path='/' render={routeProps => {
                    authorize();
                    if (email !== '') return (<Main {...routeProps} />)
                    else return (<div>You need to <Link to='/login'>login</Link> first...</div>)
                }} />
            </Switch>
            <div>
                {errorMsg}
            </div>
        </div>
    );
}

export default withRouter(App);
