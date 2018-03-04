import React from 'react';
import { connect } from 'react-redux';

const TodoList = (props) => (
    <div>
        <h3>Todo List</h3>
        <p>Todo Length: {props.todos.length}</p>
        <p>Filter: {props.filters.text}</p>
    </div>
);

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        filters: state.filters
    };
};

export default connect(mapStateToProps)(TodoList);