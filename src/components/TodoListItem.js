import React from 'react';

const TodoListItem = ( {title, description, priority, createdAt} ) => (
    <div>
        <h3>[{priority}] {title}</h3>
        <p>{description}</p>
        <p>{createdAt}</p>
    </div>
);

export default TodoListItem;