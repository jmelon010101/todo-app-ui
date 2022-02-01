import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import AuthenticationService from '../AuthenticationService.js'

class Header extends React.Component {
    render() {
        let isLoggedIn = AuthenticationService.isUserLoggedIn();
        const username = AuthenticationService.getUsername();

        return (
            <header>
                <nav className="navbar  navbar-expand-md bg-dark">
                    <div className="logo"><a>TodoApp</a></div>
                    <ul className="navbar-nav">
                            <li>
                                <Link className="nav-link item" to={"/welcome/" + username}>Home</Link>
                            </li>
                            <li>
                                {isLoggedIn && <Link className="nav-link item" to="/todos">Todos</Link>}
                            </li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li>
                            {!isLoggedIn && <Link className="nav-link item" to="/login">Login</Link> }
                        </li>
                       <li>
                            { isLoggedIn && <Link onClick={AuthenticationService.logout}className="nav-link item" to="/logout">Logout</Link>}
                       </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export const withRouter = (Component) => {
    const Wrapper = (props) => {
      const history = useNavigate();

      return (
        <Component
          history={history}
          {...props}
          />
      );
    };

    return Wrapper;
  };

export default withRouter(Header);