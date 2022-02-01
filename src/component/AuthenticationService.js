import axios from 'axios';

class AuthenticationService {
    executeBasicAuthentication(user, password) {
        let config = {
            headers: {
                authorization: this.createBasicAuthToken(user, password)
            }
        }
        return axios.get("http://localhost:8080/basic-auth", config);
    }

    executeJwtAuthentication(username, password) {
        return axios.post("http://localhost:8080/authenticate", {
            username,
            password
        });
    }

    createBasicAuthToken(user, password) {
        return "Basic " + window.btoa(user + ":" + password);
    }

    registerSuccessfulLogin(user, password) {
        sessionStorage.setItem("authenticatedUser", user);
        this.setupAxiosInterceptors(this.createBasicAuthToken(user, password));
    }

    registerSuccessfulJwtLogin(user, token) {
        sessionStorage.setItem("authenticatedUser", user);
        this.setupAxiosInterceptors(this.createJwtToken(token));
    }

    createJwtToken(token) {
            return "Bearer " + token;
        }

    logout() {
        sessionStorage.removeItem("authenticatedUser");
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem("authenticatedUser");
        if (user===null) return false;
        return true;
    }

    getUsername() {
        let user = sessionStorage.getItem("authenticatedUser");
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