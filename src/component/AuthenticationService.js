class AuthenticationService {
    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem("authenticatedUser", username);
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
}

export default new AuthenticationService();