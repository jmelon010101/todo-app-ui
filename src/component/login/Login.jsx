import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../AuthenticationService.js'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "joe",
            password: "password",
            isLoginSuccessful: null,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    loginClicked() {
        if (this.state.username === "joe" && this.state.password === "password") {
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.setState({isLoginSuccessful:true})
            this.props.navigate(`/welcome/${this.state.username}`);
        } else {
            this.setState({isLoginSuccessful:false})
        }
    }

    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <div className="container">
                    <ShowLoginMessage isLoginSuccessful={this.state.isLoginSuccessful}/>
                    Username: <input className="username" type="text" name="username" value={this.state.username} onChange={this.handleInputChange}/>
                    Password: <input className="password" type="password" name="password" value={this.state.password} onChange={this.handleInputChange}/>
                    <button className="loginButton btn" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

function ShowLoginMessage(props) {
    if (props.isLoginSuccessful === true) {
        return <div className="validMessage alert alert-warning">Valid Login</div>
    } else if (props.isLoginSuccessful === false) {
        return <div className="invalidMessage alert alert-warning">Login Failed</div>
    }
    return null;
}

function LoginComponentWithNavigate(props) {
    const navigate = useNavigate();
    return <Login {...props} navigate={navigate} />
}

export default LoginComponentWithNavigate;