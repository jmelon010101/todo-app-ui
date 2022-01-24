import React from 'react';
import LoginComponentWithNavigate from './login/Login.jsx';
// import WelcomeFunction from './welcome/welcome.jsx';
import Welcome from './welcome/welcome.jsx';
import Todos from './todos/Todos.jsx';
import ErrorComponent from './error/Error.jsx';
import Header from './header/Header.jsx';
import Footer from './footer/Footer.jsx';
import Logout from './logout/Logout.jsx';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import TodoComponent from './todo-component/TodoComponent.jsx';
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";

class TodoApp extends React.Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigate/>} />
                        <Route path="/login" element={<LoginComponentWithNavigate/>} />
                        <Route path="/welcome/:username" element={<AuthenticatedRoute><Welcome/></AuthenticatedRoute>} />
                        <Route path="/todos" element={<AuthenticatedRoute><Todos/></AuthenticatedRoute>} />
                        <Route path="/todos/:id" element={<AuthenticatedRoute><TodoComponent/></AuthenticatedRoute>} />
                        <Route path="*" element={<ErrorComponent/>} />
                        <Route path="logout" element={<Logout/>} />
                    </Routes>
                </Router>
                <Footer/>
            </div>
        )
    }
}

export default TodoApp;