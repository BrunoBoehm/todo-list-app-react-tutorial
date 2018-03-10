import React from 'react';
import TodoForm from '../components/TodoForm';
import { connect } from 'react-redux';
import { editTodo } from '../actions/todos';

const EditTodoPage = (props) => (
    <div>
        <h3>Editing Todo</h3>
        <p>ID: {props.match.params.id}</p>
        <TodoForm 
            todo={props.todo}
            onSubmit={(todo) => {
                props.dispatch(editTodo(props.todo.id, todo));
                props.history.push('/');
            }}
        />
    </div>
)

const mapStateToProps = (state, props) => {
    return {
        todo: state.todos.find((todo) => todo.id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(EditTodoPage);