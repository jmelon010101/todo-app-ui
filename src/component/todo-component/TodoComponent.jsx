import React from 'react';
import { useParams } from 'react-router-dom';

class TodoComponent extends React.Component {
    render() {
        return (
            <div className="conainer">
                TodoComponent {this.props.id}
            </div>
        )
    }
}

function TodoComponentFunction() {
    const { id } = useParams();
    return (
        <div>
            <TodoComponent id = {id} />
        </div>
    );
}

export default TodoComponentFunction;