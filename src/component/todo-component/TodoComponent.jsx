import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from '../AuthenticationService.js';

class TodoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            description: "",
            targetDate: moment(new Date()).format("YYYY-MM-DD")
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return;
        }
        let username = AuthenticationService.getUsername();
        TodoDataService.getTodoById(username, this.state.id)
        .then (res => this.setState({
            description: res.data.description,
            targetDate: moment(res.data.targetDate).format("YYYY-MM-DD")
        })
        )
    }

    onSubmit(values) {
        let username = AuthenticationService.getUsername();
        let todo = {
           id: this.state.id,
           description: values.description,
           targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            TodoDataService.createTodo(username, todo)
            .then(
                () => {
                    this.props.navigate('/todos');
                }
            )
        }
        TodoDataService.updateTodo(username, this.state.id, todo)
        .then(
            () => {
                this.props.navigate('/todos');
            }
        )
    }

    validate(values) {
        let errors = {};
        // description
        if(!values.description) {
            errors.description = "Description cannot be blank";
        } else if (values.description.length < 5) {
            errors.description = "Description must conatain at least 5 characters";
        }

        // targetDate
        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = "TargetDate is invalid";
        }
        return errors;
    }

    render() {
        let description = this.state.description;
        let targetDate = this.state.targetDate;

        return (
            <div className="conainer">
                <h1>Todo</h1>
                <div className="container">
                     <Formik
                        initialValues = {{
                            description: description,
                            targetDate: targetDate
                        }} onSubmit={this.onSubmit} validate={this.validate} validateOnChange={false} validateOnBlur={false} enableReinitialize={true}>
                        {
                         (props) =>  (
                             <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <fieldset>
                                    <label className="form-group">Description</label>
                                    <Field className="form-control" type="text" name="description" />
                                </fieldset>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset>
                                    <label className="form-group">Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate"/>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                             </Form>
                         )
                        }
                     </Formik>
                </div>

            </div>
        )
    }
}

function TodoComponentFunction(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <div>
            <TodoComponent id = {id} {...props} navigate={navigate} />
        </div>
    );
}


export default TodoComponentFunction;