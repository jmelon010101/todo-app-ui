import axios from 'axios';
import AuthenticationService from '../../component/AuthenticationService.js';
class TodoDataService {
    getAllTodosByUser(username) {
        return axios.get(`http://localhost:8080/users/${username}/todos`);
    }

    getTodoById(username, id) {
            return axios.get(`http://localhost:8080/users/${username}/todos/${id}`);
        }

    updateTodo(username, id, todo) {
        return axios.put(`http://localhost:8080/users/${username}/todos/${id}`, todo);
    }

    deleteTodo(username, id) {
        return axios.delete(`http://localhost:8080/users/${username}/todos/${id}`);
    }

    createTodo(username, todo) {
            return axios.post(`http://localhost:8080/users/${username}/todos`, todo);
    }

    setupAxiosInterceptors(basicAuthHeader) {
        axios.interceptors.request.use(
            (config) => {
                if (AuthenticationService.isUserLoggedIn) {
                    config.headers.authorization = basicAuthHeader;
                }
                return config;
            }
        )
    }
}

export default new TodoDataService()