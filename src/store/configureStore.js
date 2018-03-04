import { createStore, combineReducers } from 'redux';
import todosReducer from '../reducers/todos';
import filtersReducer from '../reducers/filters';

// const demoState = {
//     todos: [{
//         id: 'kejfnjefn',
//         title: 'Homework', 
//         description: 'Do my homework',
//         priority: 10,
//         createdAt: 0
//     }],
//     filters: {
//         text: 'homework',
//         sortBy: 'priority',
//         endDate: undefined
//     }
// }

// const store = createStore( todosReducer );

export default () => {
    const store = createStore(
        combineReducers({
            todos: todosReducer,
            filters: filtersReducer
        })
    );
    return store;
}