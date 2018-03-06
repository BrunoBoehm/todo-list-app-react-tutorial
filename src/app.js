import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { addTodo, removeTodo, editTodo } from './actions/todos';
import { setTextFilter, sortByDate, sortByPriority, setEndDate } from './actions/filters';
import selectTodos from './selectors/todos';
import 'normalize-css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.subscribe(() => {
    const state = store.getState();
    const visibleTodos = selectTodos( state.todos, state.filters );
    console.log(state);
    console.log(visibleTodos);
});

const todoOne = store.dispatch( addTodo({ title: 'First Title', description: 'First Description', priority: 10, createdAd: 1000}) );
const todoTwo = store.dispatch( addTodo({ title: 'Second Title', description: 'Second Description', priority: 1, createdAt: -1000}) );
const todoThree = store.dispatch( addTodo({ title: 'Third Title', description: 'Third Description', priority: 4, createdAt: 8000}) );


// console.log(todoOne);

// store.dispatch( removeTodo({ 
//     id: todoOne.todo.id 
// }));
// store.dispatch( editTodo({ 
//     id: todoTwo.todo.id,
//     updates: { title: 'Edited Todo Two' }
// }));

// setTimeout(() => {
//     store.dispatch( setTextFilter('first') );
// }, 3000);

// store.dispatch( sortByPriority() );
// store.dispatch( sortByDate() );
// store.dispatch( setEndDate(15789) );

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render( jsx, document.getElementById('app') );