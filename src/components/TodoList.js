import React from 'react';
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem';
import selectTodos from '../selectors/todos';

const TodoList = (props) => (
    <div>
        <h3>Todo List</h3>
        {props.todos.map((todo) => <TodoListItem key={todo.id} {...todo} />)}
    </div>
);

const mapStateToProps = (state) => {
    return {
        todos: selectTodos(state.todos, state.filters)
    };
};

export default connect(mapStateToProps)(TodoList);