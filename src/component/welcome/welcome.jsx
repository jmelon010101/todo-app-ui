import React from 'react';
import { useParams, Link } from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService.js';

class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            welcomeMessage: "",
            welcomeBeanMessage: ""
        }
        this.retrieveWelcome = this.retrieveWelcome.bind(this);
        this.retrieveWelcomeBean = this.retrieveWelcomeBean.bind(this);
        this.retrieveWelcomeBeanWithPathVariable = this.retrieveWelcomeBeanWithPathVariable.bind(this);
    }

    render() {
        return (
            <>
                <h1>Welcome</h1>
                <div className="container">
                    Welcome {this.props.username}!
                    You can manage your todo list <Link to="/todos">here.</Link>
                </div>
                <div className="container">
                    Click to get a customized welcome message
                    <button className="btn btn-success" onClick={this.retrieveWelcome}>Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }

    retrieveWelcome() {
        HelloWorldService.executeHelloWorldService()
        .then(res => {
            this.setState({welcomeMessage: res.data});
        }).catch(error => {
            console.log(error.response.data.message);
        });
    }

    retrieveWelcomeBean() {
        HelloWorldService.executeHelloWorldBeanService()
        .then(res => {
            console.log(res.data.message);
            this.setState({welcomeBeanMessage: res.data.message});
        } );
        // .catch()
    }

    retrieveWelcomeBeanWithPathVariable() {
        HelloWorldService.executeHelloWorldPathVariableService(this.props.username)
        .then(res => {
            this.setState({welcomeMessage: res.data.message});
        } );
        // .catch()
    }

}

function WelcomeFunction() {
    const { username } = useParams();
    return (
        <div>
            <Welcome username = {username} />
        </div>
    );
}

export default WelcomeFunction;