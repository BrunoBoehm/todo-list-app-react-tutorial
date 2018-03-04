// export default ( todos, {text, sortBy, endDate} ) => {
//     return todos.filter( (todo) => {
//         const textMatch = todo.description.toLowerCase().includes(text.toLowerCase());
//         const endDateMatch = typeof endDate !== 'number' || todo.createdAt <= endDate ;

//         return textMatch && endDateMatch;
//     });;
// };

export default ( todos, {text, sortBy, endDate} ) => {
    return todos.filter( (todo) => {
        const textMatch = todo.description.toLowerCase().includes(text.toLowerCase());
        const endDateMatch = typeof endDate !== 'number' || todo.createdAt <= endDate ;

        return textMatch && endDateMatch;
    }).sort( (a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1 ;
        }

        if (sortBy === 'priority') {
            return a.priority < b.priority ? 1 : -1 ;
        }
    });
};