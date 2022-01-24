import React, { Component } from "react";
import { Navigate } from 'react-router-dom'
import AuthenticationService from "./AuthenticationService";

class AuthenticatedRoute extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return isUserLoggedIn ? {...this.props.children}  : <Navigate to="/login" />
    }
}

export default AuthenticatedRoute