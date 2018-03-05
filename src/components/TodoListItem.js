import React from 'react';
import { removeTodo } from '../actions/todos';
import { connect } from 'react-redux';

const TodoListItem = ( {title, description, priority, createdAt, id, dispatch} ) => (
    <div>
        <h3>[{priority}] {title}</h3>
        <p>{description}</p>
        <p>{createdAt}</p>
        <button onClick={() => {
            dispatch(removeTodo( { id } ));
        }}>Remove</button>
    </div>
);

export default connect()(TodoListItem);