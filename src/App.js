import './App.css';
import React from 'react';
import TodoApp from './component/TodoApp.jsx';
import './component/bootstrap.css';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <TodoApp/>
            </div>
          );
    }
}

export default App;
