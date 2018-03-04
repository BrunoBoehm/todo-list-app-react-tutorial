const todosReducerDefaultState = [];

const todosReducer = ( state = todosReducerDefaultState, action ) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.todo];
        case 'REMOVE_TODO':
            return state.filter( ({ id }) => id !== action.id );
        case 'EDIT_TODO':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {...expense, ...action.updates};
                } else {
                    return expense;
                };
            });
        default:
            return state;
    };
};

export default todosReducer;