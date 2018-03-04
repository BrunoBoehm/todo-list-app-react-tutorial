import uuid from 'uuid';

// ADD_TODO
export const addTodo = ( { title = '', description ='', priority = 0, createdAt = 0 } = {} ) => ({
    type: 'ADD_TODO',
    todo: {
        id: uuid(),
        title, 
        description,
        priority,
        createdAt
    }
});

// REMOVE_TODO
export const removeTodo = ( { id } = {} ) => ({
    type: 'REMOVE_TODO',
    id
});

// EDIT_TODO
export const editTodo = ( { id, updates } = {} ) => ({
    type: 'EDIT_TODO',
    id, 
    updates
}); 