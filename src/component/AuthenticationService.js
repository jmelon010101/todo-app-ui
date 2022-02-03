import axios from 'axios';
import {API_BASE_URL} from '../Constants.js';

export const SESSION_USER_ATTRIBUTE = "authenticatedUser";

class AuthenticationService {
    executeBasicAuthentication(user, password) {
        let config = {
            headers: {
                authorization: this.createBasicAuthToken(user, password)
            }
        }
        return axios.get(API_BASE_URL+"/basic-auth", config);
    }

    executeJwtAuthentication(username, password) {
        return axios.post(API_BASE_URL+"/authenticate", {
            username,
            password
        });
    }

    createBasicAuthToken(user, password) {
        return "Basic " + window.btoa(user + ":" + password);
    }

    registerSuccessfulLogin(user, password) {
        sessionStorage.setItem(SESSION_USER_ATTRIBUTE, user);
        this.setupAxiosInterceptors(this.createBasicAuthToken(user, password));
    }

    registerSuccessfulJwtLogin(user, token) {
        sessionStorage.setItem(SESSION_USER_ATTRIBUTE, user);
        this.setupAxiosInterceptors(this.createJwtToken(token));
    }

    createJwtToken(token) {
            return "Bearer " + token;
        }

    logout() {
        sessionStorage.removeItem(SESSION_USER_ATTRIBUTE);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(SESSION_USER_ATTRIBUTE);
        if (user===null) return false;
        return true;
    }

    getUsername() {
        let user = sessionStorage.getItem(SESSION_USER_ATTRIBUTE);
        if (user===null) return "user-unauthorized"
        return user;
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn) {
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }
}

export default new AuthenticationService();