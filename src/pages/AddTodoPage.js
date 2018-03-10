import React from 'react';
import TodoForm from '../components/TodoForm';
import { connect } from 'react-redux';
import { addTodo } from '../actions/todos';

const AddTodoPage = (props) => (
    <div>
        <h3>Add a Todo</h3>
        <TodoForm 
            onSubmit={(todo) => {
                props.dispatch(addTodo(todo));
                props.history.push('/');
                // console.log(todo);
            }}
        />
    </div>
)

export default connect()(AddTodoPage);