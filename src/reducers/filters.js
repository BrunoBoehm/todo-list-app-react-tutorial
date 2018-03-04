const filtersReducerDefaultState = {
    text: '',
    sortBy: 'priority',
    endDate: undefined
}

const filtersReducer = ( state = filtersReducerDefaultState, action ) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_PRIORITY':
            return {
                ...state,
                sortBy: 'priority'
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default: 
            return state;
    };
};

export default filtersReducer;