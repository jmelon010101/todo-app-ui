import axios from 'axios';
import AuthenticationService from '../../component/AuthenticationService.js';
import {JPA_API_BASE_URL} from '../../Constants.js';

class TodoDataService {
    getAllTodosByUser(username) {
        return axios.get(`${JPA_API_BASE_URL}/users/${username}/todos`);
    }

    getTodoById(username, id) {
            return axios.get(`${JPA_API_BASE_URL}/users/${username}/todos/${id}`);
        }

    updateTodo(username, id, todo) {
        return axios.put(`${JPA_API_BASE_URL}/users/${username}/todos/${id}`, todo);
    }

    deleteTodo(username, id) {
        return axios.delete(`${JPA_API_BASE_URL}/users/${username}/todos/${id}`);
    }

    createTodo(username, todo) {
            return axios.post(`${JPA_API_BASE_URL}/users/${username}/todos`, todo);
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