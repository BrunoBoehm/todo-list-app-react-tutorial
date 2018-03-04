import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addTodo, removeTodo, editTodo } from './actions/todos';
import { setTextFilter, sortByDate, sortByPriority, setEndDate } from './actions/filters';
import getVisibleTodos from './selectors/todos';
import 'normalize-css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.subscribe(() => {
    const state = store.getState();
    const visibleTodos = getVisibleTodos( state.todos, state.filters );
    console.log(state);
    console.log(visibleTodos);
});

const todoOne = store.dispatch( addTodo({ title: 'First Title', description: 'First Description', priority: 10, createdAd: 1000}) );
const todoTwo = store.dispatch( addTodo({ title: 'Second Title', description: 'Second Description', priority: 1, createdAt: -1000}) );

// console.log(todoOne);

// store.dispatch( removeTodo({ 
//     id: todoOne.todo.id 
// }));
// store.dispatch( editTodo({ 
//     id: todoTwo.todo.id,
//     updates: { title: 'Edited Todo Two' }
// }));
// store.dispatch( setTextFilter('first') );
// store.dispatch( sortByPriority() );
// store.dispatch( sortByDate() );
// store.dispatch( setEndDate(15789) );

ReactDOM.render(<AppRouter />, document.getElementById('app'));