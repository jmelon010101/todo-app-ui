import React from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from '../AuthenticationService.js';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message: ""
        }
        this.deleteTodo = this.deleteTodo.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
    }

    refreshTodos(username) {
        TodoDataService.getAllTodosByUser(username)
        .then(res => {
            this.setState({todos: res.data});
        });
    }

    componentDidMount() {
        const username = AuthenticationService.getUsername();
        this.refreshTodos(username);
    }

    deleteTodo(id) {
        const username = AuthenticationService.getUsername();
        TodoDataService.deleteTodo(username, id)
        .then(res => {
            this.setState({message:"Todo with ID of: " + id + ", has been deleted."});
            this.refreshTodos(username);
        });
    }

    updateTodo(id) {
        const username = AuthenticationService.getUsername();
        console.log(username + " UPDATE " + id);
        this.props.navigate(`/todos/${id}`);
    }

    addTodoClicked() {
        this.props.navigate("/todos/-1");
    }



    render() {
        return (
            <div className="todos">
                <h1>Todo list here</h1>
                {this.state.message !== "" && <div className="alert alert-success">{this.state.message}</div>}
                <div className='container'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Is Completed?</th>
                                <th>Target Date</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                    <tr key = {todo.id}>
                                        <td >{todo.id} </td>
                                        <td >{todo.description} </td>
                                        <td >{todo.completed.toString()} </td>
                                        <td >{moment(todo.targetDate).format('YYYY-MM-DD')} </td>
                                        <td ><button onClick={() => this.deleteTodo(todo.id)} className="btn btn-warning">Delete Todo</button> </td>
                                        <td ><button onClick={() => this.updateTodo(todo.id)} className="btn btn-success">Update</button> </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

function TodosWithNavigate(props) {
    const navigate = useNavigate();
    return <Todos {...props} navigate={navigate} />
}

export default TodosWithNavigate;